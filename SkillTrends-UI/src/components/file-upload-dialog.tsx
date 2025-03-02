"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";

export function FileUploadDialog({
  onFileUpload,
  onResumeAnalysis,
}: {
  onFileUpload?: (file: File) => void;
  onResumeAnalysis?: (analysisText: string) => void;
}) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Immediately pass the file back to update the resume list.
      if (onFileUpload) {
        onFileUpload(selectedFile);
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const extractedText = e.target?.result;
        try {
          // Send the extracted text to the POST endpoint using fetch.
          const response = await fetch("/api/analyze-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ extractedText }),
          });
          const data = await response.json();
          if (onResumeAnalysis) {
            onResumeAnalysis(String(data));
          }
        } catch (error) {
          console.error("Error analyzing resume:", error);
        }
      };
      reader.readAsText(selectedFile);
    }
    setSelectedFile(null);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setSelectedFile(null);
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <SidebarMenuButton tooltip="Upload Resume">
          <SquarePlus />
          <span>Upload Resume</span>
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Resume</DialogTitle>
          <DialogDescription>
            Please select a PDF file to upload your resume.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="mt-2 text-sm">
              <strong>Selected file:</strong> {selectedFile.name}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" disabled={!selectedFile} onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
