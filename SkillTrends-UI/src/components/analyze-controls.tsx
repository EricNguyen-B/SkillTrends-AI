"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ComboboxJobTypes } from "@/components/combo-box-job-types";
import { ComboboxCities } from "@/components/combo-box-cities";

export function AnalyzeControls() {
  const [jobType, setJobType] = React.useState("");
  const [city, setCity] = React.useState("");
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const handleAnalyze = () => {
    console.log("Analyzing with:", { jobType, city, uploadedFile });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-[200px]">
        <ComboboxJobTypes onSelect={setJobType} />
      </div>

      <div className="w-[200px]">
        <ComboboxCities onSelect={setCity} />
      </div>
      <div className="text-sm text-gray-400">
        {uploadedFile ? uploadedFile.name : "No resume uploaded"}
      </div>
      <Button onClick={handleAnalyze} className="h-8 px-2 text-sm">
        Analyze
      </Button>
    </div>
  );
}
