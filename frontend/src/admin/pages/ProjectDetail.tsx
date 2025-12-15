import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/admin/projects/${id}`).then((res) => setProject(res.data));
  }, [id]);

  if (!project) return null;

  const locked = project.status === "APPROVED";

  const submitReview = async () => {
    try {
      setLoading(true);
      await api.patch(`/admin/projects/${id}/review`, {
        score: project.score,
        feedback: project.feedback,
        status: project.status,
      });
      toast.success("Project updated");
      setLoading(false);
    } catch {
      toast.error("Approved project cannot be modified");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">{project.title}</h1>

      <input
        disabled={locked}
        type="number"
        value={project.score || ""}
        onChange={(e) =>
          setProject({ ...project, score: Number(e.target.value) })
        }
        className="w-full mb-3 p-2 border rounded"
        placeholder="Score"
      />

      <textarea
        disabled={locked}
        value={project.feedback || ""}
        onChange={(e) => setProject({ ...project, feedback: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
        placeholder="Feedback"
      />

      <select
        disabled={locked}
        value={project.status}
        onChange={(e) => setProject({ ...project, status: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      {locked && (
        <p className="text-red-500 mb-3">
          Approved projects are locked and cannot be changed.
        </p>
      )}

      <button
        onClick={submitReview}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Save Review"}
      </button>
    </div>
  );
}
