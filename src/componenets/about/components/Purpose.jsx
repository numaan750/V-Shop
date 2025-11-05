import React from "react";
import { FaEye, FaBullseye } from "react-icons/fa";

const Purpose = () => {
  return (
    <section className="bg-white py-20">
      <div className="Mycontainer text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Our Purpose, Your Style
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-14">
          At Velora, everything we create starts with you — your lifestyle, your confidence,
          and your need for fashion that truly fits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-stretch">
          <div className="bg-white border border-gray-300 rounded-2xl  p-10 flex flex-col items-center text-center md:-translate-y-6">
            <div className="bg-[#f0243c] text-white w-16 h-16 flex items-center justify-center rounded-full mb-6">
              <FaEye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              To create timeless, high-quality fashion that blends comfort with confidence.
              We’re here to empower individuals of all ages and body types with clothing that
              fits seamlessly into real life — versatile, inclusive, and made to be lived in.
              We design with purpose, craft with care, and always put people first.
            </p>
          </div>

          <div className="bg-white border border-gray-300 rounded-2xl p-10 flex flex-col items-center text-center md:translate-y-6">
            <div className="bg-[#f0243c] text-white w-16 h-16 flex items-center justify-center rounded-full mb-6">
              <FaBullseye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              To become a trusted, global fashion destination that redefines modern essentials.
              We envision a world where style is accessible, self-expression is celebrated,
              and fashion feels effortless for everyone — from city streets to family weekends.
              At Velora, we aim to lead with creativity, integrity, and a deep understanding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Purpose;
