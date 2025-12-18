"use client"

import * as React from "react"
import { File, FileText, FileArchive, FileSpreadsheet } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImagePreview } from "@/registry/new-york/blocks/image-preview/image-preview"

export interface FilePreviewProps
  extends React.HTMLAttributes<HTMLElement> {
  type?: string
  path: string
}

export const FileTypeMap: Record<string, string> = {
  stream: "binary",
  compressed: "zip",
  msword: "doc",
  document: "docx",
  powerpoint: "ppt",
  presentation: "pptx",
  excel: "xls",
  sheet: "xlsx",
}

const getFileIcon = (extension?: string) => {
  if (!extension) return FileText

  const lowerExt = extension.toLowerCase()
  if (["zip", "rar", "7z", "tar", "gz"].includes(lowerExt)) {
    return FileArchive
  }
  if (["xls", "xlsx", "csv"].includes(lowerExt)) {
    return FileSpreadsheet
  }
  return FileText
}

export function FilePreview({
  className,
  style,
  hidden,
  type,
  path,
  ...props
}: FilePreviewProps) {
  const [category, ...kind] = type?.split(/\W+/) || []
  
  let fileName: string
  try {
    const url = new URL(path)
    fileName = decodeURI(url.pathname.split("/").pop() || "")
  } catch {
    // If path is not a valid URL, treat it as a relative path
    fileName = decodeURI(path.split("/").pop() || "")
  }
  const extension =
    FileTypeMap[kind.at(-1) || ""] ||
    (fileName?.includes(".") ? fileName.split(".").pop() : kind.at(-1))

  const FileIcon = getFileIcon(extension)

  return (
    <figure
      className={cn(
        "flex flex-col items-center justify-center m-0",
        className
      )}
      style={style}
      hidden={hidden}
      {...props}
    >
      {category === "image" ? (
        <ImagePreview className="h-full" src={path} />
      ) : category === "audio" ? (
        <audio controls src={path} className="max-w-full" />
      ) : category === "video" ? (
        <video
          muted
          src={path}
          className="max-w-full max-h-[400px]"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => e.currentTarget.pause()}
          controls
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
  )
}

FilePreview.displayName = "FilePreview"
