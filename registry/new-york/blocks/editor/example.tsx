"use client";

import { configure } from "mobx";
import { formToJSON } from "web-utility";
import { Editor, OriginalTools, ExtraTools } from "./index";

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

        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
