"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const SingleBlogPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Current blog fetch karo
        const blogRes = await fetch(
          `https://velora-website-backend.vercel.app/api/blogmodel/${id}`
        );
        if (!blogRes.ok) throw new Error("Blog not found");
        const blogData = await blogRes.json();

        // ✅ All blogs fetch karo (for prev/next navigation)
        const allBlogsRes = await fetch("https://velora-website-backend.vercel.app/api/blogmodel");
        const allBlogsData = await allBlogsRes.json();

        console.log("Single Blog Data:", blogData);
        console.log("All Blogs:", allBlogsData);

        setBlog(blogData);
        setAllBlogs(allBlogsData);
        // ✅ YEH 4 LINES ADD KARO (line 44-47 ke baad)
        const related = allBlogsData.filter(
          (b) => b.category?._id === blogData.category?._id && b._id !== id
        );
        setRelatedBlogs(related.slice(0, 4)); // 3 se 4 karo
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // ✅ Previous/Next blog logic
  const currentIndex = allBlogs.findIndex((b) => b._id === id);
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  // Loading state
  if (loading) {
    return (
      <div className="py-10 w-full h-screen bg-[#f7edee] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-10 w-full h-screen bg-[#f7edee] flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
          <h3 className="text-xl font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // No blog found
  if (!blog) {
    return (
      <div className="py-10 w-full h-screen bg-[#f7edee] flex items-center justify-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Blog Not Found
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 w-full h-full bg-[#f7edee]">
      <div className="Mycontainer">
        <div className="bg-white text-black rounded-lg shadow-sm">
          <div className="px-8 py-12">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              {blog.minheading}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
              <span>{blog.category?.name || "No Category"}</span>
              <span>•</span>
              <span>
                {blog.updatedAt
                  ? new Date(blog.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date not available"}
              </span>
            </div>

            {/* Image */}
            <div className="mb-8">
              <img
                src={blog.img}
                alt={blog.minheading}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x400?text=No+Image";
                }}
              />
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-gray-800 leading-relaxed">
              {blog.sections?.map((sec, i) => (
                <div key={i}>
                  {sec.heading && (
                    <h2 className="text-2xl font-bold mb-4">{sec.heading}</h2>
                  )}
                  {sec.paragraph && <p className="mb-4">{sec.paragraph}</p>}
                </div>
              ))}

              {/* Quote Section - Agar qoutes field hai toh */}
              {blog.qoutes && (
                <p className="italic text-gray-600 border-l-4 border-gray-300 pl-4 my-4">
                  "{blog.qoutes}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Previous/Next Navigation */}
        <div className="w-full py-6">
          <div className="flex items-center justify-between cursor-pointer">
            {/* Previous Button */}
            {prevBlog ? (
              <Link href={`/reviewblog/${prevBlog._id}`}>
                <div className="flex flex-col items-start gap-1 text-left hover:text-[#f0243c] transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold leading-none">
                      ←
                    </span>
                    <span className="text-xl font-bold tracking-wide">
                      PREVIOUS
                    </span>
                  </div>
                  <p className="text-md text-gray-700 hover:text-[#f0243c]">
                    {prevBlog.minheading.length > 30
                      ? prevBlog.minheading.substring(0, 30) + "..."
                      : prevBlog.minheading}
                  </p>
                </div>
              </Link>
            ) : (
              <div></div> // Empty space agar previous nahi hai
            )}

            {/* Next Button */}
            {nextBlog ? (
              <Link href={`/reviewblog/${nextBlog._id}`}>
                <div className="flex flex-col items-end gap-1 text-right hover:text-[#f0243c] transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-wide">
                      NEXT
                    </span>
                    <span className="text-2xl font-extrabold leading-none">
                      →
                    </span>
                  </div>
                  <p className="text-md text-gray-700 hover:text-[#f0243c]">
                    {nextBlog.minheading.length > 30
                      ? nextBlog.minheading.substring(0, 30) + "..."
                      : nextBlog.minheading}
                  </p>
                </div>
              </Link>
            ) : (
              <div></div> // Empty space agar next nahi hai
            )}
          </div>

          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog._id}
                    href={`/reviewblog/${relatedBlog._id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={relatedBlog.img}
                          alt={relatedBlog.minheading}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x300?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <span className="text-xs text-[#f0243c] font-semibold uppercase">
                          {relatedBlog.category?.name || "Uncategorized"}
                        </span>
                        <h3 className="text-lg font-bold mt-2 text-gray-800 group-hover:text-[#f0243c] transition-colors line-clamp-2 flex-grow">
                          {relatedBlog.minheading}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {new Date(relatedBlog.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
