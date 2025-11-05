"use client";
import React, { useState, useMemo } from "react";
import products from "@/utiles/subprodects";
import Link from "next/link";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const productsPerPage = 9;

  // Sorting logic
  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortOption === "priceLowHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "category") {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    } else {
      sorted.sort((a, b) => a.id - b.id);
    }
    return sorted;
  }, [sortOption]);

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Size & color selection
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleColorSelect = (productId, color) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        color: prev[productId]?.color === color ? null : color,
      },
    }));
  };

  return (
    <section className="py-20">
      <div className="Mycontainer">
        <h1 className="text-3xl font-semibold mb-8 border-b border-gray-300 pb-5">
          Shop
        </h1>

        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-6">
          <p className="text-sm sm:text-base lg:text-lg whitespace-nowrap">
            Showing <span className="font-medium">{indexOfFirst + 1}</span>–
            <span className="font-medium">
              {Math.min(indexOfLast, products.length)}
            </span>{" "}
            of <span className="font-medium">{products.length}</span> results
          </p>

          <div className="flex items-center">
            <select
              className="border-0 focus:border focus:ring-0 hover:border-gray-300 px-3 py-1 text-sm sm:text-base cursor-pointer transition-all duration-200"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="latest">Sort by latest</option>
              <option value="priceLowHigh">Sort by price: low to high</option>
              <option value="priceHighLow">Sort by price: high to low</option>
              <option value="category">Sort by category</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="text-left bg-white overflow-hidden group relative"
            >
              <div className="relative">
                {product.sale && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Sale!
                  </span>
                )}

                {/* ✅ Only the image is clickable */}
                <Link href={`/prodects/${product.id}`}>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  />
                </Link>

                {/* Hover Icons */}
                <div
                  className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-3
                  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
                >
                  <div className="relative flex items-center group/cart">
                    <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      Add to Cart
                    </span>
                    <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                      🛒
                    </button>
                  </div>

                  <div className="relative flex items-center group/view">
                    <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      View Details
                    </span>
                    <button className="bg-white p-0.5 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition">
                      👁️
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {product.category}
                </p>
                {product.description && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">
                  ₹{product.price}.00
                </p>

                <div className="flex gap-2 mt-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => handleSizeSelect(product.id, size)}
                      className={`border border-gray-300 px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-gray-100 ${
                        selectedSizes[product.id]?.label === size.label
                          ? "bg-gray-200"
                          : ""
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>

                {product.colors && (
                  <div className="flex gap-3 mt-4">
                    {product.colors.map((color) => (
                      <div
                        key={color.hex}
                        onClick={() =>
                          handleColorSelect(product.id, color.hex)
                        }
                        className={`w-5 h-5 rounded-md border cursor-pointer ${
                          selectedOptions[product.id]?.color === color.hex
                            ? "ring-2 ring-gray-500"
                            : ""
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-start items-center mt-16 space-x-2">
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
      </div>
    </section>
  );
};

export default Products;
