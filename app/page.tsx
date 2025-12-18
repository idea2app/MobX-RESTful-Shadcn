import { ReactNode } from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
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
import { SearchableInputExample } from "@/registry/new-york/blocks/searchable-input/example";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

const ComponentCard = ({
  name,
  description,
  children,
  minHeight = "min-h-[400px]",
}: {
  name: string;
  description: string;
  children: ReactNode;
  minHeight?: string;
}) => (
  <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
    <div className="flex items-center justify-between">
      <h2 className="text-sm text-muted-foreground sm:pl-3">{description}</h2>
      <OpenInV0Button name={name} className="w-fit" />
    </div>
    <div className={`flex items-center justify-center ${minHeight} relative`}>
      {children}
    </div>
  </div>
);

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
          name="searchable-input"
          description="A searchable select input with badge display, supporting single or multiple selection."
        >
          <SearchableInputExample />
        </ComponentCard>
      </main>
    </div>
  );
}
