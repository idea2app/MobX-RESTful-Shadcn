"use client";

import { configure } from "mobx";
import { formToJSON } from "web-utility";

import { Button } from "@/components/ui/button";
import { Editor, ExtraTools, OriginalTools } from "./index";

configure({ enforceActions: "never" });

export const EditorExample = () => (
  <form
    className="container mx-auto max-w-4xl p-6"
    onSubmit={(event) => {
      event.preventDefault();

      const { content } = formToJSON(event.currentTarget);

      alert(content);
    }}
  >
    <div className="space-y-4">
      <hgroup>
        <h1 className="text-2xl font-bold mb-2">HTML Editor</h1>
        <p className="text-muted-foreground mb-4">
          A lightweight rich text editor based on Edkit and Shadcn UI
        </p>
      </hgroup>

      <Editor
        tools={[...OriginalTools, ...ExtraTools]}
        name="content"
        defaultValue="Hello <b>Edkit</b>!"
        onChange={console.log}
      />
      <Button type="submit">Submit</Button>
    </div>
  </form>
);
