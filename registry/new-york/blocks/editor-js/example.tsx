"use client";

import { OutputData } from "@editorjs/editorjs";
import { configure } from "mobx";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EditorHTML } from "../editor-html";
import { EditorJS } from "./index";

configure({ enforceActions: "never" });

const defaultValue: OutputData = {
  blocks: [{ type: "paragraph", data: { text: "Hello <b>Editor.js</b>!" } }],
};

export const EditorJSExample = () => {
  const [data, setData] = useState(defaultValue);

  return (
    <form
      className="w-full space-y-4"
      onSubmit={(event) => {
        event.preventDefault();

        const input = event.currentTarget.elements.namedItem(
          "content",
        ) as HTMLInputElement;

        setData(JSON.parse(input.value));
      }}
    >
      <EditorJS name="content" defaultValue={defaultValue} />
      <Button type="submit">Submit</Button>

      <EditorHTML className="prose max-w-none" data={data} />
    </form>
  );
};
