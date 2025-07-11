import React from "react";
// import { FaGoogle, FaGithub } from "react-icons/fa";

const LoginModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#1E1E1E] text-white w-[400px] rounded-xl p-6 relative">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-purple-400 text-xl font-bold">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center">
          ✨ <span className="text-white">Cryp</span>
          <span className="text-green-400">go</span>
        </h2>

        {/* Social login buttons */}
        <div className="flex gap-4 mb-4">
          <button className="flex items-center justify-center w-full bg-[#2D2D2D] text-white py-2 rounded-md hover:bg-[#3A3A3A]">
            {/* <FaGoogle className="mr-2" /> Sign In */}
          </button>
          <button className="flex items-center justify-center w-full bg-[#2D2D2D] text-white py-2 rounded-md hover:bg-[#3A3A3A]">
            {/* <FaGithub className="mr-2" /> Sign In */}
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="border-b border-gray-600 w-full" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <div className="border-b border-gray-600 w-full" />
        </div>

        {/* Email and password */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-[#2D2D2D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-[#2D2D2D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Sign in button */}
        <button className="w-full bg-green-400 text-black font-medium mt-6 py-2 rounded-md hover:bg-green-500 transition duration-200">
          Sign In
        </button>

        {/* Footer */}
        <div className="text-center text-sm mt-4 text-gray-400">
          <p className="hover:underline cursor-pointer">Forgot Password?</p>
          <p>
            Not a member yet?{" "}
            <span className="text-green-400 hover:underline cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
