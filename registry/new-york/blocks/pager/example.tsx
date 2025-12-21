"use client";

import { useState } from "react";

import { PageMeta, Pager } from "./index";

export const PagerExample = () => {
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const pageCount = 20;

  const handleChange = ({ pageSize, pageIndex }: PageMeta) => {
    setPageSize(pageSize);
    setPageIndex(pageIndex);
  };

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Pager Component</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Current: Page {pageIndex} of {pageCount}, showing {pageSize} items per
          page
        </p>
        <Pager
          pageSize={pageSize}
          pageIndex={pageIndex}
          pageCount={pageCount}
          onChange={handleChange}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pager at First Page</h3>
        <Pager
          pageSize={10}
          pageIndex={1}
          pageCount={15}
          onChange={(meta) => console.log(meta)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pager at Last Page</h3>
        <Pager
          pageSize={10}
          pageIndex={15}
          pageCount={15}
          onChange={(meta) => console.log(meta)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pager in Middle</h3>
        <Pager
          pageSize={10}
          pageIndex={8}
          pageCount={15}
          onChange={(meta) => console.log(meta)}
        />
      </div>
    </div>
  );
};
