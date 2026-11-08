"use client";

import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";

import { Button } from "@/components/ui/button";
import { Loading } from "./index";

@observer
export class LoadingExample extends Component {
  @observable accessor isLoading = false;

  toggleLoading = action(() => {
    this.isLoading = !this.isLoading;
  });

  render() {
    const { isLoading } = this;

    return (
      <div className="flex flex-col gap-4 items-center p-8">
        <Button onClick={this.toggleLoading}>
          {isLoading ? "Hide Loading" : "Show Loading"}
        </Button>

        <p className="text-sm text-muted-foreground">
          Click the button to toggle the full-screen loading overlay
        </p>

        {isLoading && <Loading>Please wait...</Loading>}
      </div>
    );
  }
}
