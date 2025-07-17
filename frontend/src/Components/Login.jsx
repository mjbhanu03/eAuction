// LoginPage.jsx
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF3ED] font-sans">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg flex overflow-hidden">
        {/* Login Form */}
        <div className="w-2/3 p-10">
          <h2 className="text-2xl font-semibold text-[#963100] mb-6">
            Log In to Your Account
          </h2>
          <form className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-[#963100] text-white py-2 rounded-full font-semibold"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right Side: Sign Up */}
        <div className="w-1/3 bg-[#963100] text-white flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">New Here?</h2>
          <p className="mb-6 text-sm">
            Sign up and discover a great amount of new opportunities!
          </p>
          <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#963100] transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
