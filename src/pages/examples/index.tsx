import React, { Component } from 'react';
import { CommandLine } from '@/components/CommandLine';

interface ComponentCard {
  name: string;
  component: React.ReactNode;
}

const components: ComponentCard[] = [
  {
    name: 'Button',
    component: <button className="rounded bg-primary px-4 py-2 text-white">Click me</button>,
  },
  {
    name: 'Input',
    component: <input className="rounded border px-3 py-2" placeholder="Type something" />,
  },
  // Add more components as needed
];

class ExamplesPage extends Component {
  render() {
    return (
      <div className="container mx-auto p-8 space-y-8">
        <h1 className="text-3xl font-bold">Component Examples</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map(({ name, component }) => (
            <div key={name} className="rounded-lg border bg-card p-4 shadow-sm space-y-2">
              <h2 className="text-lg font-semibold">{name}</h2>
              <CommandLine command={`npx shadcn-helper add @mobx-restful-shadcn/${name.toLowerCase()}`} />
              <div className="mt-4">{component}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ExamplesPage;
