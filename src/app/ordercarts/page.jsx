"use client";
import React, { Suspense } from "react";
import AddtoCard from "../../componenets/ordercarts/AddtoCard";
import { useSearchParams } from "next/navigation";

// Separate component jo useSearchParams use karta hai
function OrderCartsContent() {
  const searchParams = useSearchParams();

  // ✅ Payment parameters ko AddToCart component mein pass karo
  const paymentStatus = searchParams.get("payment_status");
  const sessionId = searchParams.get("session_id");

  return (
    <div>
      <AddtoCard paymentStatus={paymentStatus} sessionId={sessionId} />
    </div>
  );
}

// Main page component with Suspense boundary
const Page = () => {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <OrderCartsContent />
    </Suspense>
  );
};

export default Page;