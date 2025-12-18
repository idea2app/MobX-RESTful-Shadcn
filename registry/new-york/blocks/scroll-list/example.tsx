"use client"

import * as React from "react"
import { makeObservable, observable } from "mobx"
import { ListModel } from "mobx-restful"
import { ScrollList } from "./scroll-list"

// Mock data type
interface Item {
  id: number
  title: string
  description: string
}

// Mock store that extends ListModel
class MockItemStore extends ListModel<Item> {
  constructor() {
    super()
    makeObservable(this, {
      downloading: observable,
      noMore: observable,
      allItems: observable,
    })
  }

  @observable
  accessor downloading = 0

  @observable
  accessor noMore = false

  @observable
  accessor allItems: Item[] = []

  @observable
  accessor pageList: Item[] = []

  async getList(filter?: any, pageIndex = 1) {
    this.downloading++

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate mock items
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: (pageIndex - 1) * 10 + i + 1,
      title: `Item ${(pageIndex - 1) * 10 + i + 1}`,
      description: `Description for item ${(pageIndex - 1) * 10 + i + 1}`,
    }))

    this.allItems = [...this.allItems, ...newItems]
    this.pageList = [...this.pageList, ...newItems]

    // Simulate end of data after 5 pages
    if (pageIndex >= 5) {
      this.noMore = true
    }

    this.downloading--
  }

  clearList() {
    this.allItems = []
    this.pageList = []
    this.noMore = false
  }

  async restoreList({ allItems }: any) {
    this.allItems = allItems
    this.pageList = allItems
  }
}

const translator = {
  t: (key: "load_more" | "no_more") =>
    key === "load_more" ? "Loading more..." : "No more items",
}

export default function ScrollListExample() {
  const [store] = React.useState(() => new MockItemStore())

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Infinite Scroll List</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Scroll to the bottom to load more items automatically
        </p>
        <div className="border rounded-lg overflow-auto h-96">
          <ScrollList
            translator={translator}
            store={store}
            renderList={(items) => (
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-accent">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}
