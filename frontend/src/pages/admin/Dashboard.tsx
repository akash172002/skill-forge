import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const uploadProject = async () => {
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      await api.post("/projects", formData);
      toast.success("Project uploaded successfully 🚀");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Submit Project</h1>

      <input
        className="border p-2 mb-3 w-full"
        placeholder="Project title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        className="mb-3"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={uploadProject}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
