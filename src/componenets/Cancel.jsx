"use client";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-red-500 text-7xl mb-5">❌</div>
        
        <h1 className="text-4xl font-bold mb-3 text-gray-800">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            If you encountered any issues during checkout, please try again or contact our support team.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/ordercarts")}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Return to Cart
          </button>
          
          <button
            onClick={() => router.push("/home")}
            className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-full font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}