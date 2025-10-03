import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
    city_id: "",
    document_type: null, // for file upload
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const cities = [
    { id: "1", name: "New York" },
    { id: "2", name: "Los Angeles" },
    { id: "3", name: "Chicago" },
    // Add more cities as needed
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "doc") {
      setFormData((prev) => ({
        ...prev,
        doc: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const clearDoc = () => {
    setFormData((prev) => ({
      ...prev,
      document_type: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple confirm password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Using FormData to handle file upload
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }

      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      alert(result.message);
      console.log(result);
      if (result.message !== "User already exist") navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Form */}
      <div className="w-2/3 p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold olive-dark mb-6 flex flex-col items-center">
          Create a New Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 w-full flex flex-col items-center"
        >
          <div className="w-2/4 flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              className="w-1/2 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
              name="surname"
              className="w-1/2 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
              required
            />
          </div>

          <input
            type="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            name="number"
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
            required
          />
          <div className="w-2/4 flex space-x-4">
          {/* Password with show/hide */}
          <div className="relative w-2/4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              className="w-full px-4 py-3 rounded-full bg-gray-200 focus:outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password with show/hide */}
          <div className="relative w-2/4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              className="w-full px-4 py-3 rounded-full bg-gray-200 focus:outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              tabIndex={-1}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          </div>
          <div className="w-2/4 flex space-x-4">

          <select
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          {/* File upload with cancel */}
          <div className="w-2/4 flex items-center space-x-4">
            <input
              type="file"
              name="document_type"
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-full bg-gray-200 hover:cursor-pointer"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            {formData.document_type && (
              <button
                type="button"
                onClick={clearDoc}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
          </div>
          <button
            type="submit"
            className="w-2/4 navbar text-white py-2 rounded-full font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Green section */}
      <div className="w-1/3 navbar text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="mb-6 text-sm">
          Already have an account? Log in to continue your journey!
        </p>
        <button
          onClick={onSwitch}
          className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#475e3a] transition"
        >
          Log In
        </button>
        <div className="py-5">
          <a href="/">Back To Home...</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
