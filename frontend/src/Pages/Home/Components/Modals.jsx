import { X } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import axios from 'axios';
import toast from 'react-hot-toast';
import { setDataIntoLocalStorage } from "../../../utils/localStorage";

const Modals = ({ setProfileModal }) => {
    const { user, setUser } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullname: user?.fullname || "",
        username: user?.username || "",
        gender: user?.gender || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true);

        // validation
        if (!formData.fullname || !formData.username || !formData.gender) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }
        // same data : validation
        if (
            formData.fullname === user?.fullname &&
            formData.username === user?.username &&
            formData.gender === user?.gender
        ) {
            toast.error("No changes detected");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.put("/api/user/update", formData);
            if (data.success) {
                toast.success("Profile updated successfully");
                setLoading(false);
                setUser(data.data);
                setDataIntoLocalStorage(data.data);
                setActiveTab("profile");
            }
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] overflow-auto">
            <div
                className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.8)]"
                onClick={() => setProfileModal(false)}
            ></div>

            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative z-10">
                {/* Modal Header */}
                <div className="flex items-center pb-3 border-b border-gray-300">
                    <h3 className="text-slate-900 text-xl font-semibold flex-1">
                        {activeTab === "profile" ? "Profile Info" : "Edit Profile"}
                    </h3>
                    <X
                        onClick={() => setProfileModal(false)}
                        className="w-5 h-5 cursor-pointer text-gray-400 hover:text-red-500"
                    />
                </div>

                {/* Tabs */}
                <div className="flex mt-4 border-b border-gray-300">
                    <button
                        className={`flex-1 py-2 text-sm font-medium ${activeTab === "profile"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
                    <button
                        className={`flex-1 py-2 text-sm font-medium ${activeTab === "edit"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("edit")}
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <div className="my-6 text-center">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {user?.profileImage ? (
                                <img src={user?.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-500">No Image</span>
                            )}
                        </div>
                        <h3 className="text-lg font-medium mt-3">{user?.fullname}</h3>
                        <p className="text-sm text-gray-500">@{user?.username}</p>
                        <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                        <p className="text-sm text-gray-500 mt-1">Gender: {user?.gender || "Not specified"}</p>
                    </div>
                )}

                {/* Edit Profile Tab */}
                {activeTab === "edit" && (
                    <div className="my-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Footer */}
                <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
                    <button
                        onClick={() => setProfileModal(false)}
                        className="px-4 py-2 rounded-lg text-slate-900 text-sm font-medium bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                    >
                        Close
                    </button>
                    {activeTab === "edit" && (
                        <button
                            disabled={loading}
                            onClick={handleUpdate}
                            className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                        >
                            Update
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modals;
