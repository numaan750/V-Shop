import React from "react";
import { FaCheck } from "react-icons/fa";

const Benefits = () => {
  const benefits = [
    {
      title: "Employee Discounts",
      desc: "Enjoy exclusive discounts & more on Velora styles.",
    },
    {
      title: "Flexible Work",
      desc: "Choose remote, hybrid, or in-office roles that suit your lifestyle.",
    },
    {
      title: "Career Growth",
      desc: "Learn, grow, and thrive with clear paths to advancement.",
    },
    {
      title: "Wellness Support",
      desc: "Prioritize well-being with access to wellness tools.",
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="Mycontainer text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Perks & Benefits
        </h1>
        <p className="text-gray-600 mt-4 text-base sm:text-lg">
          Where Great Work Meets Great Rewards
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-18">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-start text-start px-3"
            >
              <div className="bg-[#f0243c] rounded-full p-4 flex items-center justify-center w-16 h-16 mb-4">
                <FaCheck className="text-white text-xl" />
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                {benefit.title}
              </h3>

              <p className="text-gray-600 mt-2 text-md leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
