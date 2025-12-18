"use client";

import { useState } from "react";
import { makeObservable } from "mobx";
import { DataObject, ListModel } from "mobx-restful";

import { SearchableInput, OptionData } from "./searchable-input";

interface User extends DataObject {
  id: string;
  name: string;
  email: string;
}

// Mock store for demonstration
class MockUserStore extends ListModel<User> {
  constructor() {
    super();
    makeObservable(this);
  }

  async getList(filter?: any, page = 1) {
    // Simulate API call
    const mockUsers: User[] = [
      { id: "1", name: "John Doe", email: "john@example.com" },
      { id: "2", name: "Jane Smith", email: "jane@example.com" },
      { id: "3", name: "Bob Johnson", email: "bob@example.com" },
      { id: "4", name: "Alice Williams", email: "alice@example.com" },
    ];

    // Filter by name if search term provided
    const filtered = filter?.name
      ? mockUsers.filter((u) =>
          u.name.toLowerCase().includes(filter.name.toLowerCase())
        )
      : mockUsers;

    this.allItems = filtered;
    return filtered;
  }
}

const mockStore = new MockUserStore();

export const SearchableInputExample = () => {
  const [selectedUsers, setSelectedUsers] = useState<OptionData[]>([]);

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Single Select Search</h3>
        <SearchableInput
          store={mockStore}
          translator={{} as any}
          labelKey="name"
          valueKey="id"
          value={selectedUsers}
          onChange={setSelectedUsers}
          placeholder="Search users..."
          multiple={false}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Type to search and select a user
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Multiple Select Search</h3>
        <SearchableInput
          store={mockStore}
          translator={{} as any}
          labelKey="name"
          valueKey="id"
          value={selectedUsers}
          onChange={setSelectedUsers}
          placeholder="Search and select multiple users..."
          multiple={true}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Selected Values</h3>
        <pre className="p-4 bg-muted rounded-md">
          {JSON.stringify(selectedUsers, null, 2)}
        </pre>
      </div>
    </div>
  );
};
