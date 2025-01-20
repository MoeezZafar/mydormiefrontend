import Navbar from "./ui/navbar";
import Footer from "./ui/Footer";
import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useUser } from "./contexts/UserAuth";
import { FaCity, FaMapMarkerAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, updateUserProfile } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
  );
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const initialData = {
        username: user.username || "",
        email: user.email || "",
        city: user.city || "",
        address: user.address || "",
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError("");

    const updates = {};
    for (const key in formData) {
      if (formData[key] !== originalData[key]) {
        updates[key] = formData[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      setError("No changes made.");
      setUpdateLoading(false);
      return;
    }

    try {
      if (!user?._id) {
        throw new Error("User ID not found");
      }

      const response = await fetch("https://mydormiebackend.abdurrehmanshafique.online/api/profileupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          ...updates,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();

      // Update the user context with the new data
      updateUserProfile({
        ...user,
        ...data.profile,
      });

      // Update the local state
      setOriginalData({ ...originalData, ...updates });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message || "Failed to update profile.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#fdf9e4] flex items-center justify-center p-4 pt-24 pb-12">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full">
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#65702f] md:w-48 md:h-48 shadow-lg"
            />
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold text-[#65702f] mb-3">
                {formData.username}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MdEmail className="text-xl text-[#65702f]" />
                <span className="text-lg">{formData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FaCity className="text-xl text-[#65702f]" />
                <span className="text-lg">{formData.city || "Not provided"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-xl text-[#65702f]" />
                <span className="text-lg">{formData.address || "Not provided"}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-lg text-white bg-[#65702f] text-base font-semibold hover:bg-[#4a5222] transition-colors shadow-md"
            aria-label="Edit Profile"
          >
            <FiEdit className="text-lg" />
            Edit Profile
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors text-xl font-bold"
                aria-label="Close Modal"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-[#65702f] mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="text-red-500 text-sm mb-4">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#65702f] focus:border-transparent text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#65702f] focus:border-transparent text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#65702f] focus:border-transparent text-sm transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-full py-2.5 rounded-lg text-white bg-[#65702f] text-base font-semibold hover:bg-[#4a5222] transition-colors mt-6 disabled:bg-gray-400 shadow-md"
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;

