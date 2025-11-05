import React from "react";

const Reviews = () => {
  const reviews = [
    {
      text: `“Velora has completely transformed how I shop for clothes. Every piece feels thoughtfully designed and incredibly comfortable — from their polos to their jackets. It’s rare to find a brand that gets the fit, style, and quality right every single time.”`,
      name: "Jessica M.",
      location: "San Diego",
      img: "/avatar1.png",
    },
    {
      text: `“I’m always looking for clean, versatile styles I can wear to work or on the weekends — and Velora delivers. I picked up a few items from their Men’s collection and was blown away by the craftsmanship. The trousers, especially, have become my go-to.”`,
      name: "Darren L.",
      location: "New York",
      img: "/avatar2.png",
    },
    {
      text: `“Shopping for myself and my daughter usually means bouncing between stores, but Velora made it easy. I loved the quality of the dresses I ordered, and my daughter adored her Mini Mode pieces. Stylish, comfortable, and built to last — we’re both fans for life!”`,
      name: "Michelle T.",
      location: "Chicago",
      img: "/avatar3.png",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-16 bg-white">
      <div className="Mycontainer">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            What Our Shoppers Say
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Store that nails fashion and comfort.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-9 md:gap-9">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`bg-[#f7edee] rounded-2xl shadow-sm p-6 md:p-8 max-w-sm w-full text-left transition-all duration-300 ${
                i === 1 ? "md:translate-y-8" : "md:translate-y-0"
              }`}
            >
              <div className="text-rose-500 text-7xl mb-6">“”</div>
              <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
                {r.text}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900">
                    {r.name}, <span className="font-normal">{r.location}</span>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
