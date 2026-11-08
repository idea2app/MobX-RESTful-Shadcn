"use client";

import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";

import { FilePreview, FilePreviewProps } from "../file-preview";
import { FilePicker } from "./index";

@observer
export class FilePickerExample extends Component {
  @observable accessor imageFile: string | File = "";
  @observable accessor documentFile: string | File = "";
  @observable accessor viewingFile: Pick<FilePreviewProps, "path" | "file"> =
    {};

  setImageFile = action((file: string | File) => {
    this.imageFile = file;
  });

  setDocumentFile = action((file: string | File) => {
    this.documentFile = file;
  });

  setViewingFile = action((file: Pick<FilePreviewProps, "path" | "file">) => {
    this.viewingFile = file;
  });

  render() {
    const { imageFile, documentFile, viewingFile } = this;

    return (
      <div className="w-full space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4">Image Picker</h3>
          <FilePicker
            value={imageFile}
            onChange={this.setImageFile}
            accept="image/*"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Click to upload an image
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">Document Picker</h3>
          <FilePicker
            value={documentFile}
            onChange={this.setDocumentFile}
            accept=".pdf,.doc,.docx"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Click to upload a document
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">Preview Callback</h3>
          <FilePicker
            accept="image/*"
            value={imageFile}
            onChange={this.setImageFile}
            onView={this.setViewingFile}
          />
          {viewingFile.path && (
            <div className="mt-4 max-w-xs rounded-md border p-2">
              <FilePreview
                type={(viewingFile.file as File)?.type || "image/*"}
                path={viewingFile.path}
                file={viewingFile.file}
              />
            </div>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">Selected Files</h3>
          <div className="space-y-2">
            <div>
              <strong>Image:</strong>
              <pre className="p-4 bg-muted rounded-md mt-2 text-xs overflow-auto">
                {imageFile instanceof File
                  ? `File: ${imageFile.name} (${imageFile.size} bytes)`
                  : imageFile || "No file selected"}
              </pre>
            </div>
            <div>
              <strong>Document:</strong>
              <pre className="p-4 bg-muted rounded-md mt-2 text-xs overflow-auto">
                {documentFile instanceof File
                  ? `File: ${documentFile.name} (${documentFile.size} bytes)`
                  : documentFile || "No file selected"}
              </pre>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
