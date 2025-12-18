"use client"

import { debounce } from "lodash"
import { when } from "mobx"
import { observer } from "mobx-react"
import { DataObject, Filter, ListModel, Stream } from "mobx-restful"
import { Component, ReactNode } from "react"
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
  renderList(allItems: D[]): ReactNode
}

@observer
export class ScrollList<
  D extends DataObject = DataObject,
  F extends Filter<D> = Filter<D>
> extends Component<ScrollListProps<D, F>> {
  static readonly displayName = "ScrollList"

  async componentDidMount() {
    const BaseStream = Stream<DataObject>
    const { filter, defaultData } = this.props

    const store = this.props.store as unknown as InstanceType<
      ReturnType<typeof BaseStream>
    >
    await when(() => store.downloading < 1)

    store.clearList()

    if (defaultData) await store.restoreList({ allItems: defaultData, filter })

    await store.getList(filter, store.pageList.length + 1)
  }

  componentWillUnmount() {
    this.props.store.clearList()
  }

  loadMore = debounce((edge: EdgePosition) => {
    const { store } = this.props

    if (edge === "bottom" && store.downloading < 1 && !store.noMore)
      store.getList()
  })

  render() {
    const { translator, store, renderList, ...props } = this.props
    const { t } = translator
    const { noMore, allItems } = store

    return (
      <ScrollBoundary {...props} onTouch={this.loadMore}>
        <div>
          {renderList(allItems)}

          <footer className="mt-2 text-center text-muted-foreground text-sm">
            {noMore || !allItems.length ? t("no_more") : t("load_more")}
          </footer>
        </div>
      </ScrollBoundary>
    )
  }
}
