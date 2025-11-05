import React from "react";

const Abouthero = () => {
  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] flex items-center justify-center">
      <img
        src="/about-1.jpg"
        alt="About Hero"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="Mycontainer absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1
          className="font-extrabold mb-4 leading-tight text-white"
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontSize: "clamp(32px, 5vw, 60px)",
            lineHeight: "clamp(42px, 6vw, 70px)",
            maxWidth: "800px",
            textAlign: "center",
          }}
        >
          Style That Moves <br className="hidden sm:block" /> With You
        </h1>

        <p
          className="text-white text-center mx-auto"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 2vw, 20px)",
            lineHeight: "clamp(22px, 3vw, 28px)",
            maxWidth: "600px",
          }}
        >
          Born from a passion for timeless design and everyday comfort.
        </p>
      </div>
    </div>
  );
};

export default Abouthero;
