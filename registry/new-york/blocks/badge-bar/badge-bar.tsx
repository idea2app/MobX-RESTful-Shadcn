"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const VariantColors = [
  "default",
  "secondary",
  "outline",
  "destructive",
] as const

export type BadgeVariant = (typeof VariantColors)[number]

export const text2color = (raw: string): BadgeVariant => {
  const sum = Array.from(raw).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  )
  return VariantColors[sum % VariantColors.length]
}

const isValidUrl = (text: string): boolean => {
  try {
    new URL(text)
    return true
  } catch {
    return false
  }
}

export interface BadgeItem {
  text: string
  link?: string
}

export interface BadgeBarProps extends React.HTMLAttributes<HTMLUListElement> {
  list: BadgeItem[]
  bgResolver?: (text: string) => BadgeVariant
  onCheck?: (item: BadgeItem, index: number) => void
  onDelete?: (item: BadgeItem, index: number) => void
}

export function BadgeBar({
  className,
  list,
  bgResolver = text2color,
  onCheck,
  onDelete,
  ...props
}: BadgeBarProps) {
  return (
    <ul
      className={cn("m-0 flex flex-wrap gap-2 list-none", className)}
      {...props}
    >
      {list.map(({ text, link }, index) => (
        <Badge
          key={`${text}-${index}`}
          variant={bgResolver(text)}
          asChild={!!(link || isValidUrl(text))}
          className="flex items-center gap-2"
        >
          {link || isValidUrl(text) ? (
            <a
              href={link || text}
              className="no-underline"
              onClick={(e) => {
                if (onCheck) {
                  e.preventDefault()
                  onCheck({ text, link }, index)
                }
              }}
            >
              {text}
              {onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDelete({ text, link }, index)
                  }}
                  className="ml-1 rounded-full hover:bg-background/20"
                  aria-label="Remove badge"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </a>
          ) : onCheck ? (
            <span
              onClick={() => onCheck({ text, link }, index)}
              className="cursor-pointer"
            >
              {text}
              {onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete({ text, link }, index)
                  }}
                  className="ml-1 rounded-full hover:bg-background/20"
                  aria-label="Remove badge"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ) : (
            <span>
              {text}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete({ text, link }, index)}
                  className="ml-1 rounded-full hover:bg-background/20"
                  aria-label="Remove badge"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          )}
        </Badge>
      ))}
    </ul>
  )
}

BadgeBar.displayName = "BadgeBar"
