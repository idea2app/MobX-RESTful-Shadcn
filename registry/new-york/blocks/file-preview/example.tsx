import { FilePreview } from "./index";

export const FilePreviewExample = () => (
  <div className="w-full space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Image File</h3>
      <FilePreview
        type="image/jpeg"
        path="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=200&fit=crop"
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Audio File</h3>
      <FilePreview
        type="audio/mpeg"
        path="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Video File</h3>
      <FilePreview
        type="video/mp4"
        path="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Document Files</h3>
      <div className="grid grid-cols-4 gap-4">
        <FilePreview
          type="application/pdf"
          path="https://example.com/document.pdf"
        />
        <FilePreview
          type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          path="https://example.com/document.docx"
        />
        <FilePreview
          type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          path="https://example.com/spreadsheet.xlsx"
        />
        <FilePreview
          type="application/zip"
          path="https://example.com/archive.zip"
        />
      </div>
    </div>
  </div>
);
