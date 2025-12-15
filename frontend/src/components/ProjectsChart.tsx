import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Project } from "../types/project";

export default function ProjectsChart({ projects }: { projects: Project[] }) {
  const data = Object.values(
    projects.reduce((acc: any, project) => {
      const month = new Date(project.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      acc[month] = acc[month] || { month, count: 0 };
      acc[month].count += 1;

      return acc;
    }, {})
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Projects Over Time</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
