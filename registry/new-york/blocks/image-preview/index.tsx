"use client";

import { observable } from "mobx";
import { observer } from "mobx-react";
import { ObservedComponent, reaction } from "mobx-react-helper";
import { ImgHTMLAttributes } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Spinner } from "../spinner";

export type ImagePreviewProps = ImgHTMLAttributes<HTMLImageElement> &
  Partial<Pick<HTMLMediaElement, "srcObject">>;

@observer
export class ImagePreview extends ObservedComponent<ImagePreviewProps> {
  static readonly displayName = "ImagePreview";

  @observable
  accessor downloading = false;

  @observable
  accessor loadedPath = "";

  @observable
  accessor viewing = false;

  objectURL = "";

  @reaction(({ observedProps }) => observedProps.src + observedProps.srcObject)
  componentDidMount() {
    const { src, srcObject } = this.observedProps;

    if (this.objectURL) {
      URL.revokeObjectURL(this.objectURL);
      this.objectURL = "";
    }

    this.loadedPath = "";

    if (srcObject instanceof Blob || srcObject instanceof MediaSource) {
      this.objectURL = URL.createObjectURL(srcObject);
      this.load(this.objectURL);
    } else if (src) {
      this.load(src);
    }
  }

  componentWillUnmount() {
    if (this.objectURL) URL.revokeObjectURL(this.objectURL);
  }

  async load(path: string) {
    this.downloading = true;

    try {
      await new Promise((resolve, reject) => {
        const image = new globalThis.Image();

        image.onload = resolve;
        image.onerror = reject;

        image.src = path;
      });

      this.loadedPath = path;
    } finally {
      this.downloading = false;
    }
  }

  render() {
    const { downloading, loadedPath, viewing } = this;
    const { className, src, ...props } = this.props;

    const fileName = loadedPath
      ? decodeURI(loadedPath.split("/").pop() || "image")
      : "image";

    return (
      <div
        className={cn(
          "m-0",
          downloading && "flex justify-center items-center min-h-[100px]",
          className,
        )}
        {...props}
      >
        {downloading ? (
          <Spinner className="text-muted-foreground" />
        ) : (
          loadedPath && (
            <img
              className="object-contain cursor-pointer max-w-full h-auto"
              src={loadedPath}
              loading="lazy"
              alt="Preview"
              onClick={() => (this.viewing = true)}
            />
          )
        )}
        <Dialog open={viewing} onOpenChange={(open) => (this.viewing = open)}>
          <DialogContent className="max-w-4xl">
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
            <div className="text-center">
              <img
                className="max-w-full h-auto mx-auto"
                src={loadedPath}
                alt="Preview"
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
      </div>
    );
  }
}
