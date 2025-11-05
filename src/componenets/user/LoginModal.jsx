"use client";
import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const API_URL = "http://localhost:4000/api/auth";

const LoginModal = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLostPassword, setIsLostPassword] = useState(false); // 👈 new state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // lost password states
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    postalcode: "",
    address: "",
    phone: "",
  });

  const { login } = useContext(AuthContext);
  const router = useRouter();

useEffect(() => {
  if (isOpen) setShow(true);
  else {
    const timer = setTimeout(() => setShow(false), 300);
    return () => clearTimeout(timer);
  }
}, [isOpen]);

// ✅ ADD THIS BELOW
useEffect(() => {
  if (isOpen) {
    setFormData({
      username: "",
      email: "",
      password: "",
      country: "",
      city: "",
      postalcode: "",
      address: "",
      phone: "",
    });
    setEmail("");
    setCode("");
    setNewPassword("");
    setMessage("");
    setStep(1);
    setIsLostPassword(false);
    setIsSignup(false);
  }
}, [isOpen]);

if (!isOpen && !show) return null;


  if (!isOpen && !show) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Signup
  const handleSignup = async () => {
    try {
      const res = await axios.post(`${API_URL}/register`, formData);
      alert("✅ Signup successful! Please login now.");
      setIsSignup(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed!");
    }
  };

  // ✅ Login
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });
      login(res.data.token, res.data.user);
      onClose();
      router.push("/profile"); // ✅ redirect to profile after login
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed!");
    }
  };

  // 🔐 Lost Password Handlers
  const handleSendCode = async () => {
    if (!email) return setMessage("❌ Please enter your email");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/send-reset-code`, { email });
      setMessage(res.data.message || "✅ Code sent to your email");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return setMessage("❌ Please enter the code");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/verify-reset-code`, { email, code });
      setMessage(res.data.message || "✅ Code verified");
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) return setMessage("❌ Enter new password");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/reset-password-with-code`, {
        email,
        code,
        newPassword,
      });
      setMessage(res.data.message || "✅ Password reset successful!");

      // ✅ after success, return to login form automatically
      setTimeout(() => {
        setIsLostPassword(false);
        setStep(1);
        setEmail("");
        setCode("");
        setNewPassword("");
        setMessage("");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className={`bg-[#f2f2f2] 
         w-[95%] sm:w-[85%] md:w-[60%] lg:w-[30%]
         h-auto max-h-[80vh] overflow-y-auto
         p-8 relative transition-all duration-300 ease-in-out
         ${isOpen ? "animate-slideUpEaseOut" : "animate-slideDownEaseIn"}`}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {message && (
          <p className="text-center mb-4 text-sm font-medium text-gray-800 bg-gray-100 p-2 rounded">
            {message}
          </p>
        )}

        {/* 🔽 Lost Password Flow */}
        {isLostPassword ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Lost Password
            </h2>

            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm p-2 mb-4"
                />
                <button
                  onClick={handleSendCode}
                  disabled={loading}
                  className="w-full bg-[#f0243c] text-white py-3 rounded-full hover:bg-[#ff334b] transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "SEND CODE"}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter code *"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm p-2 mb-4"
                />
                <button
                  onClick={handleVerifyCode}
                  disabled={loading}
                  className="w-full bg-[#f0243c] text-white py-3 rounded-full hover:bg-[#ff334b] transition disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "VERIFY CODE"}
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="Enter new password *"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm p-2 mb-4"
                />
                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full bg-[#f0243c] text-white py-3 rounded-full hover:bg-[#ff334b] transition disabled:opacity-60"
                >
                  {loading ? "Saving..." : "RESET PASSWORD"}
                </button>
              </>
            )}

            <p
              onClick={() => setIsLostPassword(false)}
              className="mt-4 text-center text-sm text-gray-700 underline cursor-pointer"
            >
              Back to Login
            </p>
          </>
        ) : !isSignup ? (
          <>
            {/* 🔐 Login View */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Log In</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />

            <p
              onClick={() => setIsLostPassword(true)} // 👈 now opens forgot password flow
              className="text-sm text-[#f0243c] text-right cursor-pointer hover:underline mb-4"
            >
              Lost your password?
            </p>

            <button
              onClick={handleLogin}
              className="w-full bg-[#f0243c] text-white py-3 rounded-full hover:bg-[#ff334b]"
            >
              LOGIN
            </button>

            <p className="text-center mt-4 text-gray-700">
              Don’t have an account?{" "}
              <span
                onClick={() => setIsSignup(true)}
                className="text-[#f0243c] font-semibold cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </>
        ) : (
          <>
            {/* 🧾 Signup View */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Create Account
            </h2>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />
            <input
              type="text"
              name="postalcode"
              value={formData.postalcode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-sm p-2 mb-3"
            />

            <button
              onClick={handleSignup}
              className="w-full bg-[#f0243c] text-white py-3 rounded-full hover:bg-[#ff334b]"
            >
              SIGN UP
            </button>

            <p className="text-center mt-4 text-gray-700">
              Already have an account?{" "}
              <span
                onClick={() => setIsSignup(false)}
                className="text-[#f0243c] font-semibold cursor-pointer"
              >
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
