"use client";

import { useState } from "react";

import { i18n, topicStore } from "@/models/example";
import { OptionData, SearchableInput } from "./searchable-input";

export const SearchableInputExample = () => {
  const [selectedTopics, setSelectedTopics] = useState<OptionData[]>([]);

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Searchable Input</h3>
        <SearchableInput
          store={topicStore}
          translator={i18n}
          labelKey="name"
          valueKey="name"
          name="topics"
          placeholder="Search topics..."
          multiple
          defaultValue={selectedTopics}
          onChange={(value) => setSelectedTopics(value)}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Type to search for topics
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Selected Topics</h3>

        <pre className="p-4 bg-muted rounded-md text-xs overflow-auto">
          {JSON.stringify(selectedTopics, null, 2)}
        </pre>
      </div>
    </div>
  );
};
