import React from "react";

const BlogHero = () => {
  return (
    <section
      className="relative w-full h-[80vh] bg-center bg-cover flex items-center"
      style={{ backgroundImage: "url('blog-head.jpg')" }}
    >
      <div className="Mycontainer relative z-10 flex justify-end items-center h-full">
        <div className="w-full md:w-[45%] text-center md:text-left px-6 md:px-12 mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-snug">
            Style, Tips & <br /> More
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-6 max-w-md mx-auto md:mx-0">
            Welcome to The Velora Edit, your go-to destination for all things
            fashion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
