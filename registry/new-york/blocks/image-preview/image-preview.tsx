"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"

export interface ImagePreviewProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
}

export function ImagePreview({
  className,
  src,
  alt = "Preview",
  ...props
}: ImagePreviewProps) {
  const [downloading, setDownloading] = React.useState(false)
  const [loadedPath, setLoadedPath] = React.useState("")
  const [viewing, setViewing] = React.useState(false)

  React.useEffect(() => {
    if (!src) return

    setLoadedPath("")
    setDownloading(true)

    const image = new Image()

    image.onload = () => {
      setLoadedPath(src)
      setDownloading(false)
    }

    image.onerror = () => {
      setDownloading(false)
    }

    image.src = src
  }, [src])

  const fileName = src ? decodeURI(src.split("/").pop() || "image") : "image"

  return (
    <>
      <div
        className={cn(
          "m-0",
          downloading && "flex justify-center items-center min-h-[100px]",
          className
        )}
        {...props}
      >
        {downloading ? (
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        ) : (
          loadedPath && (
            <img
              src={loadedPath}
              alt={alt}
              className="object-contain cursor-pointer max-w-full h-auto"
              onClick={() => setViewing(true)}
              loading="lazy"
            />
          )
        )}
      </div>
      <Dialog open={viewing} onOpenChange={setViewing}>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <div className="text-center">
            <img
              src={loadedPath}
              alt={alt}
              className="max-w-full h-auto mx-auto"
            />
          </div>
          <DialogFooter className="justify-center">
            <a
              href={loadedPath}
              target="_blank"
              rel="noopener noreferrer"
              download={fileName}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {fileName}
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

ImagePreview.displayName = "ImagePreview"
