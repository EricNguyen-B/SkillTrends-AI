import { AppSidebar } from "@/components/app-sidebar"
import { sampleResumeHtml } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { title } from "process"
import { useEffect, useRef, useState, createContext, ReactNode, useContext } from "react"

interface Resume{
  title: string;
  htmlContent: string;
}
interface StateProviderProps {
  children: ReactNode;
}
interface StateContextType {
  resumes: Resume[];
  setResumes: React.Dispatch<React.SetStateAction<Resume[]>>;
  selectedResume: string;
  setSelectedResume: React.Dispatch<React.SetStateAction<string>>;
}

export const StateContext = createContext<StateContextType | undefined>(undefined);

const sampleResumes: Resume[] = [
  {
    title: "Software Engineer Resume",
    htmlContent: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>David Wu - Resume</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #333;
        }
        hr {
            border: 1px solid #ccc;
        }
        .section {
            margin-bottom: 20px;
        }
        .header {
            text-align: center;
        }
        .contact-info {
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>David Wu</h1>
        </div>
        <div class="contact-info">
            <p>📞 (267) 538-8548 | 📧 <a href="mailto:dvdwu123@gmail.com">dvdwu123@gmail.com</a></p>
            <p><a href="https://github.com/dw866">GitHub Profile</a> | <a href="https://www.linkedin.com/in/david-wu-84a8671b8/">LinkedIn Profile</a></p>
        </div>
        
        <hr>
        <div class="section">
            <h2>Education</h2>
            <p><strong>Drexel University</strong> - Bachelor of Science in Computer Science (June 2024) - GPA: 3.36</p>
        </div>
        
        <hr>
        <div class="section">
            <h2>Technical Skills and Interests</h2>
            <p><strong>Programming Languages:</strong> Java, JavaScript, TypeScript, Python, C++, C, SQL, HTML, CSS</p>
            <p><strong>Frameworks and Tools:</strong> Git, Bash, React, Node.js, Express, Spring, Selenium, Jenkins, Jira, Tricentis Tosca, Microsoft Power Platform, Netlify, Heroku, Caddy</p>
        </div>
        
        <hr>
        <div class="section">
            <h2>Experience</h2>
            <h3>SAP (Apr 2023 - Sept 2023) - Software Engineer and Testing Co-op</h3>
            <ul>
                <li>Developed in-house canvas applications for IT inventory management using Power Apps</li>
                <li>Created test modules for automated GUI testing using Tricentis Tosca</li>
                <li>Maintained active communication in Tricentis QTest for defect tracking</li>
                <li>Utilized Power BI for generating performance metrics and reports</li>
                <li>Followed Agile methodology in software development</li>
            </ul>
            
            <h3>Radian Group Inc (Apr 2022 - Sept 2022) - Software Engineer In-Test Co-op</h3>
            <ul>
                <li>Maintained and performed regression/end-to-end testing with Jenkins CI/CD pipeline</li>
                <li>Designed test plans using Java, Selenium, and TestNG</li>
                <li>Refactored test cases to improve maintainability</li>
                <li>Communicated with development teams for testing requirements</li>
                <li>Analyzed test results and reported defects using Jira</li>
            </ul>
        </div>
        
        <hr>
        <div class="section">
            <h2>Projects</h2>
            <h3>Magic Merchants (Feb 2024 - Apr 2024) - Co-Developer</h3>
            <ul>
                <li>Developed a dynamic web application for auctioning Magic the Gathering cards</li>
                <li>Built a SPA with React frontend and Node.js & Express backend using SQLite</li>
                <li>Implemented real-time bidding and chat functionality with Socket.io</li>
                <li>Managed auction lifecycle with node-schedule library</li>
                <li>Deployed on Netlify (client) and Heroku (server)</li>
            </ul>
            
            <h3>Workout Tracker (July 2024 - Present) - Developer</h3>
            <ul>
                <li>Developing a workout tracking mobile application</li>
                <li>Using React Native for frontend, Spring Boot for backend, and PostgreSQL for database</li>
                <li>Implementing JPA for relational data management</li>
                <li>Using Spring Security for user authentication</li>
                <li>Writing unit tests with JUnit and Mockito</li>
            </ul>
        </div>
    </div>
</body>
</html>

    `,
  },
  {
    title: "Data Scientist Resume",
    htmlContent: `
      <div style="color: white; background-color: black; padding: 20px;">
        <h1 style="color: white;">Jane Smith</h1>
        <p>Data Scientist</p>
        <p>Skilled in statistical analysis, machine learning, and data visualization using Python, R, and SQL.</p>
        <h2>Experience</h2>
        <ul>
          <li><strong>Company X</strong> - Data Scientist (2020 - Present)</li>
          <li><strong>Company Y</strong> - Data Analyst (2018 - 2020)</li>
        </ul>
        <h2>Education</h2>
        <p>Master of Science in Data Science, ABC University</p>
      </div>
    `,
  },
  {
    title: "UX Designer Resume",
    htmlContent: `
      <div style="color: white; background-color: black; padding: 20px;">
        <h1 style="color: white;">Emily Brown</h1>
        <p>UX Designer</p>
        <p>Passionate about creating intuitive and accessible user experiences. Skilled in wireframing, prototyping, and user research.</p>
        <h2>Experience</h2>
        <ul>
          <li><strong>Design Studio</strong> - UX Designer (2018 - Present)</li>
          <li><strong>Creative Agency</strong> - UI/UX Designer (2016 - 2018)</li>
        </ul>
        <h2>Education</h2>
        <p>Bachelor of Arts in Graphic Design, University of ABC</p>
      </div>
    `,
  },
];
const StateProvider = ({ children }:StateProviderProps) => {
  const [resumes, setResumes] = useState<Resume[]>(sampleResumes); //modify later as this is hardcoded
  const [selectedResume, setSelectedResume] = useState<string>('Initial State');

  return (
    <StateContext.Provider value={{ resumes, setResumes ,selectedResume, setSelectedResume }}>
      {children}
    </StateContext.Provider>
  );
};
export default function Page() {
  return (
    <StateProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Data Insights</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>full_stack_developer_resume.pdf</BreadcrumbPage>
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
            <ResumeDisplay></ResumeDisplay>
            {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </StateProvider>
  )
}
 
const ResumeDisplay: React.FC = () => {
  const context = useContext(StateContext);
  let htmlContent = `<div>Not Selected</div>`
  if (context?.selectedResume){
    const selectedResume = context.resumes.find((r) => r.title == context.selectedResume);
    htmlContent = selectedResume?.htmlContent || htmlContent;
  }
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    if(iframeRef.current){
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(htmlContent);
        iframeDocument.close();
      }
    }
    
  }, [context?.selectedResume])
 
  return(
    <iframe ref={iframeRef}
      title="resume"
      style={{
        width: "100%",
        height: "100%",
      }}> 
    </iframe>
  )
}
