"use client";
import React, { useState } from "react";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Flowline Dresses - Extra Large, Green",
      price: 250,
      quantity: 1,
      image: "/shop-2.jpg", // Replace with actual image URL
    },
  ]);
  const [step, setStep] = useState("cart");

  const suggestedProducts = [
    {
      id: 1,
      name: "Funky Hoodie",
      category: "Men",
      priceRange: "₹120.00 – ₹125.00",
      image: "/related-img.jpg",
    },
    {
      id: 2,
      name: "T Jacket Combo",
      category: "Men",
      priceRange: "₹200.00 – ₹210.00",
      image: "/related-img2.jpg",
    },
  ];

  const incrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="py-15">
      <div className="Mycontainer">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-loose">
          Cart
        </h1>

        {/* Progress steps */}
        <div className="flex items-center space-x-2 text-lg md:text-xl lg:text-4xl justify-center mb-7">
          <button
            onClick={() => setStep("cart")}
            className={`font-bold cursor-pointer ${
              step === "cart" ? "text-red-500" : "text-gray-400"
            }`}
          >
            1 Shopping Cart
          </button>

          <span className="text-gray-400">›</span>

          <button
            onClick={() => setStep("checkout")}
            className={`font-bold cursor-pointer ${
              step === "checkout" ? "text-red-500" : "text-gray-400"
            }`}
          >
            2 Checkout details
          </button>

          <span className="text-gray-400">›</span>

          <span
            className={`font-bold cursor-pointer ${
              step === "complete" ? "text-red-500" : "text-gray-400"
            }`}
          >
            3 Order Complete
          </span>
        </div>

        {step === "cart" && (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1 bg-white p-5 ">
              <table className="w-full text-left border-collapse border border-gray-300">
                {/* Table Header */}
                <thead className="bg-[#f7edee] border-b border-gray-300">
                  <tr>
                    <th className="py-5 px-50 text-left ">Product</th>
                    <th className="py-5 px-2 text-left">Price</th>
                    <th className="py-5 px-2 text-left">Quantity</th>
                    <th className="py-5 px-2 text-left">Subtotal</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b border-[#f7edee]">
                      <td className="py-2 flex items-center gap-11 pl-5">
                        {/* X button on left */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400  hover:text-gray-900 cursor-pointer  border rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          ✕
                        </button>

                        {/* Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />

                        {/* Product Name */}
                        <span className="text-xl max-w-xs text-black hover:text-red-500 cursor-pointer">
                          {item.name}
                        </span>
                      </td>
                      <td className="py-2 text-md">₹{item.price.toFixed(2)}</td>
                      <td className="py-2 flex items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="px-2 py-1 border rounded cursor-pointer"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="px-2 py-1 border rounded cursor-pointer"
                        >
                          +
                        </button>
                      </td>
                      <td className="py-2 text-md">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Suggested Products */}
              <div className="mt-5 bg-rose-50 p-3 rounded">
                <h2 className="font-bold mb-2">You may be interested in…</h2>
                <div className="flex flex-col gap-3">
                  {suggestedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between gap-3 bg-white p-2 "
                    >
                      <div className="relative flex items-center gap-5 pl-2">
                        {/* Sale Badge */}
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow z-10">
                          SALE
                        </span>

                        <div className="relative group">
                          {/* Product Image */}
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-30 h-30 object-cover rounded"
                          />

                          {/* Eye Icon: show only when hovering image */}
                          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Eye Icon container with its own hover for tooltip */}
                            <div className="relative">
                              {/* Eye Icon */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-black bg-white rounded-full cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>

                              {/* Tooltip: shows only when hovering the eye icon */}
                              <div className="absolute right-full mr-2 bottom-1/2 transform translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                                Quick View
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div>
                          <p className="text-black hover:text-red-600 font-semibold text-xl cursor-pointer mb-2">
                            {prod.name}
                          </p>
                          <p className="text-gray-400 text-lg">
                            {prod.category}
                          </p>
                        </div>
                      </div>

                      <span className="font-semibold text-lg text-gray-600 ">
                        {prod.priceRange}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="w-full lg:w-1/3 bg-white rounded shadow h-[400] mt-6">
              {/* Header */}
              <h2 className="text-4xl items-center font-bold mb-5 bg-[#f8ecee] p-9 rounded-t">
                Cart totals
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between py-3 px-5 border-b">
                <span className="text-gray-700 text-lg">Subtotal</span>
                <span className="text-gray-900 font-medium text-lg">
                  ₹{subtotal}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between py-3 px-5 border-b font-bold text-lg">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

              {/* Coupon & Checkout */}
              <div className="px-5 mt-5">
                <p className="mb-3 text-gray-700">Have a coupon?</p>
                <button
                  onClick={() => setStep("checkout")}
                  className="bg-red-500 hover:bg-red-600 text-white py-5 w-[50%] rounded-full text-sm font-semibold transition"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8 py-15 ">
            {/* Left Section - Customer & Billing Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Information */}
              <div>
                <h2 className="inline-block text-4xl font-bold mb-4 pb-5 border-b-2 border-[#d1d1d1]">
                  Customer information
                </h2>
                <input
                  type="email"
                  placeholder="Username or Email Address *"
                  className="w-full border rounded p-2 mt-3 hover:border-[#e67070]  focus:outline-none transition duration-200"
                />
              </div>

              {/* Billing Details */}
              <div>
                <h2 className="inline-block text-4xl font-bold mb-7 pb-5 border-b-2 border-[#d1d1d1]">
                  Billing details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First name *"
                    className="border rounded border-gray-300 p-2 mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Last name *"
                    className="border rounded border-gray-300 p-2  mb-3"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company name"
                  className="border rounded border-gray-300 p-2 w-full mt-3  mb-3"
                />
                <select className="border rounded border-gray-300 p-2 w-full mt-3">
                  <option>India</option>
                </select>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <input
                    type="text"
                    placeholder="House number and street name *"
                    className="border rounded border-gray-300 p-2 mt-3"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="border rounded border-gray-300 p-2 mt-3"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <input
                    type="text"
                    placeholder="Town / City *"
                    className="border rounded border-gray-300 p-2  mt-3"
                  />
                  <select className="border rounded border-gray-300 p-2 mt-3">
                    <option className="mt-3">Maharashtra</option>
                  </select>
                  <input
                    type="text"
                    placeholder="PIN Code *"
                    className="border rounded border-gray-300 p-2  mt-3"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone *"
                  className="border rounded border-gray-300 p-2 w-full mt-5"
                />
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="inline-block text-4xl font-bold mb-4 pb-5 border-b-2 border-[#d1d1d1]">
                  Additional information
                </h2>
                <textarea
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="border border-gray-300 rounded p-2 w-full h-20"
                />
                <p className="mt-5 text-lg text-gray-500">Have a coupon?</p>
              </div>

              {/* Payment Section */}
              <div className="mt-10">
                {/* Heading */}
                <h2 className="text-4xl font-bold mb-10">Payment</h2>

                {/* Payment Box */}
                <div className="pl-15 max-w-3xl">
                  <div className="border-t border-black bg-gray-50 p-4">
                    <p className="text-gray-700 text-xl leading-relaxed flex items-start">
                      <input
                        type="checkbox"
                        className="mr-3 mt-1 accent-black cursor-pointer"
                      />
                      Sorry, it seems that there are no available payment
                      methods. Please contact us if you require assistance or
                      wish to make alternate arrangements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <div className="pl-15 max-w-3xl">
                <button
                  onClick={() => setStep("complete")}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold transition mt-4"
                >
                  PLACE ORDER ₹{subtotal.toFixed(2)}
                </button>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => setStep("cart")}
                  className="text-sm text-gray-600 underline cursor-pointer hover:text-gray-800"
                >
                  &lt; Back to Cart
                </button>
              </div>
            </div>

            {/* Right Section - Order Summary */}
            {/* Right Section - Order Summary */}
            <div className="bg-white rounded shadow h-fit mt-20">
              <h2 className="text-3xl font-bold mb-5 p-5 rounded-t">
                Your order
              </h2>
              <div className="px-5">
                <div className="flex justify-between items-center py-2 pb-5 border-b-2 border-gray-300 mb-6">
                  <span className="font-medium text-gray-700">Product</span>
                  <span className="font-medium text-gray-700">Subtotal</span>
                </div>

                {/* Product Row */}
                <div className="flex justify-between items-center pb-5 py-2 border-b-2 border-gray-300">
                  <div className="flex items-start space-x-2">
                    {/* <!-- Image + Quantity --> */}
                    <div className="flex flex-col items-start">
                      <img
                        src="/shop-2.jpg"
                        alt="Product"
                        className="w-15 h-15 rounded object-cover"
                      />
                      <span className="text-gray-500 text-sm mt-1">× 1</span>
                    </div>

                    {/* <!-- Product Name --> */}
                    <p className="text-md leading-tight">
                      Flowline Dresses - Extra Large, Green
                    </p>
                  </div>
                  <span>₹250.00</span>
                </div>

                {/* Totals */}
                <div className="flex justify-between py-3 border-b-2 pb-5 border-gray-300">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900 font-medium">₹250.00</span>
                </div>
                <div className="flex justify-between py-3 font-bold">
                  <span>Total</span>
                  <span>₹250.00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded shadow-md mt-10">
            {/* Success Icon */}
            <div className="text-green-500 text-7xl mb-5">✅</div>

            {/* Heading */}
            <h1 className="text-4xl font-bold mb-3 text-gray-800">
              Thank you! Your order has been received.
            </h1>

            {/* Order Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-5 w-full max-w-3xl text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center border-b border-gray-300 pb-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm uppercase">
                    Order Number
                  </p>
                  <p className="text-lg font-semibold">#1234</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm uppercase">Date</p>
                  <p className="text-lg font-semibold">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm uppercase">Total</p>
                  <p className="text-lg font-semibold">
                    ₹{subtotal.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm uppercase">
                    Payment Method
                  </p>
                  <p className="text-lg font-semibold">Cash on Delivery</p>
                </div>
              </div>

              {/* Order Summary */}
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Product</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t font-bold">
                    <td className="py-3 px-4">Total</td>
                    <td></td>
                    <td className="py-3 px-4">₹{subtotal.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => setStep("cart")}
              className="mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
