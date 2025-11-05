import React from "react";
import { ShoppingBag, Clock, ClipboardCheck } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="py-25 px-6 sm:px-10 w-full bg-[#f7edee]">
      <div className="Mycontainer mx-auto">
        <div className="flex flex-col justify-center items-center text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
            How It Works
          </h1>
          <p className="text-gray-700 mt-2 text-sm sm:text-base">
            Just Pick, Pack and Ship
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm flex flex-col md:flex-row ">
          <div className="flex-1 relative flex flex-row md:flex-col lg:flex-row items-start md:items-center text-left md:text-center lg:text-left p-8 gap-4">
            <div className="w-16 h-16 border-2 border-[#f0243c] rounded-full flex items-center justify-center shrink-0">
              <ShoppingBag className="text-[#f0243c]" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Shop Styles
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Browse our curated collections for Men, Women, Kids &
                Accessories.
              </p>
            </div>

            <span className="hidden md:block absolute top-1/2 right-0 h-20 -translate-y-1/2 border-r border-gray-300"></span>
          </div>

          <div className="flex-1 flex flex-row md:flex-col lg:flex-row items-start md:items-center text-left md:text-center lg:text-left p-8 gap-4 relative">
            <div className="w-16 h-16 border-2 border-[#f0243c] rounded-full flex items-center justify-center shrink-0">
              <Clock className="text-[#f0243c]" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Pick Your Fit
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Find your perfect size with our detailed fit guides and style
                notes for every piece.
              </p>
            </div>

            <span className="hidden md:block absolute top-1/2 right-0 h-20 -translate-y-1/2 border-r border-gray-300"></span>
          </div>

          <div className="flex-1 flex flex-row md:flex-col lg:flex-row items-start md:items-center text-left md:text-center lg:text-left p-8 gap-4">
            <div className="w-16 h-16 border-2 border-[#f0243c] rounded-full flex items-center justify-center shrink-0">
              <ClipboardCheck className="text-[#f0243c]" size={28} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Checkout Fast
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Enjoy a quick and secure checkout experience with flexible
                payment options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
