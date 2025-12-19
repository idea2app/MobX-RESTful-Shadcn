"use client";

import { toJS } from "mobx";
import { observer } from "mobx-react";
import { FormComponent, FormComponentProps } from "mobx-react-helper";
import { DataObject } from "mobx-restful";
import { ChangeEvent, HTMLAttributes, ReactNode } from "react";
import { Plus, Minus } from "lucide-react";
import { formToJSON, isEmpty } from "web-utility";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ArrayFieldProps<T extends DataObject = DataObject> = Pick<
  HTMLAttributes<HTMLFieldSetElement>,
  "className" | "style"
> &
  FormComponentProps<T[]> & {
    renderItem: (item: T, index: number) => ReactNode;
  };

@observer
export class ArrayField<
  T extends DataObject = DataObject
> extends FormComponent<ArrayFieldProps<T>> {
  static displayName = "ArrayField";

  componentDidMount() {
    super.componentDidMount();

    if (isEmpty(this.value)) this.add();
  }

  add = () => (this.innerValue = [...(this.innerValue || []), {} as T]);

  remove = (index: number) =>
    (this.innerValue = this.innerValue?.filter((_, i) => i !== index));

  handleChange =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) => {
      const item = formToJSON<T>(currentTarget as HTMLFieldSetElement);
      const { innerValue } = this;

      const list = [
        ...innerValue!.slice(0, index),
        item,
        ...innerValue!.slice(index + 1),
      ].map((item) => toJS(item));

      this.props.onChange?.(list);
    };

  handleUpdate =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) =>
      (this.innerValue![index] = formToJSON<T>(
        currentTarget as HTMLFieldSetElement
      ));

  render() {
    const { className = "", style, name, renderItem } = this.props;

    return (
      <>
        {this.value?.map((item, index, { length }) => (
          <fieldset
            key={JSON.stringify(item)}
            className={cn("flex items-center my-2 gap-2", className)}
            {...{ style, name }}
            onChange={this.handleChange(index)}
            onBlur={this.handleUpdate(index)}
          >
            <div className="flex-1">{renderItem(item, index)}</div>
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={this.add}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={length < 2}
                onClick={() => this.remove(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </fieldset>
        ))}
      </>
    );
  }
}
