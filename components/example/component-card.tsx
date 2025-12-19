import { FC, PropsWithChildren } from "react";

import { OpenInV0Button } from "./open-in-v0-button";

export type ComponentCardProps = PropsWithChildren<{
  name: string;
  description: string;
  minHeight?: string;
}>;

export const ComponentCard: FC<ComponentCardProps> = ({
  name,
  description,
  children,
  minHeight = "min-h-[400px]",
}) => (
  <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
    <div className="flex items-center justify-between">
      <h2 className="text-sm text-muted-foreground sm:pl-3">{description}</h2>
      <OpenInV0Button name={name} className="w-fit" />
    </div>
    <div className={`flex items-center justify-center ${minHeight} relative`}>
      {children}
    </div>
  </div>
);
