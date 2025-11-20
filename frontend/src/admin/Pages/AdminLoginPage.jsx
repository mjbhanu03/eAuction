import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminId", data.admin.id);
        localStorage.setItem("adminRole", data.admin.role);
        localStorage.setItem("adminName", data.admin.name);

        alert("✅ Login successful!");
        navigate("/admin/dashboard");
      } else {
        alert(`❌ ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      
      {/* Left Gradient Section (updated colors) */}
      <div className="w-1/3 bg-gradient-to-b from-[#007b8f] to-[#00c4d6] text-white flex flex-col items-center justify-center p-6 text-center shadow-xl">

        <h2 className="text-3xl font-bold mb-4">New Here?</h2>
        <p className="mb-8 text-lg">Create your account and join us today!</p>

        <button
          onClick={() => navigate("/signup")}
          className="border border-white px-8 py-2 rounded-full text-lg hover:bg-white hover:text-[#008ca3] transition"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-6 underline text-white hover:text-gray-200"
        >
          Back To Home...
        </button>
      </div>

      {/* Login Form Section */}
      <div className="w-2/3 p-10 flex flex-col justify-center">
        <h2 className="text-4xl font-semibold text-center text-[#007b8f] mb-10">
          Admin Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 w-full flex flex-col items-center"
        >
          <input
            type="email"
            placeholder="Admin Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none text-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none text-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-2/4 bg-[#008ca3] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#007b8f] transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
