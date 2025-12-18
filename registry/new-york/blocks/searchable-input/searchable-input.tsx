"use client";

import debounce from "lodash.debounce";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { FormComponent, FormComponentProps } from "mobx-react-helper";
import { DataObject, Filter } from "mobx-restful";
import { FocusEvent } from "react";
import { Second } from "web-utility";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeBar } from "@/registry/new-york/blocks/badge-bar/badge-bar";
import { ScrollList, ScrollListProps } from "@/registry/new-york/blocks/scroll-list/scroll-list";

export type OptionData = Record<"label" | "value", string>;

export interface SearchableInputProps<
  D extends DataObject,
  F extends Filter<D> = Filter<D>
> extends Omit<
    ScrollListProps<D, F>,
    "id" | "defaultValue" | "onChange" | "defaultData" | "renderList"
  >,
    FormComponentProps<OptionData[]> {
  labelKey: keyof D;
  valueKey: keyof D;
  renderList?: ScrollListProps<D, F>["renderList"];
  type?: string;
  multiple?: boolean;
  placeholder?: string;
}

@observer
export class SearchableInput<
  D extends DataObject,
  F extends Filter<D> = Filter<D>
> extends FormComponent<SearchableInputProps<D, F>> {
  static readonly displayName = "SearchableInput";

  @observable
  accessor filter = this.props.filter;

  @observable
  accessor listShown = false;

  search = debounce(async (value: string) => {
    const { store, labelKey } = this.props;

    value = value.trim();

    this.filter = { ...this.filter, [labelKey]: value || undefined };

    if (store.downloading < 1)
      if (value) {
        if (!this.listShown) this.listShown = true;
        else await store.getList(this.filter, 1);
      } else {
        this.listShown = false;
        store.clearList();
      }
  }, Second);

  add = (label: string, value: string) => {
    const selectedOptions = this.value || [];

    if (selectedOptions.find(({ value: v }) => v === value)) return;

    this.innerValue = [...selectedOptions, { label, value }];

    if (!this.props.multiple) this.listShown = false;
  };

  delete = (index: number) =>
    (this.innerValue = [
      ...this.value.slice(0, index),
      ...this.value.slice(index + 1),
    ]);

  handleBlur = ({ target, relatedTarget }: FocusEvent<HTMLElement>) => {
    if (target.parentElement !== relatedTarget?.parentElement)
      this.listShown = false;
  };

  renderList: ScrollListProps<D, F>["renderList"] = (allItems) => {
    const { labelKey, valueKey } = this.props;

    return allItems[0] ? (
      <div className="py-1">
        {allItems.map((data) => {
          const label = data[labelKey] as string;
          const value = data[valueKey] as string;

          return (
            <button
              key={value}
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none"
              onClick={() => this.add(label, value)}
            >
              {label}
            </button>
          );
        })}
      </div>
    ) : this.props.store.downloading > 0 ? (
      <div className="text-center py-3 text-sm text-muted-foreground">
        Loading...
      </div>
    ) : null;
  };

  renderOverlay() {
    const { filter } = this;
    const { translator, store, labelKey, renderList = this.renderList } =
      this.props;

    const keyword = filter[labelKey] as string;

    const needNew = !store.allItems.some(
      ({ [labelKey]: label }) => label === keyword
    );

    return (
      <div
        className="absolute left-0 z-50 overflow-auto py-1 bg-popover shadow-md rounded-md border"
        style={{ top: "100%", maxHeight: "30vh" }}
        onBlurCapture={this.handleBlur}
      >
        {needNew && keyword && (
          <Button
            className="w-full sticky top-0"
            variant="outline"
            size="sm"
            type="button"
            onClick={() => (store.currentOne = { [labelKey]: keyword } as D)}
          >
            + {keyword}
          </Button>
        )}
        <ScrollList {...{ translator, store, filter, renderList }} />
      </div>
    );
  }

  render() {
    const { value, listShown } = this;
    const {
      store,
      labelKey,
      valueKey,
      type = "search",
      name,
      required,
      readOnly,
      disabled,
      placeholder,
      className,
    } = this.props;

    return (
      <div className={cn("relative", className)}>
        <div className="flex min-h-9 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
          <BadgeBar
            list={(value || []).map(({ label }) => ({ text: label }))}
            onDelete={({}, index) => this.delete(index)}
          />
          <Input
            className="flex-1 border-0 shadow-none min-w-[80px] h-7 px-0"
            {...{ type, placeholder, required, readOnly, disabled }}
            onChange={({ currentTarget: { value } }) => this.search(value)}
          />
        </div>

        {listShown && this.renderOverlay()}

        <input
          type="hidden"
          name={name}
          value={JSON.stringify(value?.map(({ value }) => value))}
        />
      </div>
    );
  }
}
