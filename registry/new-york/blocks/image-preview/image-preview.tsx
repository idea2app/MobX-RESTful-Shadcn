"use client"

import { Component } from "react"
import classNames from "classnames"
import { observable } from "mobx"
import { observer } from "mobx-react"
import { Loader2 } from "lucide-react"
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

@observer
export class ImagePreview extends Component<ImagePreviewProps> {
  static readonly displayName = "ImagePreview"

  @observable
  downloading = false

  @observable
  loadedPath = ""

  @observable
  viewing = false

  componentDidMount() {
    const { src } = this.props

    this.loadedPath = ""

    if (src) this.load(src)
  }

  componentDidUpdate(prevProps: ImagePreviewProps) {
    const { src } = this.props

    if (src !== prevProps.src) {
      this.loadedPath = ""
      if (src) this.load(src)
    }
  }

  async load(path: string) {
    this.downloading = true

    try {
      await new Promise((resolve, reject) => {
        const image = new globalThis.Image()

        image.onload = resolve
        image.onerror = reject

        image.src = path
      })

      this.loadedPath = path
    } catch {
      // Handle error silently
    } finally {
      this.downloading = false
    }
  }

  render() {
    const { downloading, loadedPath, viewing } = this
    const { className, src, ...props } = this.props

    const fileName = loadedPath ? decodeURI(loadedPath.split("/").pop() || "image") : "image"

    return (
      <>
        <div
          className={classNames(
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
                className="object-contain cursor-pointer max-w-full h-auto"
                src={loadedPath}
                loading="lazy"
                onClick={() => (this.viewing = true)}
              />
            )
          )}
        </div>
        <Dialog open={viewing} onOpenChange={(open) => (this.viewing = open)}>
          <DialogContent className="max-w-4xl">
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
            <div className="text-center">
              <img
                className="max-w-full h-auto mx-auto"
                src={loadedPath}
              />
            </div>
            <DialogFooter className="justify-center">
              <a
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                href={loadedPath}
                target="_blank"
                rel="noopener noreferrer"
                download={fileName}
              >
                {fileName}
              </a>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}
