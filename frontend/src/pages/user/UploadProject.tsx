import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function UploadProject() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const upload = async () => {
    if (!file) return toast.error("Select a file");

    const form = new FormData();
    form.append("title", title);
    form.append("file", file);

    try {
      setLoading(true);
      await api.post("/projects/submit", form);
      toast.success("Project uploaded 🚀");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Uploading...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl mb-4">Upload Project</h2>

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
        onClick={upload}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
