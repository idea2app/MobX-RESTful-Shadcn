import { FC, RefObject } from "react";
import {
  ColorName,
  ColorTool,
  ForeColorTool as FCT,
  BackColorTool as BCT,
} from "edkit";
import { Type, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface ColorSelectorProps
  extends Partial<Record<"className" | "title" | "value", string>> {
  icon: "Type" | "FileText";
  type: ColorName;
  onChange?: (color: string) => any;
}

export const ColorSelector: FC<ColorSelectorProps> = ({
  className = "",
  title,
  type,
  value,
  onChange,
  icon,
}) => (
  <span
    className={`inline-block align-middle relative ${className}`}
    title={title}
  >
    <input
      className="absolute w-full h-full left-0 top-0 -z-10 rounded-md opacity-0 cursor-pointer"
      type="color"
      value={value}
      onChange={({ target: { value } }) => onChange?.(value)}
    />
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className="p-2"
      style={{
        color: type === "color" ? value : undefined,
        backgroundColor: type === "color" ? undefined : value,
        borderColor: value,
      }}
      onClick={(event) => {
        event.preventDefault();

        const input = event.currentTarget
          .previousElementSibling as HTMLInputElement;

        input.click();
      }}
    >
      {icon === "Type" ? (
        <Type
          className="size-4"
          style={type !== "color" ? { filter: "invert(1)" } : undefined}
        />
      ) : (
        <FileText
          className="size-4"
          style={type !== "color" ? { filter: "invert(1)" } : undefined}
        />
      )}
    </Button>
  </span>
);

export function renderColorTool(
  this: ColorTool,
  editor: RefObject<HTMLElement>
) {
  const { icon, name, colorName } = this;

  return (
    <ColorSelector
      className="mr-2 mb-2"
      key={icon}
      title={name}
      icon={icon as ColorSelectorProps["icon"]}
      type={colorName}
      value={this.getColor()}
      onChange={(color) =>
        editor.current && this.execute(editor.current, color)
      }
    />
  );
}

export class ForeColorTool extends FCT {
  icon = "Type";
  render = renderColorTool;
}

export class BackColorTool extends BCT {
  icon = "FileText";
  render = renderColorTool;
}
