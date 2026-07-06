"use client";

import { CopyOverlay } from "./index";

const command = "npx shadcn-helper add @mobx-restful-shadcn/copy-overlay";

export const CopyOverlayExample = () => (
  <div className="w-full max-w-2xl p-8">
    <div className="group relative inline-flex max-w-full items-center gap-2 rounded-md border px-3 py-2 font-mono text-sm">
      <span aria-hidden className="select-none text-muted-foreground">
        $
      </span>
      <kbd className="max-w-full overflow-x-auto whitespace-nowrap bg-transparent">
        {command}
      </kbd>
      <CopyOverlay>{command}</CopyOverlay>
    </div>
  </div>
);
