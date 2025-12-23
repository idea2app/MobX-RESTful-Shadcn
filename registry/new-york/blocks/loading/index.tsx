import { FC, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "../spinner";

export type LoadingProps = HTMLAttributes<HTMLDivElement>;

export const Loading: FC<LoadingProps> = ({
  className,
  children = "Loading...",
  ...props
}) => (
  <div
    className={cn(
      "fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/25",
      className,
    )}
    {...props}
  >
    <div className="flex items-center gap-3">
      <Spinner className="text-primary" />

      {children && <span className="text-white">{children}</span>}
    </div>
  </div>
);

Loading.displayName = "Loading";
