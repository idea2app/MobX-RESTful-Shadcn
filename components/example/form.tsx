import { GitRepository } from "mobx-github";

import { i18n, topicStore } from "@/models/example";
import { BadgeBar } from "@/registry/new-york/blocks/badge-bar";
import { Field } from "@/registry/new-york/blocks/rest-form";
import { Column } from "@/registry/new-york/blocks/rest-table";
import { SearchableInput } from "@/registry/new-york/blocks/searchable-input";

export const columns: Column<GitRepository>[] = [
  {
    key: "full_name",
    renderHead: "Repository Name",
    renderBody: ({ html_url, full_name }) => (
      <a target="_blank" href={html_url} rel="noreferrer">
        {full_name}
      </a>
    ),
    required: true,
    minLength: 3,
    invalidMessage: "Input 3 characters at least",
  },
  { key: "homepage", type: "url", renderHead: "Home Page" },
  { key: "language", renderHead: "Programming Language" },
  {
    key: "topics",
    renderHead: "Topic",
    renderBody: ({ topics }) => (
      <BadgeBar
        list={(topics || []).map((text) => ({
          text,
          link: `https://github.com/topics/${text}`,
        }))}
      />
    ),
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
  { key: "stargazers_count", type: "number", renderHead: "Star Count" },
  { key: "description", renderHead: "Description", rows: 3 },
];

export const fields: Field<GitRepository>[] = columns.map(
  ({ renderHead, renderBody, ...meta }) => ({
    ...meta,
    renderLabel: renderHead,
  })
);
