import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Growcareer = () => {
  return (
    <section className="py-25 bg-white">
      <div className="Mycontainer grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
        <div className="flex justify-center">
          <img
            src="/career-1.jpg"
            alt="Grow your career"
            className="w-full h-auto max-w-xl rounded-2xl object-cover"
          />
        </div>

        <div className="text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Grow Your Career with Us
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Whether you’re helping a customer find their perfect fit or
            designing our next best-selling piece, your work matters here. We
            value creativity, collaboration, and people who bring fresh ideas to
            the table.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-10">
            {["Fun", "Flexibility", "ESPOS", "Growth"].map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <FaCheckCircle className="text-[#f0243c] w-5 h-5" />
                <span className="text-gray-700 text-sm sm:text-base font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <button className="bg-[#f0243c] hover:bg-[#ff334b] text-white font-semibold px-8 py-3 rounded-full transition-all duration-200">
            VIEW OPEN POSITIONS
          </button>
        </div>
      </div>
    </section>
  );
};

export default Growcareer;
