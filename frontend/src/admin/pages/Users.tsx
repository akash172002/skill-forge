import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {users.map((u) => (
        <div
          key={u.id}
          className="bg-white dark:bg-gray-900 p-4 rounded shadow mb-3 flex justify-between"
        >
          <div>
            <p>{u.name}</p>
            <p className="text-sm text-gray-500">{u.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
