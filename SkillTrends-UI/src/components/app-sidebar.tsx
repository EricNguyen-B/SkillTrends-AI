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
import { ModeToggle } from "./mode-toggle"
import { StateContext } from "@/dashboard/page"

// This is sample data.
export const sampleResumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - John Doe</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        header {
            text-align: center;
            margin-bottom: 30px;
        }
        header h1 {
            margin: 0;
            font-size: 36px;
            color: #333;
        }
        header h2 {
            margin: 0;
            font-size: 18px;
            color: #777;
        }
        .section-title {
            font-size: 24px;
            color: #333;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .section-content {
            margin-bottom: 20px;
        }
        .contact-info,
        .education,
        .work-experience,
        .skills {
            margin-bottom: 20px;
        }
        .contact-info p,
        .education p,
        .work-experience p,
        .skills p {
            font-size: 16px;
            color: #555;
        }
        .skills ul {
            list-style-type: none;
            padding-left: 0;
        }
        .skills ul li {
            background-color: #3498db;
            color: #fff;
            padding: 5px;
            margin: 5px 0;
            border-radius: 3px;
        }
        footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>

    <div class="container">
        <header>
            <h1>John Doe</h1>
            <h2>Software Developer</h2>
        </header>

        <!-- Contact Information -->
        <section class="contact-info">
            <div class="section-title">Contact Information</div>
            <div class="section-content">
                <p><strong>Email:</strong> john.doe@example.com</p>
                <p><strong>Phone:</strong> (123) 456-7890</p>
                <p><strong>Website:</strong> www.johndoe.com</p>
                <p><strong>LinkedIn:</strong> linkedin.com/in/johndoe</p>
            </div>
        </section>

        <!-- Education -->
        <section class="education">
            <div class="section-title">Education</div>
            <div class="section-content">
                <p><strong>Bachelor of Science in Computer Science</strong> – University of Example (2015 - 2019)</p>
                <p><em>Graduated with Honors</em></p>
            </div>
        </section>

        <!-- Work Experience -->
        <section class="work-experience">
            <div class="section-title">Work Experience</div>
            <div class="section-content">
                <p><strong>Software Engineer</strong> – ABC Tech Solutions (2021 - Present)</p>
                <ul>
                    <li>Developed and maintained web applications using JavaScript and React.js</li>
                    <li>Collaborated with cross-functional teams to design scalable solutions</li>
                    <li>Implemented RESTful APIs and optimized database queries</li>
                </ul>

                <p><strong>Junior Developer</strong> – XYZ Innovations (2019 - 2021)</p>
                <ul>
                    <li>Assisted in the development of mobile applications for iOS and Android</li>
                    <li>Built and deployed microservices using Node.js and Express</li>
                    <li>Worked closely with the QA team to perform unit testing and bug fixes</li>
                </ul>
            </div>
        </section>

        <!-- Skills -->
        <section class="skills">
            <div class="section-title">Skills</div>
            <div class="section-content">
                <ul>
                    <li>JavaScript (ES6+)</li>
                    <li>React.js</li>
                    <li>Node.js</li>
                    <li>HTML/CSS</li>
                    <li>Git & GitHub</li>
                    <li>SQL & NoSQL databases</li>
                    <li>Agile Methodologies</li>
                </ul>
            </div>
        </section>

        <!-- Footer -->
        <footer>
            <p>Available for work | Looking forward to new opportunities</p>
        </footer>
    </div>

</body>
</html>
`

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


