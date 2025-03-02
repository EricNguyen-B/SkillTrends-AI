"use client";

import * as React from "react";
import { Activity, SquareCode } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavResumes } from "@/components/nav-resumes";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

const data = {
  user: {
    name: "Christopher Nelson",
    email: "ChrisNelson@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "SkillTrends AI",
      logo: Activity,
      plan: "Analysis",
    },
  ],
  navMain: [
    // ... navMain items if any
  ],
};

export function AppSidebar({
  resumes,
  ...props
}: { resumes: { name: string; url?: string; icon?: React.ElementType }[] } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavResumes resumes={resumes} />
      </SidebarContent>
      <SidebarFooter className="flex items-start gap-2 px-2 py-2 w-full">
        <ModeToggle />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
