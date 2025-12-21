"use client";

import { FC, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EdgePosition = "top" | "bottom" | "left" | "right";

export type TouchHandler = (edge: EdgePosition) => void;

export interface ScrollBoundaryProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<Record<EdgePosition, ReactNode>> {
  onTouch: TouchHandler;
}

const EdgeOrder: EdgePosition[] = ["top", "right", "bottom", "left"];

const touch = (edge: EdgePosition, onTouch: TouchHandler) => {
  let observer: IntersectionObserver | undefined;

  return (node: HTMLElement | null) => {
    if (!node) return observer?.disconnect();

    const anchor = node.parentElement?.parentElement;

    const { overflowX, overflowY } = anchor ? getComputedStyle(anchor) : {};

    const root = `${overflowX}${overflowY}`.match(/auto|scroll/)
      ? anchor
      : null;

    const edgeMargins = Array(4).fill("0px");
    edgeMargins[EdgeOrder.indexOf(edge)] = "200px";

    observer = new IntersectionObserver(
      ([{ isIntersecting }]) => isIntersecting && onTouch(edge),
      {
        root,
        rootMargin: edgeMargins.join(" "),
      },
    );
    observer.observe(node);
  };
};

export const ScrollBoundary: FC<ScrollBoundaryProps> = ({
  className,
  onTouch,
  top,
  left,
  right,
  bottom,
  children,
  ...props
}) => (
  <div className={cn("relative", className)} {...props}>
    <div className="absolute top-0 left-0 w-full" ref={touch("top", onTouch)}>
      {top}
    </div>
    <div className="absolute top-0 left-0 h-full" ref={touch("left", onTouch)}>
      {left}
    </div>

    {children}

    <div
      className="absolute top-0 right-0 h-full"
      ref={touch("right", onTouch)}
    >
      {right}
    </div>
    <div
      className="absolute bottom-0 left-0 w-full"
      ref={touch("bottom", onTouch)}
    >
      {bottom}
    </div>
  </div>
);

ScrollBoundary.displayName = "ScrollBoundary";
