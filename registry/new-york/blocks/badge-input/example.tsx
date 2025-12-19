"use client";

import { useState } from "react";

import { BadgeInput } from "./badge-input";

export const BadgeInputExample = () => {
  const [tags, setTags] = useState<string[]>(["React", "TypeScript", "Next.js"]);
  const [emails, setEmails] = useState<string[]>(["user@example.com"]);

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tag Input</h3>
        <BadgeInput
          value={tags}
          onChange={setTags}
          type="text"
          placeholder="Type and press Enter to add tags..."
        />
        <p className="text-sm text-muted-foreground mt-2">
          Press Enter to add a tag, Backspace to remove the last tag
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Email Input</h3>
        <BadgeInput
          value={emails}
          onChange={setEmails}
          type="email"
          placeholder="Enter email addresses..."
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Current Values</h3>
        <div className="space-y-2">
          <div>
            <strong>Tags:</strong>
            <pre className="p-4 bg-muted rounded-md mt-2">
              {JSON.stringify(tags, null, 2)}
            </pre>
          </div>
          <div>
            <strong>Emails:</strong>
            <pre className="p-4 bg-muted rounded-md mt-2">
              {JSON.stringify(emails, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
