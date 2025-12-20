"use client";

import { FormField } from "./index";

export const FormFieldExample = () => (
  <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Text Input</h3>
        <FormField
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          required
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Email Input</h3>
        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Textarea</h3>
        <FormField
          label="Message"
          name="message"
          rows={4}
          placeholder="Enter your message here..."
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Select Dropdown</h3>
        <FormField
          label="Country"
          name="country"
          options={[
            { value: "", text: "Select a country" },
            { value: "us", text: "United States" },
            { value: "uk", text: "United Kingdom" },
            { value: "ca", text: "Canada" },
            { value: "au", text: "Australia" },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Multiple Select</h3>
        <FormField
          label="Skills"
          name="skills"
          multiple
          rows={5}
          options={[
            { value: "javascript", text: "JavaScript" },
            { value: "typescript", text: "TypeScript" },
            { value: "react", text: "React" },
            { value: "vue", text: "Vue" },
            { value: "angular", text: "Angular" },
          ]}
        />
      </div>
    </div>
);
