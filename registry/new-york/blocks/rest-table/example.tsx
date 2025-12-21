"use client";

import { configure } from "mobx";

import { columns } from "@/components/example/form";
import { i18n, repositoryStore } from "@/models/example";
import { RestTable } from "./index";

configure({ enforceActions: "never" });

export const RestTableExample = () => (
  <div className="w-full">
    <RestTable
      className="text-center"
      editable
      deletable
      columns={columns}
      store={repositoryStore}
      translator={i18n}
      onCheck={(keys) => console.log("Checked keys:", keys)}
    />
  </div>
);
