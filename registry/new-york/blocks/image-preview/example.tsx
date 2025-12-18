"use client"

import * as React from "react"
import { ImagePreview } from "./image-preview"

export default function ImagePreviewExample() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Image Preview</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click on the image to view it in a modal with download option
        </p>
        <div className="grid grid-cols-2 gap-4">
          <ImagePreview
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
            alt="Sample image 1"
            className="border rounded-lg p-4"
          />
          <ImagePreview
            src="https://images.unsplash.com/photo-1682687221038-404670f09439?w=400&h=300&fit=crop"
            alt="Sample image 2"
            className="border rounded-lg p-4"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Loading State Example
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          The component shows a loading spinner while the image is being loaded
        </p>
        <ImagePreview
          src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=600&fit=crop"
          alt="Large image"
          className="border rounded-lg p-4 max-w-md"
        />
      </div>
    </div>
  )
}
