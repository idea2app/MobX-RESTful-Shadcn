"use client";

import { TypeWriter } from "./index";

export const TypeWriterExample = () => (
  <div className="w-full max-w-2xl p-8">
    <div className="inline-flex max-w-full items-center gap-2 rounded-md px-3 py-2 font-mono text-sm">
      <kbd className="max-w-full overflow-x-auto whitespace-nowrap bg-transparent">
        <TypeWriter>some AI typing...</TypeWriter>
      </kbd>
    </div>
  </div>
);
