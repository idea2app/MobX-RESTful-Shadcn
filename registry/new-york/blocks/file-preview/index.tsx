"use client";

import { FileArchive, FileSpreadsheet, FileText } from "lucide-react";
import { ComponentPropsWithRef, FC } from "react";
import { fileMetaOf } from "web-utility";

import { cn } from "@/lib/utils";
import { ImagePreview } from "../image-preview";

export type FilePreviewProps = Omit<ComponentPropsWithRef<"img">, "ref"> &
  Omit<ComponentPropsWithRef<"audio">, "ref"> &
  Omit<ComponentPropsWithRef<"video">, "ref"> &
  Omit<ComponentPropsWithRef<"a">, "ref"> & {
    type?: ComponentPropsWithRef<"input">["accept"];
    path?: string;
    file?: HTMLMediaElement["srcObject"];
  };

const getFileIcon = (extension?: string) => {
  if (!extension) return FileText;

  const lowerExt = extension.toLowerCase();

  if (["zip", "rar", "7z", "tar", "gz"].includes(lowerExt)) return FileArchive;

  if (["xls", "xlsx", "csv"].includes(lowerExt)) return FileSpreadsheet;

  return FileText;
};

export const FilePreview: FC<FilePreviewProps> = ({
  className,
  style,
  hidden,
  type,
  path,
  file,
  ...props
}) => {
  if (!file && !path) throw new URIError("No file or path provided");

  const meta =
      file instanceof EventTarget ? undefined : fileMetaOf(file || path || ""),
    name = meta?.name,
    category = meta?.category || type?.split("/")[0],
    extension = meta?.extension || undefined;

  const FileIcon = getFileIcon(extension);

  return (
    <figure
      className={cn("flex flex-col items-center justify-center m-0", className)}
      style={style}
      hidden={hidden}
      {...props}
    >
      {category === "image" ? (
        <ImagePreview
          className="h-full"
          src={file instanceof Blob ? file : path}
          {...props}
        />
      ) : category === "audio" ? (
        <audio
          className="max-w-full"
          controls
          src={path}
          ref={(node) => {
            if (node && file) node.srcObject = file;
          }}
          {...props}
        />
      ) : category === "video" ? (
        <video
          muted
          src={path}
          className="max-w-full max-h-[400px]"
          ref={(node) => {
            if (node && file) node.srcObject = file;
          }}
          onMouseEnter={({ currentTarget }) => currentTarget.play()}
          onMouseLeave={({ currentTarget }) => currentTarget.pause()}
          {...props}
        />
      ) : (
        <>
          <a
            className="inline-flex justify-center items-center p-4 rounded-lg border border-border hover:bg-accent transition-colors"
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            download={name}
          >
            <FileIcon className="h-12 w-12 text-muted-foreground" />
          </a>
          <figcaption className="max-w-full truncate text-sm text-muted-foreground mt-2">
            {name}
          </figcaption>
        </>
      )}
    </figure>
  );
};

FilePreview.displayName = "FilePreview";
