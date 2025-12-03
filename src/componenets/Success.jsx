"use client";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartslice";
import axios from "axios";
import toast from "react-hot-toast"; 

export default function SuccessPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams(); 
  
  const [loading, setLoading] = useState(true);
  const [orderSaved, setOrderSaved] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const sessionId = searchParams.get("session_id"); 
        
        console.log("🔍 Session ID:", sessionId);
        console.log("🔍 Checking sessionStorage...");

        const pendingOrderStr = sessionStorage.getItem("pendingOrder");
        
        if (!pendingOrderStr) {
          console.log("❌ No pending order found in sessionStorage");
          toast.error("No order data found. Please try again.");
          setLoading(false);
          setTimeout(() => router.push("/ordercarts"), 2000);
          return;
        }

        const orderData = JSON.parse(pendingOrderStr);
        console.log("📦 Retrieved order data:", orderData);

        orderData.status = "paid";
        orderData.sessionId = sessionId; 
        console.log("📤 Sending order to backend...", orderData);

        const res = await axios.post(
          "https://velora-website-backend.vercel.app/api/checkoutmodel",
          orderData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("✅ Order saved successfully:", res.data);
        
        setOrderDetails(res.data);
        
        sessionStorage.removeItem("pendingOrder");
        sessionStorage.removeItem("cartItems");
        
        console.log("🗑️ SessionStorage cleared");
        
        dispatch(clearCart());
        
        console.log("🛒 Cart cleared");
        
        setOrderSaved(true);
        toast.success("✅ Order placed successfully!");
        
      } catch (err) {
        console.error("❌ Error saving order:", err);
        console.error("❌ Error details:", err.response?.data);
        
        if (err.response?.status === 400) {
          const errorMsg = err.response?.data?.message || "Invalid order data";
          toast.error(`❌ ${errorMsg}`);
        } else {
          toast.error("Failed to save order. Please contact support.");
        }
        
        setTimeout(() => router.push("/ordercarts"), 3000);
        
      } finally {
        setLoading(false);
      }
    };

    saveOrder();
  }, [dispatch, router, searchParams]); 

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Processing your order...</h2>
          <p className="text-gray-600 mt-2">Please wait while we confirm your payment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-green-500 text-7xl mb-5">✅</div>
        <h1 className="text-4xl font-bold mb-3 text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          {orderSaved 
            ? "Your order has been placed successfully." 
            : "There was an issue saving your order. Please contact support."}
        </p>
        
        {orderDetails && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
            <p className="text-sm text-gray-600">
              Order ID: <span className="font-bold">{orderDetails._id}</span>
            </p>
            <p className="text-sm text-gray-600">
              Status: <span className="font-bold text-green-600">PAID</span>
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={() => router.push("/home")}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Back to Home
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}