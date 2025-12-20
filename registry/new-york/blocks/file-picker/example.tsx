"use client";

import { useState } from "react";

import { FilePicker } from "./index";

export const FilePickerExample = () => {
  const [imageFile, setImageFile] = useState<string | File>("");
  const [documentFile, setDocumentFile] = useState<string | File>("");

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Image Picker</h3>
        <FilePicker
          value={imageFile}
          onChange={setImageFile}
          accept="image/*"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Click to upload an image
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Document Picker</h3>
        <FilePicker
          value={documentFile}
          onChange={setDocumentFile}
          accept=".pdf,.doc,.docx"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Click to upload a document
        </p>
      </div>

      <div>
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
      </div>
    </div>
  );
};
