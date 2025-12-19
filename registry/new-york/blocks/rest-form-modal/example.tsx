"use client";

import { useState } from "react";
import { makeObservable, observable } from "mobx";
import { TranslationModel } from "mobx-i18n";
import { ListModel } from "mobx-restful";

import { Button } from "@/components/ui/button";
import { RestFormModal } from "./rest-form-modal";
import { Field } from "../rest-form/rest-form";

interface FormData {
  id: number;
  name: string;
  email: string;
}

class ExampleStore extends ListModel<FormData> {
  indexKey = "id" as const;

  @observable
  accessor currentOne: FormData = {} as FormData;

  constructor() {
    super();
    makeObservable(this);
  }

  async updateOne(data: FormData) {
    console.log("Submitting:", data);
    return data;
  }

  clearCurrent() {
    this.currentOne = {} as FormData;
  }
}

const fields: Field<FormData>[] = [
  {
    key: "name",
    type: "text",
    required: true,
    placeholder: "Enter name",
  },
  {
    key: "email",
    type: "email",
    required: true,
    placeholder: "Enter email",
  },
];

class ExampleTranslator extends TranslationModel<string> {
  @observable
  accessor currentLanguage = "en";

  constructor() {
    super();
    makeObservable(this);
  }

  t(key: string) {
    const translations: Record<string, string> = {
      submit: "Submit",
      cancel: "Cancel",
    };
    return translations[key] || key;
  }
}

export const RestFormModalExample = () => {
  const [store] = useState(() => new ExampleStore());
  const [translator] = useState(() => new ExampleTranslator());

  const openModal = () => {
    store.currentOne = { id: 1, name: "John Doe", email: "john@example.com" };
  };

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Click button to open form modal
        </h3>
        <Button onClick={openModal}>Edit User</Button>
      </div>

      <RestFormModal
        fields={fields}
        store={store}
        translator={translator}
        onSubmit={(data) => console.log("Form submitted:", data)}
      />
    </div>
  );
};
