"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartslice";
import toast from "react-hot-toast";

const Bestsellers = () => {
  const dispatch = useDispatch();

  // ✅ Calculate discounted price for a product
const getDiscountedPrice = (product) => {
  if (!product) return 0;

  let price = product.price;

  if (product.discount && product.discount.percent) {
    // check expiry date if exists
    if (!product.discount.expiresAt || new Date(product.discount.expiresAt) > new Date()) {
      const discountAmount = (price * product.discount.percent) / 100;
      return price - discountAmount;
    }
  }

  return price;
};

  const { products: backendProducts, loading, error } = useProducts();

  // ✅ Latest 3 products on Sale
  const saleProducts = useMemo(() => {
    if (!backendProducts || backendProducts.length === 0) return [];
    return [...backendProducts]
      .filter((p) => p.sale) // only products on sale
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
      .slice(0, 3); // only 3
  }, [backendProducts]);

  // ✅ Local state for colors and sizes
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({});

  const handleColorSelect = (productId, colorHex) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorHex }));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));

    // ✅ Size ke corresponding price set karo
    const productObj = saleProducts.find((p) => p._id === productId);
    if (productObj && productObj.sizes) {
      const sizeObj = productObj.sizes.find((s) => s.label === size);
      if (sizeObj) {
        setSelectedPrices((prev) => ({ ...prev, [productId]: sizeObj.price }));
      }
    }
  };

  const getProductImage = (product) => {
    const selectedColor = selectedColors[product._id];
    if (selectedColor && product.colors && product.images) {
      const colorObj = product.colors.find((c) => c.hex === selectedColor);
      if (colorObj) {
        const colorImage = product.images.find((img) => {
          const imgColorId =
            typeof img.colour === "object" ? img.colour._id : img.colour;
          return imgColorId === colorObj._id;
        });
        if (colorImage)
          return typeof colorImage === "object" ? colorImage.url : colorImage;
      }
    }
    // ✅ Force Bestsellers to always show first sale image if exists
    if (product.images && product.images.length > 0) {
      const saleImg =
        product.images.find((img) => img.saleImage) || product.images[0];
      return typeof saleImg === "object" ? saleImg.url : saleImg;
    }
    return "/placeholder-image.jpg";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error)
    return <div className="py-16 text-center text-red-500">Error: {error}</div>;
  if (saleProducts.length === 0) return null; // No sale products

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
          {saleProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white overflow-hidden group relative "
            >
              {product.discount?.percent && (
  <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
    {product.discount.percent}% OFF
  </span>
)}

              {/* Product Image */}
              <Link href={`/prodects/${product._id}`}>
                <div className="relative w-full aspect-[1/1.1] overflow-hidden bg-gray-100">
                  <img
                    src={getProductImage(product)}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  />
                </div>
              </Link>

              {/* Hover Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <div className="relative flex items-center group/cart">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Add to Cart
                  </span>
                  <button
                    className=" cursor-pointer  p-0.5 rounded-full  transform hover:scale-110 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!product._id || !product.title || !product.price)
                        return;

                      const item = {
                        productId: product._id,
                        name: product.title,
price: selectedPrices[product._id] ?? getDiscountedPrice(product), // ✅ use discount if available
                        quantity: 1,
                        size:
                          selectedSizes[product._id] ||
                          (product.sizes?.[0]?.label ?? null),
                        color:
                          selectedColors[product._id] ||
                          (product.colors?.[0]?.hex ?? null),
                        image: getProductImage(product),
                      };
                      dispatch(addToCart(item));
                      toast.success(`${product.title} added to cart!`, {
                        position: "top-right",
                        style: {
                          borderRadius: "10px",
                          background: "#333",
                          color: "#fff",
                        },
                      });
                    }}
                  >
                    🛒
                  </button>
                </div>

                <div className="relative flex items-center group/view">
                  <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    View Details
                  </span>
                  <Link href={`/prodects/${product._id}`}>
                    <button className=" p-0.5 rounded-full cursor-pointer transform hover:scale-110 transition">
                      👁️
                    </button>
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {product.category?.name || "Uncategorized"}
                </p>
                <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">
  ₹{selectedPrices[product._id] ?? getDiscountedPrice(product)}.00
  {product.discount?.percent && (
    <span className="line-through text-gray-400 ml-2">
      ₹{product.price}.00
    </span>
  )}
</p>


                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() =>
                          handleSizeSelect(product._id, size.label)
                        }
                        className={`border border-gray-300 px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-gray-100 ${
                          selectedSizes[product._id] === size.label
                            ? "bg-gray-200 border-gray-400"
                            : ""
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color.hex}
                        onClick={() =>
                          handleColorSelect(product._id, color.hex)
                        }
                        className={`w-4 h-4 rounded-sm border border-transparent cursor-pointer transition-all ${
                          selectedColors[product._id] === color.hex
                            ? "ring-1  ring-red-500 "
                            : ""
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
