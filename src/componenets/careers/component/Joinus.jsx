import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Joinus = () => {
  const jobs = [
    { title: "Graphic Designer – Apparel", location: "Remote or NYC" },
    { title: "Customer Experience Associate", location: "Full-Time, Remote" },
    { title: "Warehouse Coordinator", location: "Los Angeles" },
    { title: "Social Media Manager", location: "Full-Time, Hybrid" },
  ];

  return (
    <section className="bg-[#f7edee] py-20">
      <div className="Mycontainer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Ready to Join Us?
            </h1>
            <p className="text-gray-600 mt-4 text-base sm:text-lg">
              Let’s Make Something Great Together
            </p>
          </div>

          <div className="space-y-6 w-full">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-400 pb-4 hover:text-[#f0243c] transition-all cursor-pointer"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-md">{job.location}</p>
                </div>
                <FaArrowRight className="text-[#f0243c] text-2xl" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
            Don’t see the right role?
          </h3>
          <a
            href="mailto:jobs@velora.com"
            className="text-[#f0243c] font-medium underline underline-offset-4 hover:text-[#d81e35]"
          >
            EMAIL US AT JOBS@VELORA.COM
          </a>
        </div>
      </div>
    </section>
  );
};

export default Joinus;
