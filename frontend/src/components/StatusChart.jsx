import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#38B2AC", "#F6AD55", "#E53E3E"]; // teal, orange, red

export default function StatusChart({ issues }) {
  // Count issues by status
  const statusCounts = ["open", "in_progress", "closed"].map((status) => ({
    name: status.replace("_", " ").toUpperCase(),
    value: issues.filter((issue) => issue.status === status).length,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={statusCounts}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {statusCounts.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
