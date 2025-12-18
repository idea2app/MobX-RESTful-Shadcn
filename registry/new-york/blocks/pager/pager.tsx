"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface PageMeta {
  pageSize: number
  pageIndex: number
}

export interface PagerProps extends PageMeta {
  pageCount: number
  onChange?: (meta: PageMeta) => void
}

export function Pager({
  pageSize,
  pageIndex,
  pageCount,
  onChange,
}: PagerProps) {
  const [localPageSize, setLocalPageSize] = React.useState(pageSize)
  const [localPageIndex, setLocalPageIndex] = React.useState(pageIndex)

  React.useEffect(() => {
    setLocalPageSize(pageSize)
  }, [pageSize])

  React.useEffect(() => {
    setLocalPageIndex(pageIndex)
  }, [pageIndex])

  function propsOf(newPageIndex = 1) {
    return {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        onChange?.({ pageSize: localPageSize, pageIndex: newPageIndex })
      },
    }
  }

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0) {
      setLocalPageSize(value)
      onChange?.({ pageSize: value, pageIndex: localPageIndex })
    }
  }

  const handlePageIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0 && value <= pageCount) {
      setLocalPageIndex(value)
      onChange?.({ pageSize: localPageSize, pageIndex: value })
    }
  }

  const showFirstPage = pageIndex > 1
  const showPrevEllipsis = pageIndex > 3
  const showPrevPage = pageIndex > 2
  const showNextPage = pageCount - pageIndex > 1
  const showNextEllipsis = pageCount - pageIndex > 2
  const showLastPage = pageIndex < pageCount

  return (
    <form
      className="m-0 flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <Input
        type="number"
        name="pageSize"
        value={localPageSize}
        min={1}
        required
        onChange={handlePageSizeChange}
        className="w-20"
      />
      <span className="text-sm text-muted-foreground">×</span>
      <Input
        type="number"
        name="pageIndex"
        value={localPageIndex}
        min={1}
        max={pageCount}
        required
        onChange={handlePageIndexChange}
        className="w-20"
      />
      <nav className="flex items-center gap-1">
        {showFirstPage && (
          <Button
            variant="outline"
            size="sm"
            {...propsOf(1)}
            aria-label="Go to first page"
          >
            1
          </Button>
        )}
        {showPrevEllipsis && (
          <Button variant="ghost" size="sm" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
        {showPrevPage && (
          <Button
            variant="outline"
            size="sm"
            {...propsOf(pageIndex - 1)}
            aria-label="Go to previous page"
          >
            {pageIndex - 1}
          </Button>
        )}
        <Button variant="default" size="sm" disabled>
          {pageIndex}
        </Button>
        {showNextPage && (
          <Button
            variant="outline"
            size="sm"
            {...propsOf(pageIndex + 1)}
            aria-label="Go to next page"
          >
            {pageIndex + 1}
          </Button>
        )}
        {showNextEllipsis && (
          <Button variant="ghost" size="sm" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
        {showLastPage && (
          <Button
            variant="outline"
            size="sm"
            {...propsOf(pageCount)}
            aria-label="Go to last page"
          >
            {pageCount}
          </Button>
        )}
      </nav>
    </form>
  )
}

Pager.displayName = "Pager"
