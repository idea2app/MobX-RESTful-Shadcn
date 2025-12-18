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
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A simple hello world component
            </h2>
            <OpenInV0Button name="hello-world" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <HelloWorld />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A contact form with Zod validation.
            </h2>
            <OpenInV0Button name="example-form" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[500px] relative">
            <ExampleForm />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A complex component showing hooks, libs and components.
            </h2>
            <OpenInV0Button name="complex-component" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <PokemonPage />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A login form with a CSS file.
            </h2>
            <OpenInV0Button name="example-with-css" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <ExampleCard />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A component for displaying a list of badges with optional click
              and delete handlers.
            </h2>
            <OpenInV0Button name="badge-bar" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <BadgeBarExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A pagination component with page size and page index controls.
            </h2>
            <OpenInV0Button name="pager" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <PagerExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              An image preview component with modal viewing and download
              functionality.
            </h2>
            <OpenInV0Button name="image-preview" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <ImagePreviewExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A file preview component supporting images, audio, video, and
              documents.
            </h2>
            <OpenInV0Button name="file-preview" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <FilePreviewExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A component that detects when scroll reaches edges using
              IntersectionObserver.
            </h2>
            <OpenInV0Button name="scroll-boundary" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <ScrollBoundaryExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              An infinite scroll list component using MobX for state management.
            </h2>
            <OpenInV0Button name="scroll-list" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <ScrollListExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A dynamic array field component with add/remove functionality for
              form arrays.
            </h2>
            <OpenInV0Button name="array-field" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <ArrayFieldExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              An input component that displays values as removable badges,
              supporting multiple entries.
            </h2>
            <OpenInV0Button name="badge-input" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <BadgeInputExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A range slider input with optional custom icon display for each
              step.
            </h2>
            <OpenInV0Button name="range-input" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <RangeInputExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A file picker component with preview and remove functionality.
            </h2>
            <OpenInV0Button name="file-picker" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <FilePickerExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A unified form field component supporting input, textarea, and
              select elements with labels.
            </h2>
            <OpenInV0Button name="form-field" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <FormFieldExample />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A searchable select input with badge display, supporting single or
              multiple selection.
            </h2>
            <OpenInV0Button name="searchable-input" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <SearchableInputExample />
          </div>
        </div>
      </main>
    </div>
  );
}
