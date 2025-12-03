"use client";
import React from "react";
import AddtoCard from "../../componenets/ordercarts/AddtoCard";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  // ✅ Payment parameters ko AddToCart component mein pass karo
  const paymentStatus = searchParams.get("payment_status");
  const sessionId = searchParams.get("session_id");

  return (
    <div>
      <AddtoCard paymentStatus={paymentStatus} sessionId={sessionId} />
    </div>
  );
};

export default Page;
