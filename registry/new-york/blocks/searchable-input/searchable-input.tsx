"use client";

import debounce from "lodash.debounce";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { FormComponent, FormComponentProps } from "mobx-react-helper";
import { DataObject, Filter } from "mobx-restful";
import { FocusEvent } from "react";
import { Second } from "web-utility";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeBar } from "../badge-bar/badge-bar";
import { TextInputTypes } from "../badge-input/badge-input";
import { RestFormProps } from "../rest-form/rest-form";
import { RestFormModal } from "../rest-form-modal/rest-form-modal";
import { ScrollList, ScrollListProps } from "../scroll-list/scroll-list";

export type OptionData = Record<"label" | "value", string>;

export type SearchableInputProps<
  D extends DataObject,
  F extends Filter<D> = Filter<D>
> = Omit<
  ScrollListProps<D, F>,
  "id" | "defaultValue" | "onChange" | "defaultData" | "renderList"
> &
  FormComponentProps<OptionData[]> &
  Omit<RestFormProps<D, F>, "fields"> & {
    translator: RestFormProps<D, F>["translator"] &
      ScrollListProps<D, F>["translator"];
    fields?: RestFormProps<D, F>["fields"];
    labelKey: keyof D;
    valueKey: keyof D;
    renderList?: ScrollListProps<D, F>["renderList"];
    type?: (typeof TextInputTypes)[number];
    multiple?: boolean;
  };

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

  renderList: ScrollListProps<D, F>["renderList"] = (allItems) =>
    allItems[0] ? (
      <div className="border rounded-md overflow-hidden">
        {allItems.map((data) => {
          const { labelKey, valueKey } = this.observedProps;

          const label = data[labelKey],
            value = data[valueKey];

          return (
            <button
              key={value}
              type="button"
              className="w-full px-4 py-2 text-left hover:bg-accent transition-colors"
              onClick={() => this.add(label, value)}
            >
              {label}
            </button>
          );
        })}
      </div>
    ) : (
      this.observedProps.store.downloading > 0 && (
        <div className="text-center my-3">
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        </div>
      )
    );

  renderOverlay() {
    const { filter } = this;
    const {
      translator,
      fields,
      store,
      labelKey,
      renderList = this.renderList,
    } = this.props;

    const keyword = filter[labelKey] as string;

    const needNew = !store.allItems.some(
      ({ [labelKey]: label }) => label === keyword
    );

    return (
      <div
        className="absolute start-0 z-50 overflow-auto py-1 bg-background shadow-md border rounded-md"
        style={{ top: "100%", maxHeight: "30vh", width: "100%" }}
        onBlurCapture={this.handleBlur}
      >
        {needNew && fields?.[0] && (
          <Button
            className="w-full sticky top-0"
            variant="secondary"
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
    const { value, listShown } = this,
      {
        translator,
        fields,
        store,
        labelKey,
        valueKey,
        type = "search",
        name,
        required,
        readOnly,
        disabled,
        placeholder,
      } = this.props;

    return (
      <div className="relative">
        <div
          className={cn(
            "flex min-h-9 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
          )}
        >
          <BadgeBar
            list={(value || []).map(({ label }) => ({ text: label }))}
            onDelete={({}, index) => this.delete(index)}
          />

          <input
            type="hidden"
            name={name}
            value={JSON.stringify(value?.map(({ value }) => value))}
          />
          <Input
            className="flex-1 border-0 shadow-none outline-none min-w-[80px] h-7 px-0"
            {...{ type, placeholder, required, readOnly, disabled }}
            onChange={({ currentTarget: { value } }) => this.search(value)}
          />
        </div>

        {listShown && this.renderOverlay()}

        {fields?.[0] && (
          <RestFormModal
            {...{ translator, fields, store }}
            onSubmit={({ [labelKey]: label, [valueKey]: value }) => {
              this.add(label, value);
              this.listShown = false;
            }}
          />
        )}
      </div>
    );
  }
}
