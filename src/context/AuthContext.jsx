"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductProvider } from "@/context/ProductContext";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [status, setStatus] = useState(null);
  const [blog, setBlog] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log("AuthContext useEffect");
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
    router.push("/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/");
    toast.success("👋 Logged out successfully!");
  };

  const getshipping = async () => {
    try {
      const res = await axios.get("https://velora-website-backend.vercel.app/api/shipping");
      setShipping(res.data.shipping);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to get shipping info");
    }
  };

  const createcheckout = async () => {
    try {
      const res = await axios.post("https://velora-website-backend.vercel.app/api/checkoutmodel");
      setCheckout(res.data.checkout);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create checkout");
    }
  };

  const getstatus = async () => {
    try {
      const res = await axios.get("https://velora-website-backend.vercel.app/api/checkoutmodel");
      setStatus(res.data.checkout);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to get checkout");
    }
  };

  const getblog = async () => {
  try {
    const res = await axios.get("https://velora-website-backend.vercel.app/api/blogmodel");
    // ✅ Backend array directly return karta hai, not { blog: [...] }
    setBlog(res.data); // Change: res.data.blog ❌ -> res.data ✅
    console.log("All blogs fetched:", res.data);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    toast.error(err.response?.data?.message || "Failed to get blogs");
  }
};

const getblogbyid = async (id) => {
  try {
    const res = await axios.get(`https://velora-website-backend.vercel.app/api/blogmodel/${id}`);
    // ✅ Backend { blog: {...} } return karta hai
    setBlog(res.data.blog); // This is correct ✅
    console.log("Single blog fetched:", res.data.blog);
    return res.data.blog; // Return for direct use
  } catch (err) {
    console.error("Error fetching blog:", err);
    toast.error(err.response?.data?.message || "Failed to get blog");
    throw err; // Throw error to handle in component
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        shipping,
        checkout,
        status,
        blog,
        login,
        logout,
        getshipping,
        createcheckout,
        getstatus,
      //blog k liya 
      getblog,
      getblogbyid,

      }}
    >
      <ProductProvider>{children}</ProductProvider>
    </AuthContext.Provider>
  );
};
