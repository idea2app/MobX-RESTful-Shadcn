"use client";

import { FileModel, FileUploader } from "./file-uploader";

class MyFileModel extends FileModel {}

const store = new MyFileModel();

export const FileUploaderExample = () => (
  <div className="w-full space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Single File Upload</h3>
      <FileUploader
        store={store}
        name="single-file"
        accept="image/*"
        defaultValue={[]}
      />
      <p className="text-sm text-muted-foreground mt-2">
        Upload a single image file
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Multiple Files Upload</h3>
      <FileUploader
        store={store}
        name="multiple-files"
        accept="image/*"
        multiple
        defaultValue={[]}
      />
      <p className="text-sm text-muted-foreground mt-2">
        Upload multiple image files (drag to reorder)
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
      <pre className="p-4 bg-muted rounded-md text-xs overflow-auto">
        {JSON.stringify(store.files, null, 2)}
      </pre>
    </div>
  </div>
);
