"use client";
import React, { useState } from "react";

const blogs = [
  {
    id: 1,
    title: "Top 5 Accessories That Elevate Any Look",
    date: "May 15, 2025",
    readTime: "2 minutes of reading",
    excerpt:
      "Statement Earrings: The Instant Game-Changer Nothing draws attention quite like a pair of bold statement earrings...",
    image: "/blog-1.jpg",
  },
  {
    id: 2,
    title: "Mix, Match, Repeat: Building Outfits with Fewer Pieces",
    date: "May 15, 2025",
    readTime: "1 minute of reading",
    excerpt:
      "Make the Most of What You Have — creating stylish outfits doesn’t require an overflowing closet...",
    image: "/blog-2.jpg",
  },
  {
    id: 3,
    title: "Velora Kids: Fashion Meets Functionality",
    date: "May 15, 2025",
    readTime: "1 minute of reading",
    excerpt:
      "Designed for play, styled for life. At Velora Kids, we believe children’s clothing should never make you choose between comfort and style.",
    image: "/bloge-3.jpg",
  },
  {
    id: 4,
    title: "Our Favorite Summer Looks: Light, Breezy & Bold",
    date: "May 15, 2025",
    readTime: "2 minutes of reading",
    excerpt:
      "Capture the essence of summer with these breathable and trendy outfits perfect for sunny days.",
    image: "/blog-4.jpg",
  },
  {
    id: 5,
    title: "How to Style One Jacket Three Ways",
    date: "May 15, 2025",
    readTime: "1 minute of reading",
    excerpt:
      "A simple jacket can be your best friend — learn 3 creative ways to wear it and make it new every time.",
    image: "/bloge-5.jpg",
  },
  {
    id: 6,
    title: "5 Must-Have Staples for a Capsule Wardrobe",
    date: "May 15, 2025",
    readTime: "2 minutes of reading",
    excerpt:
      "Simplify your style — these wardrobe staples will help you build countless looks effortlessly.",
    image: "/bloge-6.jpg",
  },
  {
    id: 7,
    title: "Minimalist Style: The Power of Less",
    date: "May 15, 2025",
    readTime: "1 minute of reading",
    excerpt:
      "Learn how minimalism can redefine your fashion choices and simplify your lifestyle.",
    image: "/bloge-6.jpg",
  },
  {
    id: 8,
    title: "From Desk to Dinner: Smart Casual Looks",
    date: "May 15, 2025",
    readTime: "2 minutes of reading",
    excerpt:
      "Transform your office outfits into dinner-ready looks with these effortless tweaks.",
    image: "/bloge-6.jpg",
  },
  {
    id: 9,
    title: "Bold Prints: How to Wear Them with Confidence",
    date: "May 15, 2025",
    readTime: "2 minutes of reading",
    excerpt:
      "Prints can make or break your outfit — here’s how to style them the right way.",
    image: "/bloge-6.jpg",
  },
];

const Blogecards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20">
      {/* Blog Cards Grid */}
      <div className="Mycontainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white max-w-md mx-auto rounded-lg shadow-lg transition overflow-hidden"
          >
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg sm:text-xl font-bold mb-3 cursor-pointer leading-snug">
                {blog.title}
              </h2>
              <p className="text-[#1a1516] text-sm mb-3 font-bold">
                {blog.date} | {blog.readTime}
              </p>
              <p className="text-gray-700 text-md leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-start items-center  space-x-2">
          {/* Prev Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 shadow-sm"
            }`}
          >
            ← Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 shadow-sm"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 shadow-sm"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blogecards;
