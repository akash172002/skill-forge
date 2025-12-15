import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageSkeleton from "../../components/PageSkeleton";
import { toast } from "react-toastify";
import type { Project } from "../../types/project";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api
      .get("/admin/projects")
      .then((res) => setProjects(res.data))
      .catch(() => toast.error("Failed to load admin stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageSkeleton />;

  const total = projects.length;
  const pending = projects.filter((p) => p.status === "PENDING").length;
  const approved = projects.filter((p) => p.status === "APPROVED").length;
  const rejected = projects.filter((p) => p.status === "REJECTED").length;
  const certificates = projects.filter((p) => p.certificateUrl).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: "Total Projects", value: total },
        { label: "Pending", value: pending },
        { label: "Approved", value: approved },
        { label: "Rejected", value: rejected },
        { label: "Certificates", value: certificates },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
        >
          <p className="text-gray-500">{item.label}</p>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
        </div>
      ))}

      <Link
        to="/admin/projects"
        className="bg-blue-600 text-white p-6 rounded-xl shadow flex items-center justify-center text-lg"
      >
        View All Projects →
      </Link>
    </div>
  );
}
