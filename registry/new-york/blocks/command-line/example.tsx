"use client";

import { CommandLine } from "./index";

export const CommandLineExample = () => (
  <div className="w-full max-w-2xl p-8">
    <CommandLine>
      npx shadcn-helper add @mobx-restful-shadcn/command-line
    </CommandLine>
  </div>
);
