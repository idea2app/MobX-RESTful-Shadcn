"use client";

import { FileArchive, FileSpreadsheet, FileText } from "lucide-react";
import {
  FC,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";
import { ImagePreview } from "../image-preview";

export type FilePreviewProps = ImgHTMLAttributes<HTMLImageElement> &
  HTMLAttributes<HTMLAudioElement> &
  HTMLAttributes<HTMLVideoElement> &
  HTMLAttributes<HTMLAnchorElement> & {
    type?: InputHTMLAttributes<HTMLInputElement>["accept"];
    path: string;
  };

export const FileTypeMap: Record<string, string> = {
  stream: "binary",
  compressed: "zip",
  msword: "doc",
  document: "docx",
  powerpoint: "ppt",
  presentation: "pptx",
  excel: "xls",
  sheet: "xlsx",
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
  ...props
}) => {
  const [category, ...kind] = type?.split(/\W+/) || [],
    fileName = decodeURI(
      new URL(path, "http://localhost").pathname.split("/").at(-1) || "",
    );
  const extension =
    FileTypeMap[kind.at(-1) || ""] ||
    (fileName?.includes(".") ? fileName.split(".").at(-1) : kind.at(-1));

  const FileIcon = getFileIcon(extension);

  return (
    <figure
      className={cn("flex flex-col items-center justify-center m-0", className)}
      style={style}
      hidden={hidden}
      {...props}
    >
      {category === "image" ? (
        <ImagePreview className="h-full" {...props} src={path} />
      ) : category === "audio" ? (
        <audio className="max-w-full" {...props} controls src={path} />
      ) : category === "video" ? (
        <video
          muted
          src={path}
          className="max-w-full max-h-[400px]"
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
            download={fileName}
          >
            <FileIcon className="h-12 w-12 text-muted-foreground" />
          </a>
          <figcaption className="max-w-full truncate text-sm text-muted-foreground mt-2">
            {fileName}
          </figcaption>
        </>
      )}
    </figure>
  );
};

FilePreview.displayName = "FilePreview";
