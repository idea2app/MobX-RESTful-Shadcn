# MobX RESTful Shadcn

A **Pagination Table** & **Scroll List** component suite for [CRUD operation][1], which is based on [MobX RESTful][2], [React][3] & [Shadcn UI][4].

[![MobX compatibility](https://img.shields.io/badge/Compatible-1?logo=mobx&label=MobX%206%2F7)][5]

## Components

1. [Badge Bar](https://mobx-restful-shadcn.vercel.app/)
2. [Badge Input](https://mobx-restful-shadcn.vercel.app/)
3. [Image Preview](https://mobx-restful-shadcn.vercel.app/)
4. [File Preview](https://mobx-restful-shadcn.vercel.app/)
5. [File Picker](https://mobx-restful-shadcn.vercel.app/)
6. [File Uploader](https://mobx-restful-shadcn.vercel.app/)
7. [Form Field](https://mobx-restful-shadcn.vercel.app/)
8. [Range Input](https://mobx-restful-shadcn.vercel.app/)
9. [Array Field](https://mobx-restful-shadcn.vercel.app/)
10. [REST Form](https://mobx-restful-shadcn.vercel.app/)
11. [REST Form Modal](https://mobx-restful-shadcn.vercel.app/)
12. [Pager](https://mobx-restful-shadcn.vercel.app/)
13. [REST Table](https://mobx-restful-shadcn.vercel.app/)
14. [Scroll Boundary](https://mobx-restful-shadcn.vercel.app/)
15. [Scroll List](https://mobx-restful-shadcn.vercel.app/)
16. [Searchable Input](https://mobx-restful-shadcn.vercel.app/)

## Installation

You can use the `shadcn` CLI to install components from this registry to your project.

### Prerequisites

```shell
npm i react \
  mobx \
  mobx-react \
  mobx-i18n \
  mobx-restful
```

### Install Components

```shell
npx shadcn@latest add https://mobx-restful-shadcn.vercel.app/r/rest-table.json
```

Replace `rest-table` with any component name from the list above.

## Configuration

### Internationalization

Set up i18n translation model for UI text:

```typescript
import { TranslationModel } from "mobx-i18n";

export const i18n = new TranslationModel({
  en_US: {
    submit: "Submit",
    cancel: "Cancel",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    total_x_rows: "Total {{totalCount}} rows",
    sure_to_delete_x: "Are you sure to delete {{keys}}?",
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
import { BadgeBar } from "@/components/ui/badge-bar";
import { RestTable, Column } from "@/components/ui/rest-table";
import repositoryStore, { Repository } from "@/models/Repository";
import { i18n } from "@/models/Translation";

export default observer(() => {
  const columns = computed<Column<Repository>[]>(() => [
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
    {
      key: "description",
      renderHead: "Description",
      rows: 3,
    },
  ]).get();

  return (
    <RestTable
      editable
      deletable
      columns={columns}
      store={repositoryStore}
      translator={i18n}
      onCheck={console.log}
    />
  );
});
```

### Scroll List

```tsx
import { observer } from "mobx-react";
import { ScrollList } from "@/components/ui/scroll-list";
import repositoryStore from "@/models/Repository";
import { i18n } from "@/models/Translation";

export default observer(() => (
  <ScrollList
    translator={i18n}
    store={repositoryStore}
    renderList={(allItems) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allItems.map((item) => (
          <div key={item.id} className="p-4 border rounded">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    )}
  />
));
```

### File Uploader

```tsx
import { FileUploader } from "@/components/ui/file-uploader";
import fileStore from "@/models/File";

export const EditorPage = () => (
  <FileUploader
    store={fileStore}
    accept="image/*"
    name="images"
    multiple
    required
    onChange={console.log}
  />
);
```

## Development

This is a custom component registry built with Next.js and compatible with the `shadcn` CLI.

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build registry: `npm run registry:build`
5. Build project: `npm run build`

### Registry Structure

- The `registry.json` file defines all components and their files
- Components are located in `registry/new-york/blocks/`
- Each component has its implementation and example files
- The `shadcn build` command generates registry items in `public/r/`

## Documentation

- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
- [MobX RESTful Documentation](https://github.com/idea2app/MobX-RESTful)
- [Component Registry Documentation](https://ui.shadcn.com/docs/registry)

[1]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[2]: https://github.com/idea2app/MobX-RESTful
[3]: https://reactjs.org/
[4]: https://ui.shadcn.com/
[5]: https://mobx.js.org/
