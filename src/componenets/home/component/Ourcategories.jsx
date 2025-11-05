import React from "react";

const Ourcategories = () => {
  return (
    <section className="w-full bg-[#f7edee] py-20">
      <div className="Mycontainer">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900">Our Categories</h1>
          <p className="text-md font-semibold pt-4 text-[#423841]">
            Explore a wide range of styles, handpicked to suit every taste and
            need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 ">
          <div className="relative rounded-4xl shadow-md border border-gray-300">
            <div className="rounded-4xl overflow-hidden border-2 border-black">
              <img
                src="/home-img4.jpg"
                alt="Mens Wear"
                className="w-full h-[420px] object-cover transition-transform duration-500 rounded-2xl"
              />
            </div>

            <div className="absolute z-40 left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-10 py-6 text-center w-[80%] border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Mens Wear</h3>
              <p className="text-red-500 text-sm font-medium mt-1 cursor-pointer hover:underline">
                Shop Now
              </p>
            </div>
          </div>

          <div className="relative rounded-4xl shadow-md border border-gray-300 ">
            <div className="rounded-4xl border-2 border-blackoverflow-hidden">
              <img
                src="/homeimg5.jpg"
                alt="Womens Wear"
                className="w-full h-[420px] object-cover transition-transform duration-500  rounded-4xl"
              />
            </div>

            <div className="absolute z-40 left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-10 py-6 text-center w-[80%] border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Womens Wear</h3>
              <p className="text-red-500 text-sm font-medium mt-1 cursor-pointer hover:underline">
                Shop Now
              </p>
            </div>
          </div>

          <div className="relative rounded-4xl shadow-md border border-gray-300">
            <div className="rounded-4xl border-2 border-black overflow-hidden">
              <img
                src="/home-img6.jpg"
                alt="Accessories"
                className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105 rounded-4xl"
              />
            </div>

            <div className="absolute z-40 left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-10 py-6 text-center w-[80%] border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Accessories</h3>
              <p className="text-red-500 text-sm font-medium mt-1 cursor-pointer hover:underline">
                Shop Now
              </p>
            </div>
          </div>

          <div className="relative rounded-4xl shadow-md border border-gray-300">
            <div className="rounded-4xl border-2 border-black overflow-hidden">
              <img
                src="/home-7.jpg"
                alt="Kids Wear"
                className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105 rounded-4xl"
              />
            </div>

            <div className="absolute z-40 left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-10 py-6 text-center w-[80%] border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Kids Wear</h3>
              <p className="text-red-500 text-sm font-medium mt-1 cursor-pointer hover:underline">
                Shop Now
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ourcategories;
