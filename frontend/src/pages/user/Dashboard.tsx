import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageSkeleton from "../../components/PageSkeleton";
import { toast } from "react-toastify";
import ProjectsChart from "../../components/ProjectsChart";
import type { Project } from "../../types/project";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api
      .get("/projects/my")
      .then((res) => setProjects(res.data))
      .catch(() => toast.error("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageSkeleton />;

  const totalProjects = projects.length;
  const totalCertificates = projects.filter((p) => p.certificateUrl).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Project */}
        <Link
          to="/upload"
          className="group border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white"
        >
          <h2 className="font-semibold text-lg group-hover:text-blue-600">
            Upload Project
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Submit a new project for review
          </p>
        </Link>

        {/* My Projects */}
        <Link
          to="/my-projects"
          className="group border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white"
        >
          <h2 className="font-semibold text-lg group-hover:text-blue-600">
            My Projects
          </h2>
          <div className="mt-4 text-3xl font-bold text-blue-600">
            {totalProjects}
          </div>
          <p className="text-sm text-gray-500 mt-1">Total submitted projects</p>
        </Link>

        {/* Certificates */}
        <Link
          to="/certificates"
          className="group border rounded-xl p-6 shadow-sm hover:shadow-lg transition bg-white"
        >
          <h2 className="font-semibold text-lg group-hover:text-green-600">
            Certificates Earned
          </h2>
          <div className="mt-4 text-3xl font-bold text-green-600">
            {totalCertificates}
          </div>
          <p className="text-sm text-gray-500 mt-1">Approved projects</p>
        </Link>
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <ProjectsChart projects={projects} />
      </div>
    </div>
  );
}
