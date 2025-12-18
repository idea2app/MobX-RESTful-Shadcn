"use client"

import * as React from "react"
import { observer } from "mobx-react"
import { when } from "mobx"
import { DataObject, Filter, ListModel } from "mobx-restful"
import { debounce } from "lodash"
import {
  EdgePosition,
  ScrollBoundary,
  ScrollBoundaryProps,
} from "@/registry/new-york/blocks/scroll-boundary/scroll-boundary"

export interface ScrollListTranslator {
  t: (key: "load_more" | "no_more") => string
}

export interface ScrollListProps<
  D extends DataObject,
  F extends Filter<D> = Filter<D>
> extends Omit<ScrollBoundaryProps, "onTouch"> {
  translator: ScrollListTranslator
  store: ListModel<D, F>
  filter?: F
  defaultData?: D[]
  renderList: (allItems: D[]) => React.ReactNode
}

export const ScrollList = observer(function ScrollList<
  D extends DataObject = DataObject,
  F extends Filter<D> = Filter<D>
>({
  translator,
  store,
  filter,
  defaultData,
  renderList,
  ...props
}: ScrollListProps<D, F>) {
  const mountedRef = React.useRef(false)

  React.useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true

    const initData = async () => {
      await when(() => (store as any).downloading < 1)

      store.clearList()

      if (defaultData) {
        await (store as any).restoreList({ allItems: defaultData, filter })
      }

      await store.getList(filter, (store as any).pageList?.length + 1 || 1)
    }

    initData()

    return () => {
      store.clearList()
    }
  }, [store, filter, defaultData])

  const loadMore = React.useMemo(
    () =>
      debounce((edge: EdgePosition) => {
        const storeAny = store as any
        if (edge === "bottom" && storeAny.downloading < 1 && !storeAny.noMore) {
          store.getList()
        }
      }, 300),
    [store]
  )

  const { t } = translator
  const storeAny = store as any
  const noMore = storeAny.noMore || false
  const allItems = storeAny.allItems || []

  return (
    <ScrollBoundary {...props} onTouch={loadMore}>
      <div>
        {renderList(allItems)}

        <footer className="mt-2 text-center text-muted-foreground text-sm">
          {noMore || !allItems.length ? t("no_more") : t("load_more")}
        </footer>
      </div>
    </ScrollBoundary>
  )
})

ScrollList.displayName = "ScrollList"
