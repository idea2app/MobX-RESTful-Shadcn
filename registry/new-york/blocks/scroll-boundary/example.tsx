"use client";

import { useState } from "react";

import { ScrollBoundary, EdgePosition } from "./index";

export const ScrollBoundaryExample = () => {
  const [touchedEdges, setTouchedEdges] = useState<EdgePosition[]>([]);

  const handleTouch = (edge: EdgePosition) =>
    setTouchedEdges((prev) => (prev.includes(edge) ? prev : [...prev, edge]));

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Scroll Boundary</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Scroll to the edges to detect touch events. Touched edges:{" "}
          {touchedEdges.length > 0 ? touchedEdges.join(", ") : "None"}
        </p>
        <div className="border rounded-lg overflow-auto h-96">
          <ScrollBoundary
            onTouch={handleTouch}
            top={
              <div className="text-xs text-muted-foreground text-center p-2">
                Top Edge
              </div>
            }
            bottom={
              <div className="text-xs text-muted-foreground text-center p-2">
                Bottom Edge
              </div>
            }
            left={
              <div className="text-xs text-muted-foreground text-center p-2">
                Left
              </div>
            }
            right={
              <div className="text-xs text-muted-foreground text-center p-2">
                Right
              </div>
            }
          >
            <div className="w-[150%] h-[600px] p-8">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-lg p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-2">Scrollable Content</h4>
                  <p className="text-muted-foreground">
                    Scroll in any direction to trigger edge detection
                  </p>
                </div>
              </div>
            </div>
          </ScrollBoundary>
        </div>
      </div>
    </div>
  );
};
