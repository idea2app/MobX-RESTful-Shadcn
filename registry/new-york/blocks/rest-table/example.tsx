"use client";

import { computed } from "mobx";
import { TranslationModel } from "mobx-i18n";
import { observer } from "mobx-react";
import { GitRepository } from "mobx-github";

import { BadgeBar } from "../badge-bar/badge-bar";
import { repositoryStore } from "@/models/example";
import { Column, RestTable } from "./rest-table";

const tableI18n = new TranslationModel({
  en_US: {
    load_more: "Load more",
    no_more: "No more",
    submit: "Submit",
    cancel: "Cancel",
    create: "Create",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    total_x_rows: "Total {{totalCount}} rows",
    sure_to_delete_x: "Are you sure to delete {{keys}}?",
  },
});

export const RestTableExample = observer(() => {
  const columns = computed<Column<GitRepository>[]>(() => [
    {
      key: "full_name",
      renderHead: "Repository Name",
      renderBody: ({ html_url, full_name }) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={html_url}
          className="text-primary hover:underline"
        >
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
    },
    { key: "stargazers_count", type: "number", renderHead: "Star Count" },
    {
      key: "description",
      renderHead: "Description",
      rows: 3,
      renderBody: ({ description }) => (
        <p className="m-0 truncate max-w-xs" title={description || ""}>
          {description}
        </p>
      ),
    },
  ]).get();

  return (
    <div className="w-full h-screen">
      <RestTable
        className="text-center"
        striped
        hover
        editable
        deletable
        columns={columns}
        store={repositoryStore}
        translator={tableI18n}
        onCheck={(keys) => console.log("Checked keys:", keys)}
      />
    </div>
  );
});
