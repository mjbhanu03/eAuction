import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);

  // Dummy users (replace with backend API later)
  useEffect(() => {
    const dummyUsers = {
      1: {
        id: 1,
        name: "Amit Sharma",
        email: "amit@example.com",
        role: "User",
        status: "Active",
        phone: "9876543210",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      2: {
        id: 2,
        name: "Rahul Mehta",
        email: "rahul@example.com",
        role: "Admin",
        status: "Active",
        phone: "9123456789",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
      3: {
        id: 3,
        name: "Sneha Desai",
        email: "sneha@example.com",
        role: "Manager",
        status: "Blocked",
        phone: "9988776655",
        avatar: "https://i.pravatar.cc/150?img=14",
      },
    };
    setUser(dummyUsers[id]);
  }, [id]);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  const handleSave = () => {
    setEditing(false);
    alert("✅ User details updated successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-8"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // goes back to previous page
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow-md transition"
      >
        ⬅️ Back to Users
      </button>

      {/* Profile Card */}
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 flex flex-col items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-800">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
        <span
          className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold ${
            user.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* Details / Edit Section */}
      <div className="mt-10 bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-6">
        {!editing ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-blue-700">📋 User Information</h2>
            <div className="space-y-3 text-gray-700">
              <p><b>Role:</b> {user.role}</p>
              <p><b>Phone:</b> {user.phone}</p>
              <p><b>Email:</b> {user.email}</p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition"
            >
              ✏️ Edit Details
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-blue-700">✏️ Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              >
                <option>User</option>
                <option>Admin</option>
                <option>Manager</option>
              </select>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition"
                >
                  💾 Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}
