"use client";
import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full">
      <div className="Mycontainer py-20 grid grid-cols-1 lg:grid-cols-5 gap-10 text-left">
        <div className="col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src="/footer-logo.svg" alt="Velora" width={140} height={140} />
          </div>
          <p
            className="text-white px-3 text-md sm:px-0"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "26px",
              color: "rgb(255, 255, 255)",
            }}
          >
            Classic looks for Men, Women & Kids.
          </p>

          <div className="flex gap-4 mt-2 px-3 sm:px-0">
            <a href="#" className="hover:text-[#ff3430]">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-[#ff3430]">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-[#ff3430]">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-[#ff3430]">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div className="sm:pl-3">
          <h3
            className="font-bold text-md mb-7"
            style={{
              fontFamily: '"Source Sans 3", sans-serif',
              fontWeight: 800,
              fontSize: "18px",
              lineHeight: "22px",
              color: "rgb(255, 255, 255)",
            }}
          >
            Quick Links
          </h3>
          <ul className="space-y-2 text-white text-md">
            <li>
              <a
                href="/home"
                className="text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                  color: "rgb(255, 51, 76)",
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/shop"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="/aboutus"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contectus"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="sm:pl-3">
          <h3
            className="font-bold text-md mb-7"
            style={{
              fontFamily: '"Source Sans 3", sans-serif',
              fontWeight: 800,
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            Shop
          </h3>
          <ul className="space-y-2 text-white text-md">
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Mens Wear
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Womens Wear
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Kids Wear
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Accessories
              </a>
            </li>
          </ul>
        </div>

        <div className="sm:pl-3">
          <h3
            className="font-bold text-md mb-7"
            style={{
              fontFamily: '"Source Sans 3", sans-serif',
              fontWeight: 800,
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            Help
          </h3>
          <ul className="space-y-2 text-white text-md">
            <li>
              <a
                href="/faq"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                FAQ’s
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Return Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Order Status
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Shipping & Delivery
              </a>
            </li>
          </ul>
        </div>

        <div className="sm:pl-3">
          <h3
            className="font-bold text-md mb-7"
            style={{
              fontFamily: '"Source Sans 3", sans-serif',
              fontWeight: 800,
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            My Profile
          </h3>
          <ul className="space-y-2 text-white text-md">
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                My Account
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Track Order
              </a>
            </li>
            <li>
              <a
                href="/cancel"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                My Cart
              </a>
            </li>
            <li>
              <a
                href="/success"
                className="hover:text-[#ff3430]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "16px",
                }}
              >
                Order History
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="Mycontainer border-t border-white w-full"></div>

      <div className="Mycontainer py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p
          className="text-white text-md font-semibold text-center md:text-left"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "26px",
          }}
        >
          Copyright © 2025 Clothing Store. All rights reserved.
        </p>

        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <Image
            src="/footer-copywrite-img.svg"
            alt="Payments"
            width={270}
            height={180}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
