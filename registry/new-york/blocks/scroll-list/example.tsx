"use client";

import { RepositoryModel } from "mobx-github";
import { TranslationModel } from "mobx-i18n";

import { ScrollList } from "./index";

const repositoryStore = new RepositoryModel("idea2app");

const translator = new TranslationModel({
  "en-US": {
    load_more: "Loading more...",
    no_more: "No more items",
  },
});

export const ScrollListExample = () => (
  <div className="w-full space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Infinite Scroll List</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Scroll to the bottom to load more items automatically
      </p>
      <div className="border rounded-lg overflow-auto h-96">
        <ScrollList
          translator={translator}
          store={repositoryStore}
          renderList={(items) => (
            <div className="divide-y">
              {items.map(({ id, name, description }) => (
                <div key={id} className="p-4 hover:bg-accent">
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  </div>
);
