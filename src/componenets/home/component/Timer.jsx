"use client";

import React, { useEffect, useState } from "react";

export default function HeroWithOverlayAndLiveTimer({ targetDate }) {
  // const defaultTarget = new Date(Date.now() + 14 * 60 * 60 * 1000); 
const target = React.useMemo(
    () => {
      if (targetDate) return new Date(targetDate);
      // Agar targetDate nahi diya, to abhi se 24 hours baad set karo
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 24);
      return futureDate;
    },
    [targetDate]
  );

  const calcRemaining = (to) => {
    const total = Math.max(0, new Date(to) - new Date());
    const sec = Math.floor((total / 1000) % 60);
    const min = Math.floor((total / 1000 / 60) % 60);
    const hrs = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hrs, min, sec };
  };

  const [timeLeft, setTimeLeft] = useState(calcRemaining(target));

  useEffect(() => {
    setTimeLeft(calcRemaining(target));

    const id = setInterval(() => {
      const remaining = calcRemaining(target);
      setTimeLeft(remaining);
      
      // ✅ Agar timer khatam ho gaya, to reset kar do
      if (remaining.total === 0) {
        // Timer ko dobara 24 hours ke liye set karo
        const newTarget = new Date();
        newTarget.setHours(newTarget.getHours() + 24);
        setTimeLeft(calcRemaining(newTarget));
      }
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  const fmt = (n) => String(n).padStart(2, "0");

  return (
    <>
      <div className="relative w-full bg-[#f7edee] flex items-center justify-start h-screen">
        <div className="w-[80%] h-full hidden md:block">
          <img
            src="/hero-img1.jpg"
            alt="Exclusive Jacket"
            className="w-full h-full object-fill"
          />
        </div>
        <div
          className="
            bg-white rounded-2xl shadow-lg p-10 w-full max-w-[550px] mx-auto
            md:absolute md:left-[58%] md:top-1/2 md:-translate-y-1/2 md:w-[35%] md:mx-0
          "
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            The Exclusive Jackets - Starting at just $40
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#42383b] mb-6">
            Crafted for comfort, designed for impact — this is the outerwear
            piece that’s redefining everyday style. Our best-selling jacket
            brings warmth, versatility, and edge to any outfit.
          </p>
          <button className="rounded-full bg-[#f0243c] hover:bg-[#ff334b] text-white px-6 py-4 font-semibold">
            Shop the Exclusive Jacket
          </button>
        </div>
      </div>

      <div className="w-full h-screen relative m-0 p-0 overflow-hidden">
        <img
          src="/home-img10.jpg"
          alt="Full Screen New Image"
          className="w-full h-full object-cover block"
        />

        <div className="absolute inset-0 bg-black/55"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent pointer-events-none"></div>

        <div className="absolute inset-0 z-30 flex items-center justify-center">
  <div className="text-center max-w-5xl px-4 sm:px-6">
    <h1 className="text-white font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">
      Hurry Up! Get Up to 50% Off
    </h1>

    <p className="mt-4 sm:mt-6 text-white text-xs sm:text-sm md:text-lg lg:text-xl">
      Step into summer with sun-ready styles at can't-miss prices.
    </p>

    <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
      {[
        { value: fmt(timeLeft.days), label: "DAYS" },
        { value: fmt(timeLeft.hrs), label: "HOURS" },
        { value: fmt(timeLeft.min), label: "MINS" },
        { value: fmt(timeLeft.sec), label: "SEC" },
      ].map((box, i) => (
        <div
          key={i}
          className="bg-white rounded-lg sm:rounded-xl w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex flex-col items-center justify-center shadow-md"
        >
          <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-black">
            {box.value}
          </div>
          <div className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-wider text-gray-600 mt-0.5 sm:mt-1">
            {box.label}
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 sm:mt-8">
      <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm md:text-base rounded-full shadow-lg transition">
        SHOP THE SUMMER SALE
      </button>
    </div>
  </div>
</div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-t from-black/60 to-transparent pointer-events-none"></div>
      </div>
    </>
  );
}
