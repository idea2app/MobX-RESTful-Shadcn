"use client";

import { computed } from "mobx";
import { observer } from "mobx-react";
import { GitRepository } from "mobx-github";

import { BadgeBar } from "../badge-bar/badge-bar";
import { i18n, repositoryStore } from "@/models/example";
import { Column, RestTable } from "./rest-table";

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
        translator={{
          ...i18n,
          t: (key: string, data?: Record<string, any>) => {
            const translations: Record<string, string> = {
              create: "Create",
              view: "View",
              edit: "Edit",
              delete: "Delete",
              total_x_rows: `Total ${data?.totalCount || 0} rows`,
              sure_to_delete_x: `Are you sure to delete ${data?.keys || ""}?`,
            };
            return translations[key] || key;
          },
        }}
        onCheck={(keys) => console.log("Checked keys:", keys)}
      />
    </div>
  );
});
