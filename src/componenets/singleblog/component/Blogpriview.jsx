import React from "react";

const Blogpriview = () => {
  return (
    <div className="py-10 w-full h-full bg-[#f7edee]">
      <div className="Mycontainer ">
        <div className="bg-white text-black rounded-lg shadow-sm">
          <div className="px-8 py-12">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Top 5 Accessories That Elevate Any Look
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
              <span>by hqueen</span>
              <span>•</span>
              <span>May 15, 2025</span>
            </div>
            <div className="mb-8">
              <img
                src="/blog-4.jpg"
                alt="blogimg"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-6 text-gray-800 leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  1. Statement Earrings: The Instant Game-Changer
                </h2>
                <p className="mb-4">
                  Nothing grabs attention quite like a pair of bold statement
                  earrings. Whether you prefer chunky hoops, hammered studs, or
                  intricate chandeliers, earrings can instantly add flair to
                  your outfit. They draw the eye upward, framing your face and
                  adding a touch of elegance or edge, depending on your style.
                </p>
                <p className="italic text-gray-600 border-l-4 border-gray-300 pl-4 my-4">
                  "Accessories are the cherry on fashion — use yours, you should
                  use them fiercely." — Emily Dean, Author
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  2. Classic Watches: Timeless and Functional
                </h2>
                <p>
                  A well-crafted watch is more than just a tool for telling time
                  — it's a symbol of sophistication and personality. Whether
                  you're a skilled fanatic or a modern minimalist, a watch can
                  seamlessly tie together any outfit, making it look polished
                  and cohesive and sophisticated.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  3. Structured Bag: Effortlessly Chic
                </h2>
                <p>
                  Duplicate layered necklaces are the ultimate touch of subtle
                  depth. You can mix metals, textures, or pendant shapes on your
                  chain lengths for a curated, elevated look. They're perfect
                  for adding dimension to simple outfits or complementing your —
                  adding depth without overpowering your outfit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  4. Belts: Define Your Shape and Style
                </h2>
                <p>
                  Belts aren't just functional — they're fashion statements. A
                  wide belt can create a dress of the waist to create a
                  flattering silhouette, while a thin leather belt can add a
                  minimalist touch to jeans or trousers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  5. Sunglasses: Your Outfit's Bold Finishing Touch
                </h2>
                <p>
                  The right pair of sunglasses doesn't just protect your eyes —
                  they make a statement. Whether you prefer oversized frames,
                  retro cat-eyes, or sleek aviators, glasses will add glamour,
                  call-outs give a retro flair, and round shapes channel
                  boho-cool.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-6 ">
          <div className=" flex items-center justify-between cursor-pointer">
            {/* <!-- Previous --> */}
            <div className="flex flex-col items-start gap-1 text-left hover:text-[#f0243c]">
              {/* <!-- Arrow + PREVIOUS --> */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold leading-none flex items-center">
                  ←
                </span>
                <span className="text-xl font-bold tracking-wide ">PREVIOUS</span>
              </div>

              {/* <!-- Title under it --> */}
              <p className="text-md text-gray-700 hover:text-[#f0243c]">
                Velora Kids: Fashion Meets Func...
              </p>
            </div>

            {/* <!-- Next --> */}
            <div className="flex items-end gap-2 text-right">
              <div className=" hover:text-[#f0243c]">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-xl font-semibold tracking-wide">NEXT</span>

                  <span className="text-2xl font-extrabold leading-none flex items-center">
                    →
                  </span>
                </div>
                <p className="text-md text-gray-700 hover:text-[#f0243c]">
                  Top 5 Accessories That Elevate ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogpriview;
