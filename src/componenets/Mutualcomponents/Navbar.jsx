"use client";
import React, { useState, useContext } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "../user/LoginModal";
import CartDrawer from "../user/CartDrawer";
import { AuthContext } from "@/context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleUserClick = () => {
    if (user) {
      // if logged in → go to profile page
      router.push("/profile");
    } else {
      // if not logged in → open login popup
      setIsLoginOpen(true);
    }
  };

  const { items, guestCart } = useSelector((state) => state.cart);

  // 🧠 Use whichever cart is active
  const cartItems = items.length > 0 ? items : guestCart;

  // 🔢 Count unique products (ignore quantity)
  const productCount = cartItems.length;

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="w-full border-b bg-white text-black relative z-50">
      <div className="Mycontainer mx-auto flex justify-between items-center py-1 relative">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <img
            src="/navbar-logo.svg"
            alt="logo"
            width={140}
            height={140}
            className="cursor-pointer"
          />
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex gap-8 text-md font-semibold flex-1 justify-center"
          style={{ minWidth: "fit-content" }}
        >
          {[
            ["Home", "/home"],
            ["Shop", "/shop"],
            ["Blog", "/blog"],
            ["About", "/aboutus"],
            ["Careers", "/careers"],
            ["FAQ’s", "/faq"],
            ["Contact", "/contectus"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`${
                pathname === href ? "text-red-600" : "hover:text-red-600"
              }`}
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "80px",
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={handleUserClick}>
            <User className="w-6 h-6 cursor-pointer hover:text-red-600 transition-colors duration-200" />
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-red-600 transition-colors duration-200" />

            {productCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                {productCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden border-2 border-red-600 p-2 rounded-md text-red-600"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ✅ Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-start pt-10 transition-all duration-500">
          {/* Menu Content Box */}
          <div className=" text-black w-11/12 max-w-md rounded-lg shadow-lg p-6 flex flex-col space-y-5 relative">
            {/* ❌ Close Button */}
            <button
              className="absolute top-4 right-4 text-white  hover:text-red-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              <X size={26} />
            </button>

            {/* Menu Links */}
            <nav className="flex flex-col text-white items-start space-y-4 mt-6">
              <a
                href="/home"
                onClick={handleCloseMenu}
                className="hover:text-red-600 font-semibold"
              >
                Home
              </a>
              <a
                href="/shop"
                onClick={handleCloseMenu}
                className="hover:text-red-600 font-semibold"
              >
                Shop
              </a>
              <a
                href="/blog"
                onClick={handleCloseMenu}
                className="hover:text-red-600 font-semibold"
              >
                Blog
              </a>
              <a
                href="/aboutus"
                onClick={handleCloseMenu}
                className="hover:text-red-600 font-semibold"
              >
                About
              </a>
              <a
                href="/careers"
                onClick={handleCloseMenu}
                className="hover:text-red-600 font-semibold"
              >
                Careers
              </a>
              <a
                href="/faq"
                onClick={handleCloseMenu}
                className="hover:text-red-600 font-semibold"
              >
                FAQ’s
              </a>
              <a
                href="/contectus"
                onClick={handleCloseMenu}
                className="hover:text-red-600 font-semibold"
              >
                Contact
              </a>
            </nav>

            {/* Center Icons */}
            <div className="flex justify-center items-center w-full gap-8 pt-6 border-t border-gray-300 mt-4">
              <button
                onClick={() => {
                  handleUserClick();
                  handleCloseMenu();
                }}
              >
                <User className="w-6 h-6 cursor-pointer hover:text-red-600 text-white transition-colors duration-200" />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(true);
                  handleCloseMenu();
                }}
                className="relative"
              >
                <ShoppingCart className="w-6 h-6 cursor-pointer text-white hover:text-red-600 transition-colors duration-200" />
                {productCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                    {productCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discount Bar */}
      <div
        className="w-full bg-black text-white text-center text-md py-3"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "15px",
          lineHeight: "24px",
        }}
      >
        Get 15% off on your first order
      </div>

      {/* Popups */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;
