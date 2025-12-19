import { ComponentCard } from "@/components/example/component-card";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import PokemonPage from "@/registry/new-york/blocks/complex-component/page";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import { BadgeBarExample } from "@/registry/new-york/blocks/badge-bar/example";
import { PagerExample } from "@/registry/new-york/blocks/pager/example";
import { ImagePreviewExample } from "@/registry/new-york/blocks/image-preview/example";
import { FilePreviewExample } from "@/registry/new-york/blocks/file-preview/example";
import { ScrollBoundaryExample } from "@/registry/new-york/blocks/scroll-boundary/example";
import { ScrollListExample } from "@/registry/new-york/blocks/scroll-list/example";
import { ArrayFieldExample } from "@/registry/new-york/blocks/array-field/example";
import { BadgeInputExample } from "@/registry/new-york/blocks/badge-input/example";
import { RangeInputExample } from "@/registry/new-york/blocks/range-input/example";
import { FilePickerExample } from "@/registry/new-york/blocks/file-picker/example";
import { FormFieldExample } from "@/registry/new-york/blocks/form-field/example";
import { RestTableExample } from "@/registry/new-york/blocks/rest-table/example";
import EditorExample from "@/registry/new-york/blocks/editor/example";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <ComponentCard
          name="hello-world"
          description="A simple hello world component"
        >
          <HelloWorld />
        </ComponentCard>

        <ComponentCard
          name="example-form"
          description="A contact form with Zod validation."
          minHeight="min-h-[500px]"
        >
          <ExampleForm />
        </ComponentCard>

        <ComponentCard
          name="complex-component"
          description="A complex component showing hooks, libs and components."
        >
          <PokemonPage />
        </ComponentCard>

        <ComponentCard
          name="example-with-css"
          description="A login form with a CSS file."
        >
          <ExampleCard />
        </ComponentCard>

        <ComponentCard
          name="badge-bar"
          description="A component for displaying a list of badges with optional click and delete handlers."
        >
          <BadgeBarExample />
        </ComponentCard>

        <ComponentCard
          name="pager"
          description="A pagination component with page size and page index controls."
        >
          <PagerExample />
        </ComponentCard>

        <ComponentCard
          name="image-preview"
          description="An image preview component with modal viewing and download functionality."
        >
          <ImagePreviewExample />
        </ComponentCard>

        <ComponentCard
          name="file-preview"
          description="A file preview component supporting images, audio, video, and documents."
        >
          <FilePreviewExample />
        </ComponentCard>

        <ComponentCard
          name="scroll-boundary"
          description="A component that detects when scroll reaches edges using IntersectionObserver."
        >
          <ScrollBoundaryExample />
        </ComponentCard>

        <ComponentCard
          name="scroll-list"
          description="An infinite scroll list component using MobX for state management."
        >
          <ScrollListExample />
        </ComponentCard>

        <ComponentCard
          name="array-field"
          description="A dynamic array field component with add/remove functionality for form arrays."
        >
          <ArrayFieldExample />
        </ComponentCard>

        <ComponentCard
          name="badge-input"
          description="An input component that displays values as removable badges, supporting multiple entries."
        >
          <BadgeInputExample />
        </ComponentCard>

        <ComponentCard
          name="range-input"
          description="A range slider input with optional custom icon display for each step."
        >
          <RangeInputExample />
        </ComponentCard>

        <ComponentCard
          name="file-picker"
          description="A file picker component with preview and remove functionality."
        >
          <FilePickerExample />
        </ComponentCard>

        <ComponentCard
          name="form-field"
          description="A unified form field component supporting input, textarea, and select elements with labels."
        >
          <FormFieldExample />
        </ComponentCard>

        <ComponentCard
          name="rest-table"
          description="A comprehensive pagination table component for CRUD operations with MobX RESTful integration."
          minHeight="min-h-[600px]"
        >
          <RestTableExample />
        </ComponentCard>

        <ComponentCard
          name="editor"
          description="A lightweight rich text editor based on Edkit and Shadcn UI with various formatting tools."
          minHeight="min-h-[400px]"
        >
          <EditorExample />
        </ComponentCard>
      </main>
    </div>
  );
}
