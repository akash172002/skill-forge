import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import ProjectListSkeleton from "../../components/ProjectListSkeleton";
import StatusBadge from "../../components/StatusBadge";

interface Project {
  id: string;
  title: string;
  status: string;
  score?: number;
  feedback?: string;
  certificateUrl?: string;
  createdAt: string;
}

export default function MyProjects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api
      .get("/projects/my")
      .then((res) => setProjects(res.data))
      .catch(() => toast.error("Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ProjectListSkeleton />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>

      {projects.length === 0 && (
        <p className="text-gray-500">No projects submitted yet.</p>
      )}

      <div className="space-y-5">
        {projects.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <StatusBadge status={p.status} />
            </div>
            {/* Meta */}
            <div className="mt-3 text-sm text-gray-600">
              Submitted on {new Date(p.createdAt).toLocaleDateString()}
            </div>
            {/* Score */}
            {p.status !== "REJECTED" && p.score !== undefined && (
              <div className="mt-3">
                <span className="text-sm font-medium">Score:</span>{" "}
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {p.score ? p.score : "Score is not given yet"}
                </span>
              </div>
            )}

            {p.status === "REJECTED" && (
              <div className="mt-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {"Your project got rejected ☹️"}
                </span>
              </div>
            )}
            {/* Feedback */}
            {p.feedback && (
              <div className="mt-3 bg-gray-50 p-3 rounded text-sm">
                <strong>Feedback:</strong>
                <p className="mt-1">{p.feedback}</p>
              </div>
            )}
            {/* Certificate */}
            <div className="mt-4">
              {p.certificateUrl ? (
                <a
                  href={p.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Download Certificate
                </a>
              ) : (
                <span className="text-gray-400 text-sm">
                  Certificate not generated yet
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
