// src/admin/Pages/AdminManagement.jsx
import { Link } from "react-router-dom";

const dummyAdmins = [
  { id: 1, name: "Ravi Sharma", role: "Manager", email: "ravi@example.com" },
  { id: 2, name: "Priya Patel", role: "Staff", email: "priya@example.com" },
  { id: 3, name: "Amit Verma", role: "Admin", email: "amit@example.com" },
];

export default function AdminManagement() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Management</h2>
      <table className="w-full border-collapse bg-white shadow rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-100 text-gray-700">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyAdmins.map((admin) => (
            <tr key={admin.id} className="hover:bg-gray-50 border-b">
              <td className="p-3">{admin.name}</td>
              <td className="p-3">
                <span className="px-2 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-600">
                  {admin.role}
                </span>
              </td>
              <td className="p-3">{admin.email}</td>
              <td className="p-3 text-center">
                <Link
                  to={`/admin-management/${admin.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        + Add New
      </button>
    </div>
  );
}
