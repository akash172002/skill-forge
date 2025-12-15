import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageSkeleton from "../../components/PageSkeleton";

export default function Certificates() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api.get("/projects/my").then((res) => {
      setProjects(res.data.filter((p: any) => p.certificateUrl));
      setLoading(false);
    });
  }, []);

  if (loading) return <PageSkeleton />;

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Certificates</h2>

      {projects.map((p) => (
        <div
          key={p.id}
          className="border p-4 mb-3 rounded flex justify-between"
        >
          <span>{p.title}</span>
          <a href={p.certificateUrl} target="_blank" className="text-blue-600">
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
