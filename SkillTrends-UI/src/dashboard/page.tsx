"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ComboboxCities } from "@/components/combo-box-cities";
import { ComboboxJobTypes } from "@/components/combo-box-job-types";
import { Button } from "@/components/ui/button";
import { FileUploadDialog } from "@/components/file-upload-dialog";
import { AnalysisResponse } from "@/components/analysis-response";
import { SquareCode } from "lucide-react";

export default function Page() {
  const [jobType, setJobType] = React.useState("");
  const [city, setCity] = React.useState("");
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [resumes, setResumes] = React.useState<
    { name: string; url?: string; icon?: React.ElementType }[]
  >([]);
  const [resumeAnalysis, setResumeAnalysis] = React.useState("");
  const [analysisResult, setAnalysisResult] = React.useState("");

  const handleJobTypeSelect = (value: string) => {
    setJobType(value);
  };

  const handleCitySelect = (value: string) => {
    setCity(value);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const newResume = { name: file.name, url: "#", icon: SquareCode };
    // Append the new resume to the dynamic list.
    setResumes((prev) => [...prev, newResume]);
  };

  const handleResumeAnalysis = (analysisText: string) => {
    setResumeAnalysis(analysisText);
  };

  const handleAnalyze = async () => {
    try {
      const prompt = `Based on my resume analysis: ${resumeAnalysis}. My preferences: I am looking for a ${jobType} role in ${city}. Please provide a concise analysis of my fit for this role, including job market statistics and any experience gaps or skill shortages.`;
      const response = await fetch(
        `/api/analyze-job?jobType=${encodeURIComponent(jobType)}&location=${encodeURIComponent(city)}`,
        { method: "GET" }
      );
      const data = await response.json();
      setAnalysisResult(String(data));
      console.log("Job Analysis:", data);
    } catch (error) {
      console.error("Error during job analysis", error);
    }
    console.log("Analyzing with:", { jobType, city, uploadedFile, resumeAnalysis });
  };

  return (
    <SidebarProvider>
      <AppSidebar resumes={resumes} />
      <SidebarInset>
        <header className="flex flex-col gap-2 px-2">
          <div className="flex h-16 items-center gap-2 transition-[width,height] ease-linear">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList className="flex items-center gap-2">
                {resumes.length > 0 && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{resumes[resumes.length - 1].name}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
                <BreadcrumbItem>
                  <ComboboxJobTypes onSelect={handleJobTypeSelect} />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <ComboboxCities onSelect={handleCitySelect} />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FileUploadDialog
                    onFileUpload={handleFileUpload}
                    onResumeAnalysis={handleResumeAnalysis}
                  />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Button variant="outline" size="sm" onClick={handleAnalyze}>
                    Analyze
                  </Button>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-2 p-2 pt-0">
          <div className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
            <div className="flex flex-col gap-4">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
          {analysisResult && <AnalysisResponse text={analysisResult} />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
