"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ComboboxJobTypes } from "@/components/combo-box-job-types";
import { ComboboxCities } from "@/components/combo-box-cities";

// Note: We assume your combobox components accept an `onSelect` prop.
// If they don't, you can modify them to call a callback when the value changes.
export function AnalyzeControls() {
  const [jobType, setJobType] = React.useState("");
  const [city, setCity] = React.useState("");
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const handleAnalyze = () => {
    console.log("Analyzing with:", { jobType, city, uploadedFile });
    // Hook up your API call or further processing here.
  };

  return (
    <div className="flex items-center gap-2">
      {/* Job type combobox */}
      <div className="w-[200px]">
        <ComboboxJobTypes onSelect={setJobType} />
      </div>

      <div className="w-[200px]">
        <ComboboxCities onSelect={setCity} />
      </div>
      {/* Optional: display resume filename or a placeholder */}
      <div className="text-sm text-gray-400">
        {uploadedFile ? uploadedFile.name : "No resume uploaded"}
      </div>
      {/* Analyze button */}
      <Button onClick={handleAnalyze} className="h-8 px-2 text-sm">
        Analyze
      </Button>
    </div>
  );
}
