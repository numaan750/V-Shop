"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Blogecards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const blogsPerPage = 6;

  // ✅ Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://velora-website-backend.vercel.app/api/blogmodel"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Backend Response:", data);

        // ✅ Backend se data map karo frontend format mein
        const formattedBlogs = data.map((blog) => ({
          id: blog._id,
          title: blog.minheading,
          image: blog.img,
          excerpt: blog.qoutes,
          date: blog.updatedAt
            ? new Date(blog.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Date not available",
          readTime: blog.sections?.length
            ? `${Math.max(
                1,
                Math.ceil(
                  blog.sections.reduce(
                    (acc, section) =>
                      acc + (section.paragraph?.split(" ").length || 0),
                    0
                  ) / 200
                )
              )} min read`
            : "5 min read",
          category: blog.category?.name || "Uncategorized",
        }));

        setBlogs(formattedBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <section className="py-20">
        <div className="Mycontainer text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Error Loading Blogs
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ✅ Empty state
  if (blogs.length === 0) {
    return (
      <section className="py-20">
        <div className="Mycontainer text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Blogs Found
            </h3>
            <p className="text-gray-500">Check back later for new content!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="Mycontainer">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              </div>

              <div className="p-5">
                <Link href={`/reviewblog/${blog.id}`}>
                  <h2 className="text-lg sm:text-xl font-bold mb-3 cursor-pointer leading-snug hover:text-blue-500 duration-200">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-[#1a1516] text-sm mb-3 font-bold">
                  {blog.date} | {blog.readTime}
                </p>
                <p className="text-gray-700 text-md leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8 w-full">
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
        )}
      </div>
    </section>
  );
};

export default Blogecards;
