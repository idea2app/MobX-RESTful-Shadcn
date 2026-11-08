import { OutputData } from "@editorjs/editorjs";

import { EditorHTML } from "./index";

const data: OutputData = {
  blocks: [
    { type: "header", data: { text: "Editor HTML", level: 3 } },
    {
      type: "paragraph",
      data: { text: "Render <b>Editor.js</b> output data." },
    },
    {
      type: "list",
      data: { style: "unordered", items: ["First item", "Second item"] },
    },
  ],
};

export const EditorHTMLExample = () => (
  <EditorHTML className="w-full space-y-2" data={data} />
);
