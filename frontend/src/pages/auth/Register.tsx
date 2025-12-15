import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  if (isLoggedIn()) return <Navigate to="/dashboard" replace />;

  const submit = async () => {
    try {
      await api.post("/auth/register", form);
      toast.success("Registered successfully 🎉");
      navigate("/login");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-6 bg-white shadow rounded">
        <h2 className="text-xl mb-4">Register</h2>

        {["name", "email", "password"].map((f) => (
          <input
            key={f}
            placeholder={f}
            type={f === "password" ? "password" : "text"}
            className="w-full border p-2 mb-3"
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          />
        ))}

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
