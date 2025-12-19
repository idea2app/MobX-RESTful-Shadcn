"use client";

import { useState } from "react";
import { makeObservable, observable } from "mobx";
import { TranslationModel } from "mobx-i18n";

import { SearchableInput } from "./searchable-input";

interface Item {
  id: number;
  name: string;
}

class ExampleStore {
  indexKey = "id" as const;

  @observable
  accessor currentOne: Item = {} as Item;

  @observable
  accessor allItems: Item[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
    { id: 4, name: "Date" },
    { id: 5, name: "Elderberry" },
  ];

  @observable
  accessor downloading = 0;

  @observable
  accessor uploading = 0;

  constructor() {
    makeObservable(this);
  }

  async getList(filter?: any) {
    const keyword = filter?.name?.toLowerCase() || "";
    this.allItems = [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
      { id: 4, name: "Date" },
      { id: 5, name: "Elderberry" },
    ].filter((item) => item.name.toLowerCase().includes(keyword));
    return { pageData: this.allItems };
  }

  clearList() {
    this.allItems = [];
  }

  clearCurrent() {
    this.currentOne = {} as Item;
  }
}

const translator = new TranslationModel({
  "en-US": {
    load_more: "Load more...",
    no_more: "No more items",
  },
});

export const SearchableInputExample = () => {
  const [store] = useState(() => new ExampleStore());
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Searchable Input</h3>
        <SearchableInput
          store={store as any}
          translator={translator as any}
          labelKey="name"
          valueKey="id"
          name="items"
          placeholder="Search items..."
          multiple
          defaultValue={selectedItems}
          onChange={(value: any) => setSelectedItems(value)}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Type to search for items
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Selected Items</h3>
        <pre className="p-4 bg-muted rounded-md text-xs overflow-auto">
          {JSON.stringify(selectedItems, null, 2)}
        </pre>
      </div>
    </div>
  );
};
