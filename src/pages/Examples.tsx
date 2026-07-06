import { CommandLine } from '../components/CommandLine';
import { getInstallCommand } from '../helpers/installCommand';
import { observer } from 'mobx-react';
import { Component } from 'react';

// Example component list - extend with actual components from library
const components = [
  { name: 'CommandLine', component: CommandLine },
  // Add other components here
];

@observer
export class Examples extends Component {
  render() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Component Examples</h1>
        <div className="grid gap-6">
          {components.map(({ name, component: Component }) => (
            <div key={name} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <Component />
              <div className="mt-2">
                <code className="bg-gray-100 p-1 rounded">{getInstallCommand(name)}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
