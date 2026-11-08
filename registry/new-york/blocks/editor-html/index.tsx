import { OutputData } from "@editorjs/editorjs";
import createParser from "editorjs-html";
import { ComponentPropsWithRef, ElementType, FC } from "react";

export const parser = createParser({
  link: ({ data: { link } }) => `<a href="${link}">${link}</a>`,
});

export interface EditorHTMLProps
  extends Omit<ComponentPropsWithRef<"div">, "children"> {
  as?: ElementType;
  data: OutputData;
}

export const EditorHTML: FC<EditorHTMLProps> = ({
  as: Root = "article",
  data,
  ...props
}) => (
  <Root {...props} dangerouslySetInnerHTML={{ __html: parser.parse(data) }} />
);

EditorHTML.displayName = "EditorHTML";
