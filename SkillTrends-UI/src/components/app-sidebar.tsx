"use client"

import * as React from "react"
import {
  SquarePlus,
  TrendingUpDown,
  BriefcaseBusiness,
  NotepadText,
  SquareCode,
  Activity
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavResumes } from "@/components/nav-resumes"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { ModeToggle } from "./mode-toggle"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
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
    {
      title: "Upload Resume",
      url: "#",
      icon: SquarePlus,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Trends",
      url: "#",
      icon: TrendingUpDown,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Feedback",
      url: "#",
      icon: NotepadText,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Matched Jobs",
      url: "#",
      icon: BriefcaseBusiness,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  resumes: [
    {
      name: "full_stack_developer",
      url: "#",
      icon: SquareCode,
    },
    {
      name: "python-data-scientist",
      url: "#",
      icon: SquareCode,
    },
    {
      name: "embedded_engineering",
      url: "#",
      icon: SquareCode,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavResumes resumes={data.resumes} />
      </SidebarContent>  
      <SidebarFooter className="flex items-start justify-start gap-2 px-2 py-2 w-full">
          <div className="flex items-start ml-2">
            <ModeToggle />
          </div>
          <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
