"use client";

import { useState } from "react";
import { makeObservable, observable } from "mobx";
import { TranslationModel } from "mobx-i18n";

import { Button } from "@/components/ui/button";
import { RestFormModal } from "./rest-form-modal";
import { Field } from "../rest-form/rest-form";

interface FormData {
  id: number;
  name: string;
  email: string;
}

class ExampleStore {
  indexKey = "id" as const;

  @observable
  accessor currentOne: FormData = {} as FormData;

  @observable
  accessor downloading = 0;

  @observable
  accessor uploading = 0;

  constructor() {
    makeObservable(this);
  }

  async updateOne(data: FormData) {
    console.log("Submitting:", data);
    return data;
  }

  clearCurrent() {
    this.currentOne = {} as FormData;
  }

  async getOne(id: any) {
    console.log("Getting:", id);
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

const translator = new TranslationModel({
  "en-US": {
    submit: "Submit",
    cancel: "Cancel",
  },
});

export const RestFormModalExample = () => {
  const [store] = useState(() => new ExampleStore());

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
        store={store as any}
        translator={translator}
        onSubmit={(data: any) => console.log("Form submitted:", data)}
      />
    </div>
  );
};
