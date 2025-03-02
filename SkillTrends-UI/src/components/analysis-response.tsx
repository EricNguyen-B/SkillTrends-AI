"use client";

import * as React from "react";
import { TypewriterText } from "./type-writer-text";

export function AnalysisResponse({ text }: { text: string }) {
  return (
    <div className="mt-4 p-4 border rounded-md shadow-sm transition-all duration-500 ease-in-out bg-white dark:bg-gray-800">
      <TypewriterText text={text} speed={50} />
    </div>
  );
}
