import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  score: number;
}

export const RiskGauge: React.FC<Props> = ({ score }) => {
  // Risk score is 0-100 where 100 is Critical Risk.
  // We want to visualize this on a gauge.
  
  const data = [
    { name: 'Risk', value: score },
    { name: 'Safe', value: 100 - score },
  ];

  // Determine color based on risk levels defined in prompt
  // 0-19 Low (Green), 20-39 Med (Yellow), 40-69 High (Orange), 70-100 Critical (Red)
  let color = '#ef4444'; // Red default
  if (score < 20) color = '#10b981'; // Emerald
  else if (score < 40) color = '#eab308'; // Yellow
  else if (score < 70) color = '#f97316'; // Orange

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={120}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 text-center mb-6">
        <div className="text-5xl font-extrabold text-slate-900">{score}</div>
        <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-1">Risk Score</div>
      </div>
    </div>
  );
};
