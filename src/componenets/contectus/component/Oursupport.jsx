import React from "react";

const Oursupport = () => {
  return (
    <section className="bg-[#f7edee] w-full py-16 sm:py-20">
      <div className="Mycontainer flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight max-w-lg mx-auto">
          Explore Our Support Topics
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-lg mb-10">
          From returns and shipping to sizing and payments, we’ve got answers to
          all your most common questions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <div className="bg-white rounded-3xl p-8 py-16 px-10 text-left shadow-sm min-h-[250px]">

            <h3 className="font-bold text-gray-900 text-lg mb-5">Returns & Exchanges</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  How to Start a Return
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Check Return Status
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 py-16 px-10 text-left shadow-sm min-h-[250px]">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Ordering & Payment</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Modify or Cancel an Order
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Pre-order Items
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Payment Methods
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 py-16 px-10 text-left shadow-sm min-h-[250px]">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Shipping & Delivery</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Shipping Options & Costs
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Estimated Delivery Times
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 py-16 px-10 text-left shadow-sm min-h-[250px]">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Product Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Materials & Fabrics
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Care Instructions
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Availability & Restocks
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 py-16 px-10 text-left shadow-sm min-h-[250px]">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Account & Privacy</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Create or Manage Your Account
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Password Reset Help
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 py-16 px-10 text-left shadow-sm min-h-[250px]">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Sizing & Fit</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Fit Tips & Recommendations
                </a>
              </li>
              <li>
                <a href="#" className="text-black underline decoration-black hover:decoration-[#f0243c]">
                  Product Measurements
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Oursupport;
