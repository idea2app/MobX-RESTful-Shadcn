"use client";

import { observable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";
import { sleep } from "web-utility";

import { cn } from "@/lib/utils";

export interface CopyOverlayProps {
  children: string;
  copiedLabel?: string;
}

@observer
export class CopyOverlay extends Component<CopyOverlayProps> {
  static readonly displayName = "CopyOverlay";

  protected static idSeed = 0;

  @observable
  accessor copied = false;

  protected readonly labelId =
    `command-line-copy-label-${++CopyOverlay.idSeed}`;

  protected onCopy = async () => {
    const { children } = this.props;

    if (!children) return;

    await navigator.clipboard.writeText(children);

    this.copied = true;

    await sleep(1.2);

    this.copied = false;
  };

  render() {
    const { copiedLabel = "Copied!" } = this.props;
    const { copied, labelId } = this;

    return (
      <>
        <button
          type="button"
          aria-label="Copy command"
          aria-describedby={labelId}
          className="absolute inset-0 z-20 rounded-md border-0 bg-transparent p-0 text-left"
          onClick={this.onCopy}
        >
          <span className="sr-only">Copy command</span>
        </button>
        <small
          id={labelId}
          aria-live="polite"
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground transition-opacity",
            copied ? "opacity-100" : "opacity-0",
          )}
        >
          {copiedLabel}
        </small>
      </>
    );
  }
}
