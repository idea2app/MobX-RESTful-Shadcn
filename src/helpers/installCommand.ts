const packageName = '@mobx-restful-shadcn';

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

export function getInstallCommand(componentName: string): string {
  const kebabName = toKebabCase(componentName);
  return `npx shadcn-helper add ${packageName}/${kebabName}`;
}
