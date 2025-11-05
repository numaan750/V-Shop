import React from "react";
import { ShoppingCart, Palette } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <img
        src="/hero-img1.jpg"
        alt="Hero"
        className="w-full object-cover h-full"
      />

      <div className="absolute inset-0 bg-black/80 bg-opacity-60"></div>

      <div className="Mycontainer absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1
          className="mb-4 max-w-4xl leading-tight"
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontStyle: "normal",
            fontWeight: 800,
            color: "rgb(255, 255, 255)",
            fontSize: "clamp(32px, 5vw, 60px)", 
            lineHeight: "clamp(40px, 6vw, 72px)", 
          }}
        >
          Timeless Fashion for the Modern Wardrobe
        </h1>

        <p
          className="mb-8 text-center mx-auto"
          style={{
            fontFamily: "Inter, sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            color: "rgb(255, 255, 255)",
            fontSize: "clamp(14px, 2vw, 20px)", 
            lineHeight: "clamp(22px, 3vw, 26px)", 
            maxWidth: "550px",
          }}
        >
          Discover timeless fashion for Men, Women, and Kids – crafted for
          comfort, designed for confidence.
        </p>

        <button
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "clamp(14px, 2vw, 16px)",
            lineHeight: "26px",
            color: "rgb(255, 255, 255)",
          }}
          className="bg-[#f0243c] hover:bg-[#ff334b] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all"
        >
          EXPLORE THE COLLECTION
        </button>
      </div>

      {/* Fixed Buttons (Right Side)
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col gap-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-lg transition-all">
            <ShoppingCart className="w-5 h-5" />
            Buy Now
          </button>
          <button className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-md shadow-lg transition-all">
            <Palette className="w-5 h-5" />
            Customize
          </button>
        </div> */}
    </div>
  );
};

export default Hero;
