import { useContext } from "react";
// import { User, Mail } from "lucide-react"; // nice icons
import { AuthContext } from "../../Context/AuthContext";

export  const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen">
      <div className="p-3 olive-dark">
      <a href="/">Back</a>
      </div>
    <div className="flex h-screen items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar circle */}
          <div className="w-24 h-24 rounded-full navbar flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>

          {/* Email */}
          <div className="flex items-center space-x-2 text-gray-600">
            {/* <Mail className="w-5 h-5" /> */}
            <span>{user.email}</span>
          </div>

          {/* Extra details */}
          <div className="w-full mt-6">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2 text-gray-700">
                {/* <User className="w-5 h-5" /> */}
                <span className="font-medium">Account Type</span>
              </div>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                User
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="px-6 py-2 rounded-full navbar text-white font-medium shadow hover:text-white transition">
              Edit Profile
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};


