"use client";

import { EditorCore, WrapperProps } from "@react-editor-js/core";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component, ComponentPropsWithRef, FocusEvent } from "react";
import { createReactEditorJS } from "react-editor-js";

import { cn } from "@/lib/utils";

const ReactEditorJS = createReactEditorJS();

export type EditorJSProps = WrapperProps &
  Pick<ComponentPropsWithRef<"input">, "name" | "required"> &
  Pick<
    ComponentPropsWithRef<"div">,
    "className" | "style" | "tabIndex" | "onBlur"
  >;

@observer
export class EditorJS extends Component<EditorJSProps> {
  static displayName = "EditorJS";

  private core?: EditorCore;

  @observable
  accessor innerValue = this.props.defaultValue;

  setInnerValue = action((value: typeof this.innerValue) => {
    this.innerValue = value;
  });

  handleBlur = async (event: FocusEvent<HTMLDivElement>) => {
    this.props.onBlur?.(event);

    if (this.core) this.setInnerValue(await this.core.save());
  };

  initialize = (core: EditorCore) => {
    this.props.onInitialize?.(core);

    this.core = core;
  };

  render() {
    const {
        name,
        required,
        className,
        style,
        tabIndex = -1,
        onBlur: _onBlur,
        children: _children,
        ...editorProps
      } = this.props,
      { innerValue } = this;

    return (
      <div
        className={cn("rounded-md border border-input p-3", className)}
        style={style}
        tabIndex={tabIndex}
        onBlur={this.handleBlur}
      >
        <input
          hidden
          {...{ name, required }}
          value={JSON.stringify(innerValue)}
          readOnly
        />
        <ReactEditorJS {...editorProps} onInitialize={this.initialize} />
      </div>
    );
  }
}
