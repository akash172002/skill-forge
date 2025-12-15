import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import type { Project } from "../../types/project";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.get("/admin/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>

      <div className="space-y-4">
        {projects.map((p) => (
          <Link
            key={p.id}
            to={`/admin/projects/${p.id}`}
            className="block bg-white dark:bg-gray-900 p-4 rounded shadow hover:shadow-lg"
          >
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-500">Status: {p.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
