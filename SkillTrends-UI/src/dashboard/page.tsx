import { AppSidebar } from "@/components/app-sidebar"
import CandidateGradeDialog from "@/components/candidate-grade-dialog"
import SkillGapDialog from "@/components/skill-gap-dialog"
import BarChart from "@/components/graph"
import GraphDialog from "@/components/graph-dialog"
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



export default function Page() {
  return (
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

              <div className="aspect-video rounded-xl bg-muted/50"> 
                <GraphDialog />
              </div>

              <div className="aspect-video rounded-xl bg-muted/50" > 
                <CandidateGradeDialog />
              </div>

              <div className="aspect-video rounded-xl bg-muted/50" > 
                <SkillGapDialog />
              </div>

            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </div>
      {/* <BarChart/> */}
      </SidebarInset>
    </SidebarProvider>
  )
}
