import React from "react";
import ReactECharts from "echarts-for-react";

const BarChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Resume', 'Job Description']
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: function(value: number) {
            return Math.abs(value);
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        //return the 10 most repeated words in the job description
        data: ['python', 'java', 'c++', 'C', 'C#', 'Ruby', 'Rust']
      }
    ],
    series: [
      {
        name: 'Job Description',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position:'right'
        },
        emphasis: {
          focus: 'series'
        },
        //the amount of times the words has been repeated
        data: [32, 30, 34, 37, 39, 45, 42]
      },
      {
        name: 'Resume',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'left',
          formatter: ({value}: {value:number}) => Math.abs(value) // Convert to absolute value
        },
        emphasis: {
          focus: 'series'
        },
        //
        data: [-12, -13, -10, -13, -19, -23, -21],
        tooltip: {
          valueFormatter: (value: number) => Math.abs(value)
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: "400px", width: "400px" }} />;
};

export default BarChart;