import { GitRepository } from "mobx-github";

import { i18n, topicStore } from "@/models/example";
import { Field } from "@/registry/new-york/blocks/rest-form/rest-form";
import { SearchableInput } from "@/registry/new-york/blocks/searchable-input/searchable-input";

export const fields: Field<GitRepository>[] = [
  {
    key: "full_name",
    renderLabel: "Repository Name",
    required: true,
    minLength: 3,
    invalidMessage: "Input 3 characters at least",
  },
  { key: "homepage", type: "url", renderLabel: "Home Page" },
  { key: "language", renderLabel: "Programming Language" },
  {
    key: "topics",
    renderLabel: "Topic",
    renderInput: ({ topics }) => (
      <SearchableInput
        translator={i18n}
        store={topicStore}
        labelKey="name"
        valueKey="name"
        placeholder="search GitHub topics"
        multiple
        defaultValue={topics?.map((value) => ({ value, label: value }))}
      />
    ),
  },
  { key: "stargazers_count", type: "number", renderLabel: "Star Count" },
  { key: "description", renderLabel: "Description", rows: 3 },
];
