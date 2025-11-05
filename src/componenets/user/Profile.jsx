"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  LogOut,
  Edit3,
  Save,
  Settings,
  Lock,
  Mail,
  ShieldAlert,
  Trash2,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Profile = () => {
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("info");

  // Collapsible states
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  // Form states
  const [settingsData, setSettingsData] = useState({});
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [emailData, setEmailData] = useState({
    newEmail: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch profile
  useEffect(() => {
    if (!token) return;
    axios
      .get("https://velora-website-backend.vercel.app/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data.user || res.data);
        setSettingsData(res.data.user || res.data);
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch profile")
      );
  }, [token]);

  const handleSettingsChange = (e) =>
    setSettingsData({ ...settingsData, [e.target.name]: e.target.value });

  // Update profile
  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        "https://velora-website-backend.vercel.app/api/auth/profile",
        settingsData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data.user || res.data);
      setMessage("✅ Profile updated successfully!");
      setShowEdit(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Change Password
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("❌ New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        "https://velora-website-backend.vercel.app/api/auth/change-password",
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Password updated successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setShowPassword(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  // Change Email
  const handleEmailChange = async () => {
    setLoading(true);
    try {
      await axios.put(
        "https://velora-website-backend.vercel.app/api/auth/change-email",
        { newEmail: emailData.newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Email updated successfully!");
      setEmailData({ newEmail: "", password: "" });
      setShowEmail(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to change email");
    } finally {
      setLoading(false);
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete your account?"))
      return;
    try {
      await axios.delete("https://velora-website-backend.vercel.app/api/auth/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
      alert("✅ Account deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account");
    }
  };

  // Logout
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
    }, 1200);
  };

  if (!token)
    return (
      <div className="flex justify-center py-20">
        <div className="text-center bg-white p-10 rounded-lg shadow-md">
          <User size={40} className="mx-auto mb-3 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-700">
            Please log in to view your account.
          </h2>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center py-20">
        <div className="text-center bg-white p-10 rounded-lg shadow-md">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );

  if (!profile)
    return (
      <div className="flex justify-center py-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading profile...</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl font-semibold text-center mb-10 tracking-wide text-gray-800">
        MY ACCOUNT
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="border border-gray-200 rounded-md shadow-sm">
          <button
            onClick={() => setActiveTab("info")}
            className={`w-full text-left px-5 py-3 font-medium border-b border-gray-200 flex items-center gap-2 ${
              activeTab === "info"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            <User size={18} /> INFORMATION
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-5 py-3 font-medium border-b border-gray-200 flex items-center gap-2 ${
              activeTab === "settings"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            <Settings size={18} /> SETTINGS
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-3 font-medium flex items-center gap-2 text-red-600 hover:bg-red-50"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogOut size={18} />
            )}
            {isLoggingOut ? "Logging out..." : "LOGOUT"}
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 border border-gray-200 rounded-md shadow-sm p-6">
          {activeTab === "info" && (
            <>
              <h2 className="text-xl font-semibold mb-6 tracking-wide text-gray-800 border-b pb-3">
                ACCOUNT INFORMATION
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Username", name: "username" },
                  { label: "Email", name: "email" },
                  { label: "Phone", name: "phone" },
                  { label: "Country", name: "country" },
                  { label: "City", name: "city" },
                  { label: "Address", name: "address" },
                  { label: "Postal code", name: "postalcode" },
                ].map((field) => (
                  <div key={field.name}>
                    <p className="uppercase text-sm text-gray-500 mb-1">
                      {field.label}
                    </p>
                    <p className="text-gray-800 font-medium">
                      {profile[field.name] || "Not provided"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <div className="space-y-8 text-gray-700">
              <h2 className="text-xl font-semibold tracking-wide border-b pb-3">
                SETTINGS
              </h2>

              {message && (
                <div className="bg-gray-100 text-gray-800 p-3 rounded-md">
                  {message}
                </div>
              )}

              {/* Collapsible Edit Profile */}
              <div>
                <button
                  onClick={() => setShowEdit(!showEdit)}
                  className="w-full flex justify-between items-center font-semibold mb-3"
                >
                  <span className="flex items-center gap-2">
                    <Edit3 size={18} /> Update Profile
                  </span>
                  {showEdit ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showEdit && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "username",
                        "phone",
                        "country",
                        "city",
                        "address",
                        "postalcode",
                      ].map((name) => (
                        <input
                          key={name}
                          type="text"
                          name={name}
                          placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                          value={settingsData[name] || ""}
                          onChange={handleSettingsChange}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleProfileUpdate}
                      className="mt-2 bg-black text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Collapsible Password */}
              <div>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-full flex justify-between items-center font-semibold mb-3"
                >
                  <span className="flex items-center gap-2">
                    <Lock size={18} /> Change Password
                  </span>
                  {showPassword ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showPassword && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="password"
                        placeholder="Old Password"
                        value={passwordData.oldPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            oldPassword: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 sm:col-span-2"
                      />
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      className="mt-2 bg-black text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Updating...
                        </>
                      ) : (
                        <>
                          <Save size={18} /> Update Password
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Collapsible Email */}
              <div>
                <button
                  onClick={() => setShowEmail(!showEmail)}
                  className="w-full flex justify-between items-center font-semibold mb-3"
                >
                  <span className="flex items-center gap-2">
                    <Mail size={18} /> Change Email
                  </span>
                  {showEmail ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showEmail && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="New Email"
                        value={emailData.newEmail}
                        onChange={(e) =>
                          setEmailData({
                            ...emailData,
                            newEmail: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                      <input
                        type="password"
                        placeholder="Current Password"
                        value={emailData.password}
                        onChange={(e) =>
                          setEmailData({
                            ...emailData,
                            password: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <button
                      onClick={handleEmailChange}
                      className="mt-2 bg-black text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Updating...
                        </>
                      ) : (
                        <>
                          <Save size={18} /> Update Email
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Delete Account */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold flex items-center gap-2 mb-3 text-red-600">
                  <Trash2 size={18} /> Delete Account
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  This action is irreversible. All your data will be deleted.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-red-700"
                >
                  <ShieldAlert size={18} /> Delete My Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
