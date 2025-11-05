import React from "react";
import Link from "next/link";

const Bestsellers = () => {
  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 md:px-10">
      <div className="Mycontainer">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">Bestsellers</h1>
          <p className="text-sm sm:text-base md:text-lg py-3 max-w-md text-[#42383b]">
            From cult-favorite jackets to must-have dresses – These are our
            customer faves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ---------- Product 1 ---------- */}
          <div className="bg-white overflow-hidden group relative">
            <div className="relative">
              {/* ✅ Clickable Image */}
              <Link href={`/prodects/1`}>
                <img
                  src="/home-img8.png"
                  alt="Summer T-Shirt"
                  className="w-full h-auto object-cover transition-transform duration-500 cursor-pointer"
                />
              </Link>

              <div
                className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-3 
                group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
              >
                <div className="relative flex items-center group/cart">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Add to Cart
                  </span>
                  <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                    🛒
                  </button>
                </div>

                {/* View Details */}
                <div className="relative flex items-center group/view">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    View Details
                  </span>
                  <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                    👁️
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Summer T-Shirt
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">Women</p>
              <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">
                ₹130.00 – ₹135.00
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                {["S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    className="border border-gray-300 px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <div className="w-5 h-5 bg-purple-800 rounded-md"></div>
                <div className="w-5 h-5 bg-blue-800 rounded-md"></div>
                <div className="w-5 h-5 bg-green-700 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* ---------- Product 2 ---------- */}
          <div className="bg-white overflow-hidden">
            <div className="relative group">
              {/* ✅ Clickable Image */}
              <Link href={`/prodects/2`}>
                <img
                  src="/home-img9.png"
                  alt="Casual Denim Jacket"
                  className="w-full h-auto object-cover cursor-pointer"
                />
              </Link>

              <div
                className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-3
                group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
              >
                <div className="relative flex items-center group/cart">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Add to Cart
                  </span>
                  <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                    🛒
                  </button>
                </div>

                {/* View Details */}
                <div className="relative flex items-center group/view">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    View Details
                  </span>
                  <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                    👁️
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Casual Denim Jacket
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">Women</p>
              <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">
                ₹250.00 – ₹280.00
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                {["S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    className="border border-gray-300 px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <div className="w-5 h-5 bg-blue-700 rounded-md"></div>
                <div className="w-5 h-5 bg-gray-700 rounded-md"></div>
                <div className="w-5 h-5 bg-black rounded-md"></div>
              </div>
            </div>
          </div>

          {/* ---------- Product 3 ---------- */}
          <div className="bg-white overflow-hidden">
            <div className="relative group">
              {/* ✅ Clickable Image */}
              <Link href={`/prodects/3`}>
                <img
                  src="/homeimg-3.jpg"
                  alt="Floral Maxi Dress"
                  className="w-full h-auto object-cover cursor-pointer"
                />
              </Link>

              <div
                className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-3
                 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
              >
                <div className="relative flex items-center group/cart">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Add to Cart
                  </span>
                  <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                    🛒
                  </button>
                </div>

                {/* View Details */}
                <div className="relative flex items-center group/view">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    View Details
                  </span>
                  <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                    👁️
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Floral Maxi Dress
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">Women</p>
              <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">
                ₹199.00 – ₹210.00
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                {["S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    className="border border-gray-300 px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <div className="w-5 h-5 bg-pink-500 rounded-md"></div>
                <div className="w-5 h-5 bg-yellow-400 rounded-md"></div>
                <div className="w-5 h-5 bg-green-500 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
