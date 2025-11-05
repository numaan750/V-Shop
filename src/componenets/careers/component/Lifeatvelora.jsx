import React from "react";

const Lifeatvelora = () => {
  return (
    <section className="bg-[#f7edee] py-16">
      <div className="Mycontainer text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Life at Velora
        </h2>

        <p className="text-gray-700 max-w-4xl mx-auto text-base sm:text-lg leading-relaxed mb-12">
          Get a behind-the-scenes look at what it’s like to work at Velora. From
          collaborative design sessions to launch-day celebrations, we believe
          in doing great work — and enjoying the journey along the way.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 place-items-center">
          <div className="w-full max-w-[450px] lg:max-w-full">
            <img
              src="/career-2.png"
              alt="Left"
              className="rounded-2xl border-2 object-cover w-full h-[550px] object-center"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full">
              <img
                src="/career-3.png"
                alt="Center Top"
                className="rounded-2xl border-2 object-cover w-[450px] h-[260px] object-center"
              />
            </div>
            <div className="w-full">
              <img
                src="/career-4.png"
                alt="Center Bottom"
                className="rounded-2xl border-2 object-cover w-[450px] h-[260px] object-center"
              />
            </div>
          </div>

          <div className="w-full max-w-[450px] lg:max-w-full">
            <img
              src="/career-5.png"
              alt="Right"
              className="rounded-2xl border-2 object-cover w-full h-[550px] object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifeatvelora;
