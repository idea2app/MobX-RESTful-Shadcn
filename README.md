# MobX RESTful Shadcn

A **Pagination Table** & **Scroll List** component suite for [CRUD operation][1], which is based on [MobX RESTful][2] & [React][3].

You can use the `shadcn` CLI to run your own component registry. Running your own
component registry allows you to distribute your custom components, hooks, pages, and
other files to any React project.

> [!IMPORTANT]  
> This template uses Tailwind v4. For Tailwind v3, see [registry-template-v3](https://github.com/shadcn-ui/registry-template-v3).

## Getting Started

This is a template for creating a custom registry using Next.js.

- The template uses a `registry.json` file to define components and their files.
- The `shadcn build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- The template also includes a route handler for serving registry items.
- Every registry item are compatible with the `shadcn` CLI.
- We have also added v0 integration using the `Open in v0` api.

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view the full documentation.

[1]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[2]: https://github.com/idea2app/MobX-RESTful
[3]: https://reactjs.org/
