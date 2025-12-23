"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Loading } from "./index";

export function LoadingExample() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center p-8">
      <Button onClick={() => setIsLoading(!isLoading)}>
        {isLoading ? "Hide Loading" : "Show Loading"}
      </Button>

      <p className="text-sm text-muted-foreground">
        Click the button to toggle the full-screen loading overlay
      </p>

      {isLoading && <Loading>Please wait...</Loading>}
    </div>
  );
}
