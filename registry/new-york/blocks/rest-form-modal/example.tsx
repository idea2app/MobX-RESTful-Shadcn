"use client";

import { GitRepository } from "mobx-github";

import { fields } from "@/components/example/form";
import { Button } from "@/components/ui/button";
import { i18n, repositoryStore } from "@/models/example";
import { RestFormModal } from "./rest-form-modal";

export const RestFormModalExample = () => (
  <div className="w-full space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Click button to open form modal
      </h3>
      <Button
        onClick={() => (repositoryStore.currentOne = {} as GitRepository)}
      >
        Edit User
      </Button>
    </div>

    <RestFormModal
      fields={fields}
      store={repositoryStore}
      translator={i18n}
      onSubmit={(data) => console.log("Form submitted:", data)}
    />
  </div>
);
