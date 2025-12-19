"use client";

import { useState } from "react";
import { makeObservable, observable } from "mobx";
import { TranslationModel } from "mobx-i18n";

import { RestForm, Field } from "./rest-form";

interface FormData {
  name: string;
  email: string;
  age: number;
  bio: string;
}

class ExampleStore {
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
    placeholder: "Enter your name",
  },
  {
    key: "email",
    type: "email",
    required: true,
    placeholder: "Enter your email",
  },
  {
    key: "age",
    type: "number",
    min: 0,
    max: 120,
    placeholder: "Enter your age",
  },
  {
    key: "bio",
    type: "text",
    rows: 4,
    placeholder: "Tell us about yourself",
  },
];

const translator = new TranslationModel({
  "en-US": {
    submit: "Submit",
    cancel: "Cancel",
  },
});

export const RestFormExample = () => {
  const [store] = useState(() => new ExampleStore());

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Example Form</h3>
        <RestForm
          fields={fields}
          store={store as any}
          translator={translator}
          onSubmit={(data) => console.log("Form submitted:", data)}
          onReset={(data) => console.log("Form reset:", data)}
        />
      </div>
    </div>
  );
};
