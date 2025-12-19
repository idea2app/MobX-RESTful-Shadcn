"use client";

import { configure } from "mobx";
import { formToJSON } from "web-utility";
import { Editor, OriginalTools, ExtraTools } from "./index";
import { Button } from "@/components/ui/button";

configure({ enforceActions: "never" });

export default function EditorExample() {
  return (
    <form
      className="container mx-auto max-w-4xl p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const { content } = formToJSON(event.currentTarget);
        alert(content);
      }}
    >
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Rich Text Editor</h1>
          <p className="text-muted-foreground mb-4">
            A lightweight rich text editor based on Edkit and Shadcn UI
          </p>
        </div>

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
}
