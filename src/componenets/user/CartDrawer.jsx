"use client";
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const CartDrawer = ({ isOpen, onClose, cartItems = [] }) => {
  const router = useRouter();
  const hasItems = cartItems.length > 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleNavigate = (path) => {
    onClose(); 
    setTimeout(() => {
      router.push(path);
    }, 300); 
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 m z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[24rem] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {!hasItems && (
          <div className="flex flex-col justify-between h-full px-6 pb-8">
            <div></div>
            <div className="text-center mb-8">
              <p className="text-gray-500 mb-8">No products in the cart.</p>
              <button
                onClick={() => handleNavigate("/shop")}
                className="w-full mb-8 bg-[#f0243c] text-white py-3 rounded-full font-semibold hover:bg-[#ff334b] transition"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}

        {/* Filled Cart */}
        {hasItems && (
          <div className="flex flex-col h-full justify-between">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4 border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </p>
                      <p className="text-gray-600 text-xs">{item.variant}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center border mt-1 w-fit">
                        <button className="px-2 py-1 text-sm">−</button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button className="px-2 py-1 text-sm">+</button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-800 font-medium text-sm">
                      ₹{item.price}
                    </p>
                    <button className="text-gray-400 hover:text-red-600 text-xs mt-1">
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4">
              <div className="flex justify-between text-gray-700 font-medium mb-3">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => handleNavigate("/cart")}
                className="w-full bg-[#f0243c] text-white py-3 rounded-full font-semibold hover:bg-[#ff334b] transition mb-2"
              >
                VIEW CART
              </button>
              <button
                onClick={() => handleNavigate("/checkout")}
                className="w-full bg-[#f0243c] text-white py-3 rounded-full font-semibold hover:bg-[#ff334b] transition"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
