"use client";

import { OutputData } from "@editorjs/editorjs";
import { action, configure, observable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";

import { Button } from "@/components/ui/button";
import { EditorHTML } from "../editor-html";
import { EditorJS } from "./index";

configure({ enforceActions: "never" });

const defaultValue: OutputData = {
  blocks: [{ type: "paragraph", data: { text: "Hello <b>Editor.js</b>!" } }],
};

@observer
export class EditorJSExample extends Component {
  @observable accessor data = defaultValue;

  setData = action((data: OutputData) => {
    this.data = data;
  });

  render() {
    const { data } = this;

    return (
      <form
        className="w-full space-y-4"
        onSubmit={(event) => {
          event.preventDefault();

          const input = event.currentTarget.elements.namedItem(
            "content",
          ) as HTMLInputElement;

          this.setData(JSON.parse(input.value));
        }}
      >
        <EditorJS name="content" defaultValue={defaultValue} />
        <Button type="submit">Submit</Button>

        <EditorHTML className="prose max-w-none" data={data} />
      </form>
    );
  }
}
