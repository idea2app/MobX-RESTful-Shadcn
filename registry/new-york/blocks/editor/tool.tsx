import { RefObject } from "react";
import { Tool } from "edkit";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

export function renderTool(this: Tool, editor: RefObject<HTMLElement>) {
  const { title, active, icon, usable } = this;

  // Map Bootstrap icons to Lucide icons
  const iconMap: Record<string, keyof typeof Icons> = {
    "type-bold": "Bold",
    "type-italic": "Italic",
    "type-underline": "Underline",
    "type-strikethrough": "Strikethrough",
    "type-h1": "Heading1",
    "type-h2": "Heading2",
    "type-h3": "Heading3",
    "sort-alpha-down": "ArrowDownAZ",
    "sort-alpha-up": "ArrowUpAZ",
    "box-arrow-down-right": "ArrowDownRight",
    "box-arrow-up-right": "ArrowUpRight",
    link: "Link",
    "text-left": "AlignLeft",
    "text-center": "AlignCenter",
    "text-right": "AlignRight",
    justify: "AlignJustify",
    "list-ol": "ListOrdered",
    "list-ul": "List",
    "reception-0": "Minus",
    window: "Frame",
    image: "Image",
    voicemail: "Mic",
    "camera-video": "Video",
    "arrow-counterclockwise": "Undo",
    "arrow-clockwise": "Redo",
    eraser: "Eraser",
    "file-earmark-x": "X",
    markdown: "FileText",
  };

  const IconComponent = Icons[iconMap[icon] || "Circle"] as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  return (
    <Button
      key={icon}
      type="button"
      title={title}
      variant={active ? "default" : "outline"}
      size="icon-sm"
      className="mr-2 mb-2"
      disabled={!usable}
      onClick={(event) => {
        event.preventDefault();
        if (editor.current) this.execute(editor.current);
      }}
    >
      <IconComponent className="size-4" />
    </Button>
  );
}
