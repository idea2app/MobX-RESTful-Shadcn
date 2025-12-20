"use client";

import { DataObject } from "mobx-restful";

import { Input } from "@/components/ui/input";
import { ArrayField } from "./index";

interface TodoItem extends DataObject {
  title: string;
  completed?: boolean;
}

export const ArrayFieldExample = () => (
  <div className="w-full space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Array Field with Inputs</h3>
      <ArrayField<TodoItem>
        renderItem={({ title }, index) => (
          <Input
            name="title"
            defaultValue={title}
            placeholder={`Task ${index + 1}`}
          />
        )}
      />
    </div>
  </div>
);
