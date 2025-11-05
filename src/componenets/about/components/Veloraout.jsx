import React from "react";
import { RiTShirtAirLine } from "react-icons/ri";
import { GiTravelDress } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const features = [
  {
    icon: <RiTShirtAirLine className="w-14 h-14 text-[#f0243c]" />,
    title: "Premium Quality",
    description:
      "Crafted with care using soft, durable fabrics designed to last and feel amazing.",
  },
  {
    icon: <GiTravelDress className="w-14 h-14 text-[#f0243c]" />,
    title: "Timeless Style",
    description:
      "Clean silhouettes and versatile pieces you can wear season after season.",
  },
  {
    icon: <MdDesignServices className="w-14 h-14 text-[#f0243c]" />,
    title: "In-House Design",
    description:
      "Every detail is imagined by our in-house design team to bring you standout staples.",
  },
  {
    icon: <FaUsers className="w-14 h-14 text-[#f0243c]" />,
    title: "For Every Body",
    description:
      "Inclusive fits and sizes designed to flatter all shapes, ages, and styles.",
  },
];

const Veloraout = () => {
  return (
    <div className="py-20 bg-white">
      <div className="Mycontainer text-center">
        <h1 className="text-black font-bold text-3xl sm:text-4xl">
          What Makes Velora Stand Out
        </h1>
        <p className="text-gray-600 mt-3 text-md">
          Style, Comfort & More – Here’s Why You’ll Love Us
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-2xl shadow-sm p-8 h-72 transition hover:shadow-md ${
                index % 2 === 0 ? "sm:-translate-y-6" : "sm:translate-y-6"
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[220px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Veloraout;
