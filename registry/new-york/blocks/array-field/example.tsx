"use client";

import { useState } from "react";
import { DataObject } from "mobx-restful";

import { Input } from "@/components/ui/input";
import { ArrayField } from "./array-field";

interface TodoItem extends DataObject {
  title: string;
  completed?: boolean;
}

export const ArrayFieldExample = () => {
  const [items, setItems] = useState<TodoItem[]>([
    { title: "First task" },
    { title: "Second task" },
  ]);

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Array Field with Inputs</h3>
        <ArrayField<TodoItem>
          value={items}
          onChange={setItems}
          renderItem={(item, index) => (
            <Input
              name="title"
              defaultValue={item.title}
              placeholder={`Task ${index + 1}`}
            />
          )}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Current Values</h3>
        <pre className="p-4 bg-muted rounded-md">
          {JSON.stringify(items, null, 2)}
        </pre>
      </div>
    </div>
  );
};
