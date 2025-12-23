# MobX RESTful Shadcn

A **Pagination Table** & **Scroll List** component suite for [CRUD operation][1], which is based on [MobX RESTful][2], [React][3] & [Shadcn UI][4].

[![MobX compatibility](https://img.shields.io/badge/Compatible-1?logo=mobx&label=MobX%206%2F7)][5]
[![NPM Dependency](https://img.shields.io/librariesio/github/idea2app/MobX-RESTful-Shadcn.svg)][6]
[![CI & CD](https://github.com/idea2app/MobX-RESTful-Shadcn/actions/workflows/main.yml/badge.svg)][7]

## Components

1. [Spinner](https://mobx-restful-shadcn.idea2.app/r/spinner.json)
2. [Loading](https://mobx-restful-shadcn.idea2.app/r/loading.json)
3. [Badge Bar](https://mobx-restful-shadcn.idea2.app/r/badge-bar.json)
4. [Badge Input](https://mobx-restful-shadcn.idea2.app/r/badge-input.json)
5. [Image Preview](https://mobx-restful-shadcn.idea2.app/r/image-preview.json)
6. [File Preview](https://mobx-restful-shadcn.idea2.app/r/file-preview.json)
7. [File Picker](https://mobx-restful-shadcn.idea2.app/r/file-picker.json)
8. [File Uploader](https://mobx-restful-shadcn.idea2.app/r/file-uploader.json)
9. [Form Field](https://mobx-restful-shadcn.idea2.app/r/form-field.json)
10. [Range Input](https://mobx-restful-shadcn.idea2.app/r/range-input.json)
11. [Array Field](https://mobx-restful-shadcn.idea2.app/r/array-field.json)
12. [REST Form](https://mobx-restful-shadcn.idea2.app/r/rest-form.json)
13. [REST Form Modal](https://mobx-restful-shadcn.idea2.app/r/rest-form-modal.json)
14. [Pager](https://mobx-restful-shadcn.idea2.app/r/pager.json)
15. [REST Table](https://mobx-restful-shadcn.idea2.app/r/rest-table.json)
16. [Scroll Boundary](https://mobx-restful-shadcn.idea2.app/r/scroll-boundary.json)
17. [Scroll List](https://mobx-restful-shadcn.idea2.app/r/scroll-list.json)
18. [Searchable Input](https://mobx-restful-shadcn.idea2.app/r/searchable-input.json)
19. [Editor](https://mobx-restful-shadcn.idea2.app/r/editor.json)

## Installation

### `components.json`

```json
{
  "registries": {
    "@mobx-restful-shadcn": "https://mobx-restful-shadcn.idea2.app/r/{name}.json"
  }
}
```

### Adding components

```shell
npx shadcn-helper add @mobx-restful-shadcn/rest-table
```

Replace `rest-table` with any component name from the list above.

## Initialization

### Internationalization

Set up i18n translation model for UI text:

```typescript
import { TranslationModel } from "mobx-i18n";
import { IDType } from "mobx-restful";

export const i18n = new TranslationModel({
  en_US: {
    load_more: "Load more",
    no_more: "No more",
    create: "Create",
    view: "View",
    submit: "Submit",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    total_x_rows: ({ totalCount }: { totalCount: number }) =>
      `Total ${totalCount} rows`,
    sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
      `Are you sure to delete ${keys.join(", ")}?`,
  },
});
```

### Data Source

Set up HTTP client and implement Model class:

```typescript
import { githubClient, RepositoryModel } from "mobx-github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

githubClient.use(({ request }, next) => {
  if (GITHUB_TOKEN)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    };
  return next();
});

export const repositoryStore = new RepositoryModel("idea2app");
```

## Usage

### Pagination Table

```tsx
import { computed } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";

import { BadgeBar } from "@/components/ui/badge-bar";
import { RestTable, Column } from "@/components/ui/rest-table";
import repositoryStore, { Repository } from "@/models/Repository";
import { i18n } from "@/models/Translation";

@observer
export class RepositoryTable extends Component {
  @computed
  get columns() {
    return [
      {
        key: "full_name",
        renderHead: "Repository Name",
        renderBody: ({ html_url, full_name }) => (
          <a target="_blank" href={html_url}>
            {full_name}
          </a>
        ),
        required: true,
        minLength: 3,
        invalidMessage: "Input 3 characters at least",
      },
      { key: "homepage", type: "url", renderHead: "Home Page" },
      { key: "language", renderHead: "Programming Language" },
      {
        key: "topics",
        renderHead: "Topic",
        renderBody: ({ topics }) => (
          <BadgeBar
            list={(topics || []).map((text) => ({
              text,
              link: `https://github.com/topics/${text}`,
            }))}
          />
        ),
      },
      { key: "stargazers_count", type: "number", renderHead: "Star Count" },
      { key: "description", renderHead: "Description", contentEditable: true },
    ];
  }

  render() {
    return (
      <RestTable
        editable
        deletable
        columns={this.columns}
        store={repositoryStore}
        translator={i18n}
        onCheck={console.log}
      />
    );
  }
}
```

### Scroll List

```tsx
import { observer } from "mobx-react";

import { ScrollList } from "@/components/ui/scroll-list";
import repositoryStore from "@/models/Repository";
import { i18n } from "@/models/Translation";

export const ScrollListExample = () => (
  <ScrollList
    translator={i18n}
    store={repositoryStore}
    renderList={(allItems) => (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allItems.map(({ id, name, description }) => (
          <li key={id} className="p-4 border rounded">
            <h3>{name}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    )}
  />
);
```

### File Uploader

```tsx
import { FileModel, FileUploader } from "@/components/ui/file-uploader";

class MyFileModel extends FileModel {}

const store = new MyFileModel();

export const EditorPage = () => (
  <FileUploader
    store={store}
    accept="image/*"
    name="images"
    multiple
    required
    onChange={console.log}
  />
);
```

### Editor

```tsx
import { configure } from "mobx";
import { formToJSON } from "web-utility";

import { Editor, OriginalTools, ExtraTools } from "@/components/ui/editor";

configure({ enforceActions: "never" });

export const EditorPage = () => (
  <form
    onSubmit={(event) => {
      event.preventDefault();

      const { content } = formToJSON(event.currentTarget);

      alert(content);
    }}
  >
    <Editor
      tools={[...OriginalTools, ...ExtraTools]}
      name="content"
      defaultValue="Hello <b>Edkit</b>!"
      onChange={console.log}
    />
    <button type="submit">Submit</button>
  </form>
);
```

## Development

This is a custom component registry built with Next.js and compatible with the `shadcn` CLI.

### Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Run development server: `pnpm dev`
4. Build registry: `pnpm registry:build`
5. Build project: `pnpm build`

### Registry Structure

- The `registry.json` file defines all components and their files
- Components are located in `registry/new-york/blocks/`
- Each component has its implementation and example files
- The `shadcn build` command generates registry items in `public/r/`

## Documentation

- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
- [Component Registry Documentation](https://ui.shadcn.com/docs/registry)
- [MobX RESTful Documentation][2]

[1]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[2]: https://github.com/idea2app/MobX-RESTful
[3]: https://reactjs.org/
[4]: https://ui.shadcn.com/
[5]: https://mobx.js.org/
[6]: https://libraries.io/npm/mobx-restful-shadcn
[7]: https://github.com/idea2app/MobX-RESTful-Shadcn/actions/workflows/main.yml
