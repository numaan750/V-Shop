"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { setUserId, removeFromCart, logoutUser } from "@/redux/cartslice";
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
  ShoppingBag,
  X,
  Package,
  Eye,
  XCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("info");
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
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

  const [checkoutOrders, setCheckoutOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const dispatch = useDispatch();

  // Redux cart items
  const cartState = useSelector((state) => state.cart);
  const orders = cartState.items || [];

  // ✅ Dynamic backend URL - works in both development and production
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "https://velora-website-backend.vercel.app/api";

  // Fetch profile
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const authToken = token || storedToken;

    if (!authToken) {
      console.warn("⚠️ No token found — user not logged in.");
      return;
    }

const fetchProfile = async () => {
  try {
    const storedToken = localStorage.getItem("token");
    const authToken = token || storedToken;

    if (!authToken) return;

    const res = await axios.get(
      "https://velora-website-backend.vercel.app/api/auth/profile",
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );

    const user = res.data.user || res.data;
    setProfile(user);
    setSettingsData(user);

    if (user?._id) dispatch(setUserId(user._id));
  } catch (err) {
    console.error("❌ Profile fetch error:", err.response?.data || err.message);

    if (err.response?.status === 400) {
      // Token invalid → remove it
      localStorage.removeItem("token");
    }

    logout();
    dispatch(logoutUser());
  }
};

    fetchProfile();
  }, [token, dispatch]);

  // Fetch checkout orders by email
  useEffect(() => {
    if (profile?._id && activeTab === "checkout-orders") {
      // ✅ email ki jagah _id
      fetchCheckoutOrders();
    }
  }, [profile, activeTab]);

  // Auto-refresh orders every 5 seconds when on orders tab
  useEffect(() => {
    let interval;
    if (profile?._id && activeTab === "checkout-orders") {
      // ✅ email ki jagah _id
      interval = setInterval(() => {
        fetchCheckoutOrders();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [profile, activeTab]);

  // ✅ Fixed: Fetch orders function with proper error handling
  // ✅ NAYA: User ID se orders fetch karo (email se nahi)
  const fetchCheckoutOrders = async () => {
    setLoadingOrders(true);
    try {
      // ✅ Profile se userId nikalo
      const userId = profile?._id;

      if (!userId) {
        console.error("❌ User ID not found");
        toast.error("User not logged in");
        return;
      }

      console.log("📦 Fetching orders for userId:", userId);
      console.log("🌐 Backend URL:", backendUrl);

      // ✅ User ID se orders fetch karo
      const res = await axios.get(`${backendUrl}/checkoutmodel/user/${userId}`);

      console.log("✅ Orders fetched:", res.data);
      setCheckoutOrders(res.data);
    } catch (err) {
      console.error(
        "❌ Failed to fetch orders:",
        err.response?.data || err.message
      );
      toast.error("Failed to load orders. Please check your connection.");
    } finally {
      setLoadingOrders(false);
    }
  };

  // Cancel order function
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await axios.put(
        `${backendUrl}/checkoutmodel/${orderId}/status`,
        { status: "cancelled" }
      );

      if (res.status === 200) {
        toast.success("Order cancelled successfully!");
        await fetchCheckoutOrders();
        if (showOrderModal) {
          setShowOrderModal(false);
        }
      }
    } catch (err) {
      toast.error("Failed to cancel order");
      console.error(err);
    }
  };

  const handleSettingsChange = (e) =>
    setSettingsData({ ...settingsData, [e.target.name]: e.target.value });

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        "https://velora-website-backend.vercel.app/api/auth/profile",
        settingsData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data.user || res.data);
      toast.success("Profile updated successfully!");
      setShowEdit(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
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
      toast.success("Password updated successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPassword(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async () => {
    setLoading(true);
    try {
      await axios.put(
        "https://velora-website-backend.vercel.app/api/auth/change-email",
        { newEmail: emailData.newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Email updated successfully!");
      setEmailData({ newEmail: "", password: "" });
      setShowEmail(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change email");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = (itemId) => {
    console.log("🗑️ Deleting item:", itemId);
    dispatch(removeFromCart(itemId));
    toast.success("Item removed from cart");
  };

  const confirmDeleteToast = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col p-4 border border-gray-200`}
      >
        <p className="text-gray-800 font-medium mb-3">
          ⚠️ Are you sure you want to delete your account?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDeleteAccount();
            }}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const confirmCancelOrderToast = (orderId) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col p-4 border border-gray-200`}
      >
        <p className="text-gray-800 font-medium mb-3">
          ⚠️ Are you sure you want to cancel this order?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleCancelOrder(orderId);
            }}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Yes, Cancel
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        "https://velora-website-backend.vercel.app/api/auth/delete-account",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(logoutUser());
      logout();
      toast.success("Account deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      dispatch(logoutUser());
      logout();
      setIsLoggingOut(false);
    }, 1200);
  };

  const orderTotal = orders.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
      case "deleted":
        return "bg-red-100 text-red-800";
    }
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
      <Toaster position="top-right" />
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
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-5 py-3 font-medium border-b border-gray-200 flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            <ShoppingBag size={18} /> CART ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("checkout-orders")}
            className={`w-full text-left px-5 py-3 font-medium border-b border-gray-200 flex items-center gap-2 ${
              activeTab === "checkout-orders"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            <Package size={18} /> MY ORDERS (
            {
              checkoutOrders.filter((order) => order.status !== "cancelled")
                .length
            }
            )
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

          {activeTab === "orders" && (
            <>
              <h2 className="text-xl font-semibold mb-6 tracking-wide text-gray-800 border-b pb-3">
                CART ITEMS
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingBag
                    size={48}
                    className="mx-auto mb-4 text-gray-300"
                  />
                  <p className="text-gray-500 text-lg">No items in cart</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Items you add to cart will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((item, idx) => (
                    <div
                      key={`${item.id}_${item.size}_${item.color}_${idx}`}
                      className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        {item.size && (
                          <p className="text-sm text-gray-500">
                            Size: {item.size}
                          </p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-500">
                            Color: {item.color}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ₹{item.totalPrice?.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₹{item.price} each
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteOrder(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition"
                        title="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}

                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-black">
                        ₹{orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "checkout-orders" && (
            <>
              <h2 className="text-xl font-semibold mb-6 tracking-wide text-gray-800 border-b pb-3">
                MY ORDERS
              </h2>

              {loadingOrders ? (
                <div className="text-center py-10">
                  <Loader2
                    size={40}
                    className="animate-spin mx-auto text-gray-400"
                  />
                  <p className="text-gray-500 mt-4">Loading orders...</p>
                </div>
              ) : checkoutOrders.filter(
                  (order) =>
                    order.status !== "cancelled" && order.status !== "deleted"
                ).length === 0 ? (
                <div className="text-center py-10">
                  <Package size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {checkoutOrders
                    .filter(
                      (order) =>
                        order.status !== "cancelled" &&
                        order.status !== "deleted"
                    )
                    .map((order) => (
                      <div
                        key={order._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-gray-800">
                              Order #{order._id.slice(-6)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="space-y-2 mb-3">
                          <p className="text-sm text-gray-600">
                            <strong>Items:</strong> {order.products.length}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Address:</strong> {order.address},{" "}
                            {order.city}, {order.country}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderModal(true);
                            }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition"
                          >
                            <Eye size={16} /> View Details
                          </button>
                          {order.status === "pending" && (
                            <button
                              onClick={() => confirmCancelOrderToast(order._id)}
                              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition"
                            >
                              <XCircle size={16} /> Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
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
                          placeholder={
                            name.charAt(0).toUpperCase() + name.slice(1)
                          }
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
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Saving...
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
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Updating...
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
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Updating...
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

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold flex items-center gap-2 mb-3 text-red-600">
                  <Trash2 size={18} /> Delete Account
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  This action is irreversible. All your data will be deleted.
                </p>
                <button
                  onClick={confirmDeleteToast}
                  className="bg-red-600 text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-red-700"
                >
                  <ShieldAlert size={18} /> Delete My Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Details
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Order Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <strong>Order ID:</strong> #{selectedOrder._id.slice(-6)}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-sm ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status.toUpperCase()}
                    </span>
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Shipping Info */}
              <div >
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Shipping Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <strong>Name:</strong> {selectedOrder.firstname}{" "}
                    {selectedOrder.lastname}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedOrder.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedOrder.address},{" "}
                    {selectedOrder.city}, {selectedOrder.country}
                  </p>
                  {selectedOrder.apartment && (
                    <p>
                      <strong>Apartment:</strong> {selectedOrder.apartment}
                    </p>
                  )}
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Products ({selectedOrder.products.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                    >
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {product.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: ₹{product.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          ₹
                          {(
                            parseFloat(product.price) *
                            parseInt(product.quantity)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancel Button */}
              {selectedOrder.status === "pending" && (
                <button
                  onClick={() => confirmCancelOrderToast(selectedOrder._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <XCircle size={20} /> Cancel This Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
