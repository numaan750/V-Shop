"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext"; // ✅ use your backend data
import { addToCart } from "@/redux/cartslice"; // aapka existing cart slice
import { toast } from "react-hot-toast"; // agar aapne install nahi kiya to npm i react-hot-toast
import { useDispatch } from "react-redux"; // ✅ Redux dispatch ke liye

const Relatedprodects = ({ categoryId, categoryName, currentProductId }) => {
  const { products: backendProducts, loading, error } = useProducts();
  const dispatch = useDispatch();

  // ✅ Related products logic
  const relatedProducts = useMemo(() => {
    if (!backendProducts || backendProducts.length === 0) return [];
    return backendProducts
      .filter(
        (p) =>
          (p.category?._id || p.category) === categoryId && // same category
          p._id !== currentProductId // ✅ exclude the current product
      )
      .slice(0, 6); // ✅ show up to 6 products
  }, [backendProducts, categoryId]);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load related products.
      </div>
    );

  if (relatedProducts.length === 0)
    return (
      <div className="Mycontainer py-10 text-center text-gray-500">
        No related products found in {categoryName}.
      </div>
    );

  const handleAddToCart = (product) => {
    const item = {
      productId: product._id,
      name: product.title,
      price: product.price,
      quantity: 1,
      size: product.sizes?.[0]?.label || null,
      color: product.colors?.[0]?.hex || null,
      image:
        product.images?.[0]?.url ||
        product.images?.[0] ||
        "/placeholder-image.jpg",
    };

    dispatch(addToCart(item));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="Mycontainer py-15">
      <h2 className="text-2xl font-extrabold mb-8">
        Related Products in {categoryName}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={product._id} className="group relative">
            {/* Sale Badge */}
            {product.sale && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                Sale!
              </span>
            )}

            {/* Product Image */}
            <Link href={`/prodects/${product._id}`}>
              <img
                src={
                  product.images?.[0]?.url ||
                  product.images?.[0] ||
                  "/placeholder-image.jpg"
                }
                alt={product.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                loading="lazy"
              />
            </Link>

            {/* Hover Buttons */}
            <div
              className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-3
                group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20"
            >
              {/* Add to Cart */}
              <div className="relative flex items-center group/cart">
                <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Add to Cart
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="cursor-pointer"
                >
                  🛒
                </button>
              </div>

              {/* View Details / Single Page */}
              <div className="relative flex items-center group/view">
                <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  View Details
                </span>
                <Link href={`/prodects/${product._id}`}>
                  <button className="cursor-pointer">
                    👁️
                  </button>
                </Link>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-5">
              <h3 className="font-semibold text-base">{product.title}</h3>
              <p className="text-gray-400 mt-3 text-sm">
                {product.category?.name || "Uncategorized"}
              </p>
              <p className="font-semibold mt-3">₹{product.price}.00</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Relatedprodects;
