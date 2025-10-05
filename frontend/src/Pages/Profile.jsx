import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

export const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);  // Track edit mode
  const [editedUser, setEditedUser] = useState({ ...user });  // Store edits

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleSave = () => {
    // Save logic here (API call, update state)
    // After saving, switch back to display mode
    console.log("Updated User:", editedUser);
    setIsEditing(false);
  };

  // Handle cancel editing
  const handleCancel = () => {
    // Reset the editedUser state to the original user data
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="p-3 olive-dark">
        <a href="/">Back</a>
      </div>
      <div className="flex h-screen items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Photo */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
              <img
                src={
                  user.document_type
                    ? `http://localhost:5000/photos/profile/${user.document_type}`
                    : "/default-avatar.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Name (First + Surname) */}
            <div className="w-full text-left">
              {isEditing ? (
                <div className="flex space-x-2">
                  <label className="text-gray-700 font-semibold">Full Name</label> 
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name || ""}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 px-2 py-1 w-1/2"
                  />
                  <input
                    type="text"
                    name="surname"
                    value={editedUser.surname || ""}
                    onChange={handleChange}
                    placeholder="Surname"
                    className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 px-2 py-1 w-1/2"
                  />
                </div>
              ) : (
                <h1 className="flex justify-center text-2xl  font-semibold text-gray-800">
                  {user.name} {user.surname}
                </h1>
              )}
            </div>

            {/* Email */}
            <div className="w-full text-left">
              <label className="text-gray-700 font-semibold">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedUser.email || ""}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-600"
                />
              ) : (
                <div className="border-b-2 border-gray-300 text-gray-600">{user.email}</div>
              )}
            </div>

            {/* Phone Number */}
            <div className="w-full text-left">
              <label className="text-gray-700 font-semibold">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="number"
                  value={editedUser.number || ""}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <div className="border-b-2 border-gray-300 ">{user.number}</div>
              )}
            </div>

            {/* City */}
            <div className="w-full text-left">
              <label className="text-gray-700 font-semibold">City</label>
              {isEditing ? (
                <input
                  type="text"
                  name="city_id"
                  value={user.city_id[0].city_name || ""}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <div className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500">{user.city_id[0].city_name}</div>
              )}

            </div>

            <div className="w-full text-left">
              <label className="text-gray-700 font-semibold">State</label>
                <div className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500">{user.city_id[0].state_name}</div>
            </ div>

            <div className="w-full text-left">
              <label className="text-gray-700 font-semibold">Country</label>
                <div className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500">{user.city_id[0].country_name}</div>
            </div>
            <div className="w-full text-left">
              <label className="text-gray-700 font-semibold">Sub Region</label>
                  <div className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500">{user.city_id[0].subregion_name}</div>
            </div>
            <div className="w-full text-left">
              <label className="text-gray-700 font-semibold">Region</label>
                    <div className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500">{user.city_id[0].region_name}</div>
            </div>

            {/* Account Status */}
            {user.status && (
              <div className="w-full mt-6">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <span className="font-medium">Account Status</span>
                  </div>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {user.status}
                  </span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 rounded-full navbar text-white font-medium shadow hover:text-white transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-full bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-full navbar text-white font-medium shadow hover:text-white transition hover:cursor-pointer"
                >
                  Edit Profile
                </button>
              )}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
