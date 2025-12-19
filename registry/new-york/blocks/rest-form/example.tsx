"use client";

import { useState } from "react";
import { makeObservable, observable } from "mobx";
import { TranslationModel } from "mobx-i18n";
import { ListModel } from "mobx-restful";

import { RestForm, Field } from "./rest-form";

interface FormData {
  name: string;
  email: string;
  age: number;
  bio: string;
}

class ExampleStore extends ListModel<FormData> {
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

export const RestFormExample = () => {
  const [store] = useState(() => new ExampleStore());
  const [translator] = useState(() => new ExampleTranslator());

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Example Form</h3>
        <RestForm
          fields={fields}
          store={store}
          translator={translator}
          onSubmit={(data) => console.log("Form submitted:", data)}
          onReset={(data) => console.log("Form reset:", data)}
        />
      </div>
    </div>
  );
};
