"use client";

import { fields } from "@/components/example/form";
import { i18n, repositoryStore } from "@/models/example";
import { RestForm } from "./index";

export const RestFormExample = () => (
  <div className="w-full max-w-2xl space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Example Form</h3>
      <RestForm
        fields={fields}
        store={repositoryStore as any}
        translator={i18n}
        onSubmit={(data) => console.log("Form submitted:", data)}
        onReset={(data) => console.log("Form reset:", data)}
      />
    </div>
  </div>
);
