import React from 'react';
import CommandLine from '../../components/CommandLine';

// Assuming there are other components like Button, Input, etc.
const components = [
  { name: 'Button', Component: () => <button>Click me</button> },
  { name: 'Input', Component: () => <input placeholder='Type here' /> },
  { name: 'CommandLine', Component: () => <CommandLine /> },
];

export default function ExamplesPage() {
  return (
    <div className="examples-page">
      <h1>Component Examples</h1>
      <div className="component-cards">
        {components.map(({ name, Component }) => (
          <div key={name} className="component-card">
            <div className="component-preview">
              <Component />
            </div>
            <div className="component-install">
              <code>npx shadcn-helper add @mobx-restful-shadcn/{name}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
