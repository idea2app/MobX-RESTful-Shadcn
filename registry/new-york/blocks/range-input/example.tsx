"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { RangeInput } from "./index";

export const RangeInputExample = () => {
  const [rating, setRating] = useState("3");
  const [volume, setVolume] = useState("50");

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Star Rating</h3>
        <RangeInput
          value={rating}
          onChange={setRating}
          min={0}
          max={5}
          step={1}
          icon={(itemValue) => (
            <Star
              className={`h-6 w-6 ${
                itemValue > 0
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          )}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Rating: {rating} / 5
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Volume Control</h3>
        <RangeInput
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          step={1}
        />
        <p className="text-sm text-muted-foreground mt-2">Volume: {volume}%</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Current Values</h3>
        <pre className="p-4 bg-muted rounded-md">
          {JSON.stringify({ rating, volume }, null, 2)}
        </pre>
      </div>
    </div>
  );
};
