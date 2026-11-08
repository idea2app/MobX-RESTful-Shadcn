"use client";

import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";

import { i18n, topicStore } from "@/models/example";
import { OptionData, SearchableInput } from "./index";

@observer
export class SearchableInputExample extends Component {
  @observable accessor selectedTopics: OptionData[] = [];

  setSelectedTopics = action((selectedTopics: OptionData[]) => {
    this.selectedTopics = selectedTopics;
  });

  render() {
    const { selectedTopics } = this;

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
            onChange={this.setSelectedTopics}
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
  }
}
