"use client";

import { columns } from "@/components/example/form";
import { i18n, repositoryStore } from "@/models/example";
import { RestTable } from "./rest-table";

export const RestTableExample = () => (
  <div className="w-full h-screen">
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
