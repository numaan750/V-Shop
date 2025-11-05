import Link from "next/link";
import React from "react";

const Newarrivals = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center px-6 py-16">
      <div className="Mycontainer text-center">
        <div className="bg-white text-left mx-auto py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-lg text-gray-600 md:mb-0 mb-8 md:w-3/4">
              Be the first to wear this season’s latest looks. Handpicked and
              freshly styled.
            </p>

            <div className="md:w-auto flex md:justify-end w-full">
              <button className="border border-red-500 text-red-500 rounded-full px-8 py-3 text-lg font-medium transition duration-300 hover:bg-red-500 hover:text-white">
                SEE WHAT'S NEW
              </button>
            </div>
          </div>
        </div>

        {/* --- Products --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
          {/* ---------- Product 1 ---------- */}
          <div className="group">
            <div className="group relative overflow-hidden">
              {/* ✅ Clickable Image */}
              <Link href={`/prodects/1`}>
                <img
                  src="/home-img1.png"
                  alt="Flowline Dress"
                  className="w-full object-cover transition-transform duration-300 cursor-pointer"
                />
              </Link>

              {/* Hover Icons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative flex items-center group/cart">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Add to Cart
                  </span>
                  <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                    🛒
                  </button>
                </div>

                <div className="relative flex items-center group/view">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    View Details
                  </span>
                  <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                    👁️
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 text-left">
                <h3 className="font-semibold text-gray-900">
                  Flowline Dresses
                </h3>
                <p className="text-sm text-gray-500">Women</p>
                <p className="mt-1 text-gray-900 font-semibold">
                  ₹200.00 – ₹250.00
                </p>

                <div className="mt-3 flex gap-2">
                  {["M", "L", "XL"].map((size) => (
                    <span
                      key={size}
                      className="border border-gray-300 rounded px-2 text-sm text-gray-600 cursor-pointer hover:border-gray-500 transition"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  {[
                    { color: "bg-purple-700", border: "hover:border-purple-700" },
                    { color: "bg-green-500", border: "hover:border-green-500" },
                    { color: "bg-yellow-500", border: "hover:border-yellow-500" },
                  ].map((clr, index) => (
                    <span
                      key={index}
                      className={`w-6 h-6 ${clr.color} rounded-sm border border-transparent cursor-pointer transition ${clr.border}`}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Product 2 ---------- */}
          <div className="group relative rounded-lg overflow-hidden">
            {/* ✅ Clickable Image */}
            <Link href={`/prodects/2`}>
              <img
                src="/home-img2.jpg"
                alt="Essential Polos"
                className="w-full object-cover transition-transform duration-300 cursor-pointer"
              />
            </Link>

            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="relative flex items-center group/cart">
                <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Add to Cart
                </span>
                <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                  🛒
                </button>
              </div>

              <div className="relative flex items-center group/view">
                <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  View Details
                </span>
                <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                  👁️
                </button>
              </div>
            </div>

            <div className="p-4 text-left">
              <h3 className="font-semibold text-gray-900">Essential Polos</h3>
              <p className="text-sm text-gray-500">Men</p>
              <p className="mt-1 text-gray-900 font-semibold">
                ₹80.00 – ₹90.00
              </p>

              <div className="mt-3 flex gap-2">
                {["M", "L", "XL"].map((size) => (
                  <span
                    key={size}
                    className="border border-gray-300 rounded px-2 text-sm text-gray-600 cursor-pointer hover:border-gray-500 transition"
                  >
                    {size}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                {[
                  { color: "bg-gray-600", border: "hover:border-gray-600" },
                  { color: "bg-slate-400", border: "hover:border-slate-400" },
                  { color: "bg-green-300", border: "hover:border-green-300" },
                ].map((clr, index) => (
                  <span
                    key={index}
                    className={`w-6 h-6 ${clr.color} rounded-sm border border-transparent cursor-pointer transition ${clr.border}`}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- Product 3 ---------- */}
          <div className="group relative rounded-lg overflow-hidden">
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              Sale!
            </span>

            {/* ✅ Clickable Image */}
            <Link href={`/prodects/3`}>
              <img
                src="/homeimg-3.jpg"
                alt="Cream T-Shirt"
                className="w-full object-cover transition-transform duration-300 cursor-pointer"
              />
            </Link>

            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="relative flex items-center group/cart">
                <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Add to Cart
                </span>
                <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                  🛒
                </button>
              </div>

              <div className="relative flex items-center group/view">
                <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  View Details
                </span>
                <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                  👁️
                </button>
              </div>
            </div>

            <div className="p-4 text-left">
              <h3 className="font-semibold text-gray-900">Cream T-Shirt</h3>
              <p className="text-sm text-gray-500">Men</p>
              <p className="mt-1 text-gray-900 font-semibold">
                ₹60.00 – ₹65.00
              </p>

              <div className="mt-3 flex gap-2">
                {["M", "L", "XL"].map((size) => (
                  <span
                    key={size}
                    className="border border-gray-300 rounded px-2 text-sm text-gray-600 cursor-pointer hover:border-gray-500 transition"
                  >
                    {size}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                {[
                  { color: "bg-purple-300", border: "hover:border-purple-300" },
                  { color: "bg-blue-300", border: "hover:border-blue-300" },
                  { color: "bg-green-400", border: "hover:border-green-400" },
                ].map((clr, index) => (
                  <span
                    key={index}
                    className={`w-6 h-6 ${clr.color} rounded-sm border border-transparent cursor-pointer transition ${clr.border}`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newarrivals;
