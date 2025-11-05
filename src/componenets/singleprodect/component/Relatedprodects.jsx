"use client";
import React from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Formal Shirt",
    category: "Women",
    price: "₹140.00",
    image: "/related-img.jpg",
    sale: true,
  },
  {
    id: 2,
    name: "Summer T-Shirt",
    category: "Men",
    price: "₹130.00 – ₹135.00",
    image: "/related-img2.jpg",
    sale: false,
  },
  {
    id: 3,
    name: "Dot Skirt",
    category: "Women",
    price: "₹100.00 – ₹110.00",
    image: "/shop-3.jpg",
    sale: true,
  },
  {
    id: 4,
    name: "Black Hoodie",
    category: "Men",
    price: "₹160.00 – ₹170.00",
    image: "/shop-4.jpg",
    sale: false,
  },
];

const Relatedprodects = ({ category }) => {
  // ✅ Filter products by category
  const related = products.filter((product) => product.category === category);

  return (
    <div className="Mycontainer py-15">
      <h2 className="text-2xl font-extrabold mb-8">Related Products</h2>

      {related.length === 0 ? (
        <p className="text-gray-500">No related products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {related.map((product) => (
            <div key={product.id} className="group relative">
              {/* Sale Badge */}
              {product.sale && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                  Sale!
                </span>
              )}

              {/* ✅ Only Image Clickable */}
              <Link href={`/prodects/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  loading="lazy"
                />
              </Link>

              {/* Hover Buttons */}
              <div
                className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-3
                group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20"
              >
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

              {/* Product Info (Not Clickable) */}
              <div className="mt-5">
                <h3 className="font-semibold text-base">{product.name}</h3>
                <p className="text-gray-400 mt-3 text-sm">{product.category}</p>
                <p className="font-semibold mt-3">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Relatedprodects;
