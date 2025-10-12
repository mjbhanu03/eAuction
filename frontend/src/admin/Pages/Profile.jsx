import React, { useState } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    role: "Admin",
    avatar: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Profile Updated Successfully!");
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">👤 Update Profile</h1>

      {/* Card */}
      <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-2xl border p-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={form.avatar || "https://i.pravatar.cc/150?img=24"}
            alt="avatar"
            className="w-20 h-20 rounded-full border object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{form.name}</p>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="p-3 border rounded-xl bg-gray-100"
            disabled
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
