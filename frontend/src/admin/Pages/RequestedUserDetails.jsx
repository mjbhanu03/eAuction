import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RequestedUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const dummyUsers = {
      101: {
        id: 101,
        name: "Priya Verma",
        email: "priya@example.com",
        role: "User",
        status: "Pending",
        phone: "9876501234",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
      102: {
        id: 102,
        name: "Karan Patel",
        email: "karan@example.com",
        role: "User",
        status: "Pending",
        phone: "9123456789",
        avatar: "https://i.pravatar.cc/150?img=21",
      },
    };
    setUser(dummyUsers[id]);
  }, [id]);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-8"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow-md transition"
      >
        ⬅️ Back to Requested Users
      </button>

      <div className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-md"
        />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-800">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
        <span className="mt-2 px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
          {user.status}
        </span>
      </div>

      <div className="mt-10 bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-purple-700">📋 User Request Info</h2>
        <div className="space-y-3 text-gray-700">
          <p><b>Role:</b> {user.role}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition">
            ✅ Approve
          </button>
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition">
            ❌ Reject
          </button>
        </div>
      </div>
    </motion.div>
  );
}
