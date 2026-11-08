"use client";

import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";

import { PageMeta, Pager } from "./index";

@observer
export class PagerExample extends Component {
  @observable accessor pageSize = 10;
  @observable accessor pageIndex = 1;
  pageCount = 20;

  handleChange = action(({ pageSize, pageIndex }: PageMeta) => {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  });

  render() {
    const { pageSize, pageIndex, pageCount } = this;

    return (
      <div className="w-full space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Pager Component</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Current: Page {pageIndex} of {pageCount}, showing {pageSize} items
            per page
          </p>
          <Pager
            pageSize={pageSize}
            pageIndex={pageIndex}
            pageCount={pageCount}
            onChange={this.handleChange}
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
  }
}
