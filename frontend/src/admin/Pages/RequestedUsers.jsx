import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RequestedUsers = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [users] = useState([
    {
      id: 101,
      name: "Priya Verma",
      email: "priya@example.com",
      role: "User",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 102,
      name: "Karan Patel",
      email: "karan@example.com",
      role: "User",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=21",
    },
  ]);

  const requestedUsers = users.filter(
    (u) =>
      u.status === "Pending" &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div
      className="px-0 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-extrabold mb-6 text-purple-800 flex items-center gap-2">
        🕒 Requested Users
        <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
          {requestedUsers.length}
        </span>
      </h1>

      {/* Search */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="🔍 Search requested users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-700 shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Requested User Cards */}
      {requestedUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requestedUsers.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.05 }}
              className="p-5 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center gap-4 cursor-pointer"
              onClick={() => navigate(`/admin/requested-users/${user.id}`)}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border-2 border-purple-400 shadow-md"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm mt-1">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    {user.status}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          😕 No requested users found
        </p>
      )}
    </motion.div>
  );
};

export default RequestedUsers;
