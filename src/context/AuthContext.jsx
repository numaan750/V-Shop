"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
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
  const [loading, setLoading] = useState(false);
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
      const res = await axios.get(
        "https://velora-website-backend.vercel.app/api/shipping"
      );
      setShipping(res.data.shipping);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to get shipping info");
    }
  };

  const createcheckout = async () => {
    try {
      const res = await axios.post(
        "https://velora-website-backend.vercel.app/api/checkoutmodel"
      );
      setCheckout(res.data.checkout);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create checkout");
    }
  };

  const getstatus = async () => {
    try {
      const res = await axios.get(
        "https://velora-website-backend.vercel.app/api/checkoutmodel"
      );
      setStatus(res.data.checkout);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to get checkout");
    }
  };

  const getblog = async () => {
    try {
      const res = await axios.get(
        "https://velora-website-backend.vercel.app/api/blogmodel"
      );
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
      const res = await axios.get(
        `https://velora-website-backend.vercel.app/api/blogmodel/${id}`
      );
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

  const submitContactForm = async (formData) => {
    setLoading(true);
    try {
      console.log("Sending data to backend:", formData);

      const response = await fetch(
        "https://velora-website-backend.vercel.app/api/contectmodel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        toast.success(data.message);
        return {
          success: true,
          message: data.message,
        };
      } else {
        toast.error(data.message || "Something went wrong!");
        return {
          success: false,
          message: data.message || "Something went wrong!",
        };
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
      return {
        success: false,
        message: "Network error. Please try again.",
      };
    } finally {
      setLoading(false);
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
        loading,
        login,
        logout,
        getshipping,
        createcheckout,
        getstatus,
        //blog k liya
        getblog,
        getblogbyid,
        //contect k liya
        submitContactForm,
      }}
    >
      <ProductProvider>{children}</ProductProvider>
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
