import { FC, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { CopyOverlay } from "../copy-overlay";
import { TypeWriter } from "../type-writer";

export interface CommandLineProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  intervalSeconds?: number;
  copiedLabel?: string;
}

export const CommandLine: FC<CommandLineProps> = ({
  className,
  children,
  intervalSeconds = 0.1,
  copiedLabel = "Copied!",
  ...props
}) => (
  <div
    className={cn(
      "group relative inline-flex max-w-full items-center gap-2 rounded-md border px-3 py-2 font-mono text-sm",
      className,
    )}
    {...props}
  >
    <span aria-hidden className="select-none text-muted-foreground">
      $
    </span>
    <kbd
      aria-hidden
      className="relative z-10 max-w-full overflow-x-auto whitespace-nowrap bg-transparent"
    >
      <TypeWriter intervalSeconds={intervalSeconds}>{children}</TypeWriter>
    </kbd>
    <span className="sr-only">{children}</span>
    <CopyOverlay copiedLabel={copiedLabel}>{children}</CopyOverlay>
  </div>
);

CommandLine.displayName = "CommandLine";
