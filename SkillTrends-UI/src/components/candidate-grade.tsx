import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

interface CandidateGradeProps {
  matchPercentage: number; // Expected to be between 0 and 1
}

const CandidateGrade: React.FC<CandidateGradeProps> = ({ matchPercentage }) => {
  const [gaugeValue, setGaugeValue] = useState(matchPercentage * 100);

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false, // Hides the pointer (arrow)
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646',
          },
        },
        axisLine: {
          lineStyle: {
            width: 40,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: [
          {
            value: gaugeValue,
            name: 'Match Percentage',
            title: {
              offsetCenter: ['0%', '-30%'],
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '-10%'], // Adjusted value to move the percentage lower
              formatter: '{value}%',
            },
          },
        ],
        title: {
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setGaugeValue(matchPercentage * 100); // Update the gauge value whenever matchPercentage changes
  }, [matchPercentage]);

  return <ReactECharts option={option} style={{ height: "400px", width: "400px" }} />;
};

export default CandidateGrade;

