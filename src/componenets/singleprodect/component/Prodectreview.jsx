"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Relatedprodects from "./Relatedprodects";
import { useDispatch } from "react-redux";
import CartDrawer from "@/componenets/user/CartDrawer";
import { addToCart } from "@/redux/cartslice";

const Prodectreview = ({ product }) => {
  // const product = {
  //   title: "Flowline Dresses",
  //   category: "Women",
  //   description:
  //     "Flowline Dresses are the perfect blend of elegance and comfort, designed with sleek, uninterrupted silhouettes that gently flow with your movement. Crafted from lightweight, breathable fabrics, these dresses offer a flattering drape for all body types. Ideal for both casual outings and special occasions, their minimalist design exudes effortless sophistication. Available in a variety of colors and patterns, Flowline Dresses are a timeless addition to any wardrobe. Pair them with your favorite accessories for a chic, polished look.",
  //   images: [
  //     "/home-img9.png",
  //     "/homeimg-3.jpg",
  //     "/home-last1.jpg",
  //     "/shop-2.jpg",
  //   ],
  //   colors: [
  //     { name: "Purple", hex: "#9333ea" },
  //     { name: "Teal", hex: "#14b8a6" },
  //     { name: "Green", hex: "#84cc16" },
  //   ],
  //   sizes: [
  //     { label: "M", price: 200 },
  //     { label: "L", price: 220 },
  //     { label: "XL", price: 250 },
  //   ],
  // };

  const [mainImage, setMainImage] = useState(product?.images[0]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.hex);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  // 🧠 Prevent crash if product data not loaded yet
  if (!product) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  const price = selectedSize
    ? product?.sizes?.find((s) => s.label === selectedSize)?.price
    : "200 – 250";

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <>
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

    <div className="py-20 bg-white">
      <div className="Mycontainer grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE: Main Image + Thumbnails */}
        <div className="space-y-3">
          {/* Main Image Container */}
          <div
            className="relative w-full overflow-hidden " // keep your height
            ref={imgRef}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={mainImage}
              alt="Product"
              className={`w-full h-full object-cover transition-transform duration-300 ${
                zoom ? "scale-150" : "scale-100"
              }`}
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                imageRendering: "crisp-edges",
              }}
            />
            {/* Magnifying Glass Icon */}
            <button
              onClick={() => {
                setCurrentIndex(product?.images.indexOf(mainImage));
                setIsLightboxOpen(true);
              }}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 z-10"
            >
              🔍
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex mt-5 gap-2 justify-start">
            {product?.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`border overflow-hidden ${
                  mainImage === img
                    ? "border-red-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-50 h-40 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        {isLightboxOpen && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
              fullscreen ? "bg-black" : "bg-black/90"
            }`}
          >
            {/* 🔢 Image Counter (Top-Left) */}
            <div className="absolute top-4 left-5 text-white text-sm font-medium">
              {currentIndex + 1} / {product?.images?.length}
            </div>

            {/* 🧭 Top-Right: Fullscreen / Minimize + Close */}
            <div className="absolute top-4 right-5 flex items-center gap-4 text-white">
              <button
                onClick={() => setFullscreen((prev) => !prev)}
                className="text-2xl hover:text-gray-300"
              >
                {fullscreen ? "🗗" : "🗖"}
              </button>

              <button
                onClick={() => {
                  setFullscreen(false);
                  setIsLightboxOpen(false);
                }}
                className="text-2xl font-bold hover:text-gray-300"
              >
                ✖
              </button>
            </div>

            {/* ≪ Arrow Left */}
            <button
              className="absolute left-8 cursor-pointer text-white text-3xl font-bold hover:text-gray-300"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? product?.images?.length - 1 : prev - 1
                )
              }
            >
              ≪
            </button>

            {/* 🖼 Image */}
            <img
              src={product?.images[currentIndex]}
              alt="Zoomed"
              className={`transition-all duration-500 rounded-xl ${
                fullscreen
                  ? "w-screen h-screen object-contain"
                  : "max-h-[80vh] max-w-[80vw] object-contain"
              }`}
            />

            {/* ≫ Arrow Right */}
            <button
              className="absolute right-8 cursor-pointer text-white text-3xl font-bold hover:text-gray-300"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === product?.images?.length - 1 ? 0 : prev + 1
                )
              }
            >
              ≫
            </button>
          </div>
        )}

        {/* RIGHT SIDE: Details */}
        <div className="space-y-4 gap-0">
          <div className="text-gray-500 text-md flex flex-wrap gap-1 items-center">
            {/* Home */}
            <span
              onClick={() => router.push("/")}
              className="cursor-pointer hover:text-black transition-colors"
            >
              Home
            </span>

            <span>/</span>

            {/* Category */}
            <span
              onClick={() => router.push(`/shop?category=${product?.category}`)}
              className="cursor-pointer hover:text-black transition-colors"
            >
              {product?.category}
            </span>

            <span>/</span>

            {/* Product Title */}
            <span className="text-black font-semibold">{product?.title}</span>
          </div>
          <h2 className="text-md font-semibold text-black ">
            {product?.category || "Unknown"}
          </h2>
          <h1 className="text-2xl font-bold">{product?.title}</h1>

          <p className="text-2xl font-semibold ">
            ₹{price}.00{" "}
            {typeof price === "string" && (
              <span className="text-gray-500 font-normal text-sm ">
                & Free Shipping
              </span>
            )}
          </p>

          <p className="text-gray-500 text-md font-semibold leading-relaxed">
            {product?.description}
          </p>

          {/* Sizes */}
          <div className="flex items-center gap-3 mt-6">
            {product?.sizes?.map((size) => (
              <button
                key={size?.label}
                onClick={() => setSelectedSize(size?.label)}
                className={`border rounded-sm px-3 py-0.5 text-sm font-semibold ${
                  selectedSize === size.label
                    ? "border-gray-800  text-black"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>

          {/* Colors */}
          <div className="mt-5 border-b border-gray-300 pb-4">
            <div className="flex flex-col items-start gap-2 mt-4">
              {/* color buttons */}
              <div className="flex items-center gap-2">
                {product?.colors?.map((color) => (
                  <button
                    key={color?.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-6 h-6 rounded border-2 ${
                      selectedColor === color.hex
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>

              {/* clear button (below, left-aligned) */}
              <button
                onClick={() => {
                  setSelectedColor(null);
                  setSelectedSize(null);
                }}
                className="text-gray-500 cursor-pointer text-sm mt-2"
              >
                CLEAR
              </button>
            </div>
          </div>

          {/* Price + Add to Cart */}
          <div className="mt-6 border-b border-gray-300 pb-7">
            {/* Price */}
            <p className="text-2xl font-bold mb-3">₹{price}.00</p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3">
              {/* Quantity box */}
              <div className="flex border border-gray-300">
                <button
                  className="px-3 py-2 text-xl cursor-pointer select-none"
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  -
                </button>

                <span className="px-4 py-2 border border-gray-200 text-md select-none">
                  {quantity}
                </span>

                <button
                  className="px-3 py-2 text-xl cursor-pointer select-none"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              <button
                disabled={!selectedSize}
                onClick={() => {
                  const uniqueId = `${product.id}_${selectedSize}_${
                    selectedColor || "default"
                  }`;
                  const item = {
                    id: uniqueId,
                    productId: product.id,
                    name: product.title,
                    price: selectedSize
                      ? product.sizes.find((s) => s.label === selectedSize)
                          ?.price
                      : 200,
                    quantity,
                    size: selectedSize,
                    color: selectedColor,
                    image: mainImage,
                    totalPrice:
                      (selectedSize
                        ? product.sizes.find((s) => s.label === selectedSize)
                            ?.price
                        : 200) * quantity,
                  };

                  dispatch(addToCart(item));
                  setQuantity(1);

                  // 🧩 Instead of alert, open the cart drawer
                  setIsCartOpen(true);
                }}
                className={`px-6 py-3 rounded-full text-white font-semibold transition ${
                  selectedSize
                    ? "bg-[#f0243c] hover:bg-[#ff334b]"
                    : "bg-[#ff99a5] cursor-not-allowed"
                }`}
              >
                ADD TO CART
              </button>
            </div>
          </div>

          <div className="text-md text-gray-800 space-y-2 mt-4">
            <p>SKU: N/A &nbsp; Category: Women</p>
            <p className="text-md font-bold">
              Free shipping on orders over $50!
            </p>
            <p>✔ No-Risk Money Back Guarantee!</p>
            <p>✔ No Hassle Refunds</p>
            <p>✔ Secure Payments</p>
          </div>

          <div className="w-full flex justify-start mt-8 relative">
            <div className="relative w-full max-w-md text-center py-2 px-6 bg-white rounded-md border border-gray-300">
              {/* SVG border */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 900 600"
                className="absolute top-0 left-0  z-0"
              >
                <path d="" fill="none" stroke="#000" strokeWidth="1.5" />
                <path d="" fill="none" stroke="#ccc" strokeWidth="1.2" />
              </svg>

              {/* Title */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 z-10">
                <p className="text-sm font-semibold text-gray-800">
                  Guaranteed Safe Checkout
                </p>
              </div>

              {/* Payment icons */}
              <div className="flex justify-center items-center gap-4 mt-4 relative z-10">
                <img src="/visa-img.jpeg" alt="Visa" className="w-13 h-auto" />
                <img
                  src="/master-img.png"
                  alt="Mastercard"
                  className="w-13 h-auto"
                />
                <img
                  src="/american-img.jpeg"
                  alt="American Express"
                  className="w-13 h-auto"
                />
                <img
                  src="/discover-img.png"
                  alt="Discover"
                  className="w-13 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Mycontainer py-10">
        {/* Tabs */}
        <div className="border-t border-gray-300 flex flex-nowrap gap-6 overflow-x-auto no-scrollbar relative z-10">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 cursor-pointer font-semibold text-sm md:text-base transition-colors ${
              activeTab === "description"
                ? "border-t-2  border-[#525252] text-[#6e6d6e]"
                : "text-gray-600 hover:text-gray-500"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("additional")}
            className={`pb-2 cursor-pointer font-semibold text-sm md:text-base transition-colors ${
              activeTab === "additional"
                ? "border-t-2 border-[#525252] text-[#6e6d6e]"
                : "text-gray-600 hover:text-gray-500"
            }`}
          >
            Additional information
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 cursor-pointer font-semibold text-sm md:text-base transition-colors ${
              activeTab === "reviews"
                ? "border-t-2 border-[#525252] text-[#6e6d6e]"
                : "text-gray-600 hover:text-gray-500"
            }`}
          >
            Reviews (0)
          </button>
        </div>

        {/* Content Area */}
        <div className="pt-6 text-gray-700 leading-relaxed text-sm md:text-base">
          {activeTab === "description" && <p>{product?.description}</p>}

          {activeTab === "additional" && (
            <div className="mt-2 p-1">
              <div className="overflow-x-auto border border-gray-200 rounded-md w-full sm:w-3/4 md:w-2/3">
                <table className="min-w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 font-semibold w-1/4">
                        Available Sizes
                      </th>
                      <td className="p-3 text-gray-700">
                        {product.sizes.map((size) => size?.label).join(", ")}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 font-semibold">Colors</th>
                      <td className="p-3 text-gray-700">
                        {product.colors.map((color) => color?.name).join(", ")}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-left p-3 font-semibold">Category</th>
                      <td className="p-3 text-gray-700">{product?.category}</td>
                    </tr>
                    <tr>
                      <th className="text-left p-3 font-semibold">
                        Base Price
                      </th>
                      <td className="p-3 text-gray-700">${product?.price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="mt-2 border border-gray-300  p-6">
              <p className="text-gray-600 mb-5">There are no reviews yet.</p>

              <h3 className="font-semibold text-xl mb-4">
                Be the first to review{" "}
                <span className="italic">“{product?.title}”</span>
              </h3>
              <p className="text-md text-gray-500 mb-4">
                Your email address will not be published. Required fields are
                marked <span className="text-red-500">*</span>
              </p>

              {/* Rating */}
              <div className="mb-4">
                <div className="flex items-end gap-3">
                  <label className="font-semibold text-xl block mb-1">
                    Your rating <span className="text-black text-lg">*</span>
                  </label>

                  {/* Interactive Stars */}
                  <div className="flex space-x-1 text-2xl cursor-pointer translate-y-2px">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => rating === 0 && setHover(star)}
                        onMouseLeave={() => rating === 0 && setHover(0)}
                        className={`transition-colors ${
                          (hover || rating) >= star
                            ? "text-orange-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Textarea */}
              <div className="mb-5">
                <label className="font-semibold block mb-2">
                  Your review <span className="text-black text-lg">*</span>
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black/15"
                ></textarea>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="font-semibold block mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black/15"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black/15"
                  />
                </div>
              </div>

              {/* Save Info */}
              <div className="flex items-center mb-5">
                <input id="save-info" type="checkbox" className="mr-2" />
                <label htmlFor="save-info" className="text-sm text-gray-600">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="bg-[#e63946] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#d62828] transition"
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      </div>
      <Relatedprodects category={product?.category} />
    </div>
    </>
  );
};

export default Prodectreview;
