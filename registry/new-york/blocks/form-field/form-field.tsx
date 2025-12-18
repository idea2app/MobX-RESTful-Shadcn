"use client";

import { FC, TextareaHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface SelectOption
  extends Partial<Pick<HTMLOptionElement, "text" | "label" | "disabled">> {
  value: string;
}

export type FormFieldProps = React.ComponentProps<typeof Input> &
  Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> & {
    label?: string;
    options?: SelectOption[];
    multiple?: boolean;
  };

export const FormField: FC<FormFieldProps> = ({
  className,
  style,
  label,
  placeholder,
  id,
  name,
  options,
  multiple,
  rows,
  onBlur,
  ...controlProps
}) => {
  const fieldId = name || id || `field-${Math.random().toString(36).substring(7)}`;

  return (
    <div className={cn("grid w-full gap-1.5", className)} style={style}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      {options ? (
        <select
          id={fieldId}
          name={name}
          multiple={multiple}
          size={rows}
          className={cn(
            "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-colors outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            multiple && rows ? "h-auto" : "h-9"
          )}
          onBlur={(event) => {
            if ((event.target as HTMLSelectElement).checkValidity()) {
              event.target.classList.remove("border-destructive");
            } else {
              event.target.classList.add("border-destructive");
            }
            onBlur?.(event as any);
          }}
          {...(controlProps as any)}
        >
          {options.map(({ value, text, label, disabled }) => (
            <option key={value} {...{ value, label, disabled }}>
              {text || value}
            </option>
          ))}
        </select>
      ) : rows && rows > 1 ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          placeholder={placeholder || (typeof label === "string" ? label : name || id)}
          className={cn(
            "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-colors outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "resize-vertical"
          )}
          onBlur={(event) => {
            if ((event.target as HTMLTextAreaElement).checkValidity()) {
              event.target.classList.remove("border-destructive");
            } else {
              event.target.classList.add("border-destructive");
            }
            onBlur?.(event as any);
          }}
          {...(controlProps as any)}
        />
      ) : (
        <Input
          id={fieldId}
          name={name}
          placeholder={placeholder || (typeof label === "string" ? label : name || id)}
          onBlur={(event) => {
            if ((event.target as HTMLInputElement).checkValidity()) {
              event.target.classList.remove("border-destructive");
            } else {
              event.target.classList.add("border-destructive");
            }
            onBlur?.(event as any);
          }}
          {...controlProps}
        />
      )}
    </div>
  );
};

FormField.displayName = "FormField";
