"use client";

import { observer } from "mobx-react";
import { FormComponent, FormComponentProps } from "mobx-react-helper";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface RangeInputProps extends Omit<FormComponentProps, "type"> {
  icon?: ReactNode | ((itemValue: number) => ReactNode);
}

@observer
export class RangeInput extends FormComponent<RangeInputProps> {
  static readonly displayName = "RangeInput";

  renderItem(index: number) {
    const { value = 0 } = this;
    const { icon, step = 1 } = this.observedProps;
    const fullValue = +step * index;
    const itemValue = Math.max(Math.min(+value - fullValue, +step), 0);

    return (
      <li key={index} className="text-center">
        {typeof icon === "function" ? icon(itemValue) : icon}
      </li>
    );
  }

  render() {
    const {
      className = "inline-block relative",
      icon,
      min,
      max = icon ? 5 : 100,
      onChange,
      ...props
    } = this.observedProps;
    const { value = min || 0 } = this;

    return (
      <div className={cn(className)} title={value + ""}>
        <input
          {...{ min, max, value, ...props }}
          className={cn(
            "cursor-pointer",
            icon ? "opacity-0" : ""
          )}
          style={{ margin: "0 -0.5rem" }}
          type="range"
          onChange={({ currentTarget: { value } }) =>
            (this.innerValue = value)
          }
        />
        {icon && (
          <ol className="list-none select-none absolute left-0 top-0 w-full h-full pointer-events-none flex justify-around m-0 p-0">
            {Array.from({ length: +max }, (_, index) => this.renderItem(index))}
          </ol>
        )}
      </div>
    );
  }
}
