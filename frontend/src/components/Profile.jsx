import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">👤 Profile Details</h2>

      {user && (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <p className="text-lg font-semibold text-gray-800 mt-2">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500 text-xs break-all">ID: {user._id}</p>
          </div>

          <div className="border-t pt-4 text-center text-gray-400 text-sm">
            Joined on: {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
