import React from "react";
import { GiRolledCloth } from "react-icons/gi";

const VeloraClothing = () => {
  return (
    <section className="relative bg-[#fceeee] py-20 overflow-hidden">
      <div className="Mycontainer relative flex flex-col md:flex-row items-center justify-start">
        <div className="relative w-full md:w-[70%]">
          <img
            src="/about-2.jpg"
            alt="Fashion group"
            className="rounded-lg object-cover w-100px h-[450px] sm:h-[400px] md:h-[450px]"
          />

          <div
            className="
              absolute 
              md:right-[-200px] md:bottom-[-60px] 
              bg-white shadow-lg rounded-2xl p-6 sm:p-8 
              w-[90%] sm:w-[380px] md:w-[420px] 
              text-center border border-gray-200
              
              /* Responsive positioning */
              md:absolute 
              md:block 
              hidden
            "
          >
            <GiRolledCloth className="w-14 h-14 text-[#f0243c] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              More Than Just Clothing
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              At Velora, we believe fashion should feel as good as it looks. Born
              from a passion for timeless design and everyday comfort, our
              mission is simple: to create versatile, high-quality clothing that
              empowers confidence — for everyone, every day.
              <br />
              <br />
              Whether you're dressing up for a moment or down for the everyday,
              our collections are made to move with you, evolve with your
              lifestyle, and elevate your wardrobe — effortlessly.
            </p>
          </div>
        </div>

        {/* Mobile / Tablet View Card */}
        <div
          className="
            md:hidden 
            mt-8 bg-white shadow-lg rounded-2xl p-6 sm:p-8 
            w-full sm:w-[90%] text-center border border-gray-200
          "
        >
          <GiRolledCloth className="w-14 h-14 text-[#f0243c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            More Than Just Clothing
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            At Velora, we believe fashion should feel as good as it looks. Born
            from a passion for timeless design and everyday comfort, our
            mission is simple: to create versatile, high-quality clothing that
            empowers confidence — for everyone, every day.
            <br />
            <br />
            Whether you're dressing up for a moment or down for the everyday,
            our collections are made to move with you, evolve with your
            lifestyle, and elevate your wardrobe — effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VeloraClothing;
