import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

const ChartRenderer = ({ chart, width = 700, height = 400 }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (chart.type === "bar") {
    return (
      <BarChart width={width} height={height} data={chart.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chart.x} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={chart.y} fill="#f59e0b" />
      </BarChart>
    );
  } else if (chart.type === "line") {
    return (
      <LineChart width={width} height={height} data={chart.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chart.x} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={chart.y}
          stroke="#f59e0b"
          strokeWidth={2}
        />
      </LineChart>
    );
  } else if (chart.type === "pie") {
    return (
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            data={chart.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            nameKey={chart.x}
            dataKey={chart.y}
          >
            {chart.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return null;
};

export default ChartRenderer;
