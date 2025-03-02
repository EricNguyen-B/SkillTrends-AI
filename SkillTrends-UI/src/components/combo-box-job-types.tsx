"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// List of job types (expand as needed)
const jobTypes = [
  { value: "software-engineer", label: "Software Engineer" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "product-manager", label: "Product Manager" },
  { value: "ux-designer", label: "UX Designer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "system-administrator", label: "System Administrator" },
  { value: "business-analyst", label: "Business Analyst" },
];

export function ComboboxJobTypes() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] h-8 justify-between"
        >
          {value
            ? jobTypes.find((job) => job.value === value)?.label
            : "Select job type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search job type..." className="h-8" />
          <CommandList>
            <CommandEmpty>No job type found.</CommandEmpty>
            <CommandGroup>
              {jobTypes.map((job) => (
                <CommandItem
                  key={job.value}
                  value={job.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {job.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === job.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
