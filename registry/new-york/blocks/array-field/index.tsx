"use client";

import { Minus, Plus } from "lucide-react";
import { observer } from "mobx-react";
import { FormComponent, FormComponentProps } from "mobx-react-helper";
import { DataObject } from "mobx-restful";
import { ChangeEvent, HTMLAttributes, ReactNode } from "react";
import { formToJSON, isEmpty, uniqueID } from "web-utility";

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
  T extends DataObject = DataObject,
> extends FormComponent<ArrayFieldProps<T>> {
  static displayName = "ArrayField";

  protected readonly rowIds: string[] = [];

  protected getRowId(index: number) {
    return (this.rowIds[index] ||= uniqueID());
  }

  componentDidMount() {
    super.componentDidMount();

    if (isEmpty(this.value)) this.insert();
  }

  insert = (index = 0) => {
    const { innerValue = [] } = this,
      item = {} as T;

    this.rowIds.splice(index, 0, uniqueID());
    this.innerValue = [
      ...innerValue.slice(0, index),
      item,
      ...innerValue.slice(index),
    ];
  };

  remove = (index: number) => {
    this.rowIds.splice(index, 1);

    this.innerValue = this.innerValue?.filter((_, i) => i !== index);
  };

  handleChange =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) => {
      const item = formToJSON<T>(currentTarget as HTMLFieldSetElement),
        { innerValue = [] } = this;

      this.innerValue = [
        ...innerValue.slice(0, index),
        item,
        ...innerValue.slice(index + 1),
      ];
    };

  handleUpdate =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) => {
      const item = formToJSON<T>(currentTarget as HTMLFieldSetElement);

      this.innerValue![index] = item;
    };

  render() {
    const { className = "", style, name, renderItem } = this.props,
      { value, rowIds } = this;
    const length = value?.length || 0;

    if (rowIds.length > length) rowIds.length = length;

    return (
      <>
        {value?.map((item, index, { length }) => (
          <fieldset
            key={this.getRowId(index)}
            className={cn("flex items-center my-2 gap-2", className)}
            {...{ style, name }}
            onBlur={this.handleChange(index)}
            onChange={this.handleUpdate(index)}
          >
            <div className="flex-1">{renderItem(item, index)}</div>
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => this.insert(index + 1)}
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
