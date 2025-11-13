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

  // ✅ Handle submit and connect to backend
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
        // Save token in local storage
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminId", data.admin.id); // ✅ Add this line
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
      {/* Green Section */}
      <div className="w-1/3 bg-green-800 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Admin Panel Access</h2>
        <p className="mb-6 text-sm">
          Authorized personnel only. Please log in to continue.
        </p>
        <button
          onClick={() => navigate("/")}
          className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-green-800 transition"
        >
          Back to Home
        </button>
      </div>

      {/* Login Form Section */}
      <div className="w-2/3 p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-center text-green-900 mb-6">
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
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-2/4 bg-green-800 text-white py-2 rounded-full font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
