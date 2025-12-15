import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Certificates() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/admin/projects")
      .then((res) =>
        setProjects(res.data.filter((p: any) => p.certificateUrl))
      );
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Certificates</h1>

      {projects.map((p) => (
        <div
          key={p.id}
          className="bg-white dark:bg-gray-900 p-4 rounded shadow mb-3"
        >
          <p>
            <strong>Project:</strong> {p.title}
          </p>
          <p>
            <strong>User:</strong> {p.user.name}
          </p>

          <a
            href={p.certificateUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            Download Certificate
          </a>
        </div>
      ))}
    </div>
  );
}
