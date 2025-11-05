import React from "react";

const Designed = () => {
  return (
<section className=" flex flex-col md:flex-row">
  <div className="bg-black text-white flex flex-col justify-center w-full md:w-1/2">
    <div className="px-8 sm:px-10 md:px-16 lg:px-24 py-16 md:py-0">
      <h1 className="Mycontainer text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
        Thoughtfully Designed for All
      </h1>

      <p className="Mycontainer not-odd:text-gray-300 text-base sm:text-lg leading-relaxed">
        Our range covers Men, Women, and Kids, with each piece carefully
        crafted to combine form, function, and feeling. From the perfect polo
        to the softest loungewear and statement outerwear, everything at
        Velora is designed with real life in mind — easy to wear, easy to
        love.
        <br />
        <br />
        We also believe in the power of details. That’s why we obsess over
        fit, fabric, and finish — so you don’t have to.
      </p>
    </div>
  </div>

  <div className=" md:w-1/2 h-[400px] md:h-auto">
    <img
      src="/about-3.jpg"
      alt="Designed for all"
      className=" w-full h-full object-cover items-center"
    />
  </div>
</section>

  );
};

export default Designed;
