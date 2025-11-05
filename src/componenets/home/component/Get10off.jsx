import React from "react";

const Get10off = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white py-20 px-4 sm:px-8">
      <div className="Mycontainer text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-black">
          Get 10% Off on Your First Order
        </h1>
        <p className="text-gray-600 mt-4 sm:mt-6 font-medium text-md">
          Plus exclusive access to product drops, style tips, and insider deals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-72 sm:w-80 md:w-96 px-3 py-2 rounded-lg border border-gray-300 hover:border-[#e67070] focus:border-red-300 focus:ring-2 focus:ring-red-200 focus:outline-none transition duration-200 text-left"
          />
          <button className="rounded-lg py-2 px-6 bg-rose-600 hover:bg-rose-500 text-white font-medium transition duration-200">
            Subscribe
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          <img
            src="/home-last1.jpg"
            alt="Model 1"
            className="rounded-2xl object-cover w-80 h-90"
          />
          <img
            src="/home-last2.jpg"
            alt="Model 2"
            className="rounded-2xl object-cover w-80 h-90"
          />
          <img
            src="/home-last3.jpg"
            alt="Model 3"
            className="rounded-2xl object-cover w-80 h-90"
          />
          <img
            src="/home-last4.jpg"
            alt="Model 4"
            className="rounded-2xl object-cover w-80 h-90"
          />
        </div>

        <div className="flex items-center justify-center gap-2 mt-12 text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-rose-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 3h9a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3zm8.25 4.125a.375.375 0 11.75 0 .375.375 0 01-.75 0zM12 8.25A3.75 3.75 0 1012 15a3.75 3.75 0 000-6.75z"
            />
          </svg>
          <p className="text-sm sm:text-base font-medium">
            <span className="font-bold text-black">Follow us</span> @VeloraStyle
          </p>
        </div>
      </div>
    </div>
  );
};

export default Get10off;
