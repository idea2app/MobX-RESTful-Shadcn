"use client";

import { EditorComponent, ImageTool, Tool, editor } from "edkit";
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import { FormComponent, FormComponentProps } from "mobx-react-helper";
import { createRef } from "react";
import { Constructor } from "web-utility";

import { cn } from "@/lib/utils";
import { AudioTool, DefaultTools, VideoTool } from "./tools";

export interface EditorProps extends FormComponentProps {
  className?: string;
  tools?: Constructor<Tool>[];
}

export interface Editor extends EditorComponent {}

@observer
@editor
export class Editor
  extends FormComponent<EditorProps>
  implements EditorComponent
{
  static displayName = "Editor";

  box = createRef<HTMLDivElement>();

  @observable
  accessor cursorPoint = "";

  @computed
  get toolList(): Tool[] {
    return (this.observedProps.tools || DefaultTools).map(
      (ToolButton) => new ToolButton()
    );
  }

  @computed
  get imageTool() {
    return this.toolList.find((tool) => tool instanceof ImageTool) as ImageTool;
  }

  @computed
  get audioTool() {
    return this.toolList.find((tool) => tool instanceof AudioTool) as AudioTool;
  }

  @computed
  get videoTool() {
    return this.toolList.find((tool) => tool instanceof VideoTool) as VideoTool;
  }

  componentDidMount() {
    super.componentDidMount();

    const { defaultValue } = this.props;

    if (defaultValue != null) this.box.current!.innerHTML = defaultValue;

    document.addEventListener("selectionchange", this.updateTools);
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    document.removeEventListener("selectionchange", this.updateTools);
  }

  updateTools = () => {
    if (this.box.current !== document.activeElement) return;

    const { endContainer } = getSelection()?.getRangeAt(0) || {};
    const { x, y } =
      (endContainer instanceof Element
        ? endContainer
        : endContainer?.parentElement
      )?.getBoundingClientRect() || {};

    this.cursorPoint = [x, y] + "";
  };

  updateValue = (markup: string) => (this.innerValue = markup.trim());

  render() {
    // Don't remove unused variable `cursorPoint`, which is used for triggering updates
    const { cursorPoint, toolList, innerValue } = this;
    const { name, className } = this.props;

    return (
      <>
        <header className="flex flex-wrap gap-1 mb-2">
          {toolList.map((tool) => tool.render(this.box))}
        </header>
        <div
          ref={this.box}
          className={cn(
            "min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2",
            "text-base shadow-xs outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          contentEditable
          onInput={({ currentTarget: { innerHTML } }) =>
            this.updateValue(innerHTML)
          }
          onPaste={this.handlePasteDrop}
          onDrop={this.handlePasteDrop}
        />
        <input type="hidden" name={name} value={innerValue} />
      </>
    );
  }
}
