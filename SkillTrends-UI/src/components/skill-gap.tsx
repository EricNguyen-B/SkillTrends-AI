import React from "react";
import ReactECharts from "echarts-for-react";

const SkillGap: React.FC = () => {
  // Job description vs. resume skills
  const jobSkills: string[] = ["Python", "Flask", "SQL", "Docker", "AWS", "Kubernetes", "CI/CD", "Microservices"];
  const resumeSkills: string[] = ["Python", "SQL", "Django", "AWS", "REST APIs", "Git"];

  // Compute skill categories
  const matchingSkills = jobSkills.filter(skill => resumeSkills.includes(skill)).length;
  const missingSkills = jobSkills.filter(skill => !resumeSkills.includes(skill)).length;
  const extraSkills = resumeSkills.filter(skill => !jobSkills.includes(skill)).length;

  const option = {
    title: { text: "Skill Gap Analysis", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["Matching Skills", "Missing Skills", "Extra Skills"],
      axisLabel: { fontSize: 14 }
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Skill Count",
        type: "bar",
        data: [matchingSkills, missingSkills, extraSkills],
        itemStyle: {
          color: (params: any) => ["#4CAF50", "#F44336", "#2196F3"][params.dataIndex] // Green, Red, Blue
        },
        label: {
          show: true,
          position: "top",
          fontSize: 14
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: "400px", width: "500px" }} />;
};

export default SkillGap;