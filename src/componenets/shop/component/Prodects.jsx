"use client";
import React, { useState, useMemo } from "react";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartslice"; // path may differ
import toast from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch(); // ✅ This was missing

  const {
    products: backendProducts,
    categories,
    loading,
    error,
  } = useProducts(); // ✅ categories add kiya
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("all"); // ✅ NEW - category filter
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({});

  const productsPerPage = 9;

  // ✅ Filter by category first, then sort
  const sortedProducts = useMemo(() => {
    if (!backendProducts || backendProducts.length === 0) return [];

    // Step 1: Filter by category
    let filtered = [...backendProducts];
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category?._id === selectedCategory
      );
    }

    // Step 2: Sort filtered products
    if (sortOption === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "category") {
      filtered.sort((a, b) => {
        const catA = a.category?.name || "";
        const catB = b.category?.name || "";
        return catA.localeCompare(catB);
      });
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [backendProducts, sortOption, selectedCategory]); // ✅ selectedCategory dependency add kiya

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

  // ✅ Category change handler
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page
  };

  // Size & color selection
  const handleSizeSelect = (productId, sizeObj) => {
    // Update selected size
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeObj }));

    // Update corresponding price
    if (sizeObj?.price) {
      setSelectedPrices((prev) => ({ ...prev, [productId]: sizeObj.price }));
    }
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

  // ✅ Get image based on selected color
  // ✅ UPDATED - Get image based on selected color
  const getProductImage = (product) => {
    const selectedColor = selectedOptions[product._id]?.color;

    // Agar color select hai, to us color ki image dhundo
    if (selectedColor && product.images && product.images.length > 0) {
      // Find the color object that matches selected hex
      const selectedColorObj = product.colors?.find(
        (c) => c.hex === selectedColor
      );

      if (selectedColorObj) {
        // Find image with matching colour reference
        const colorImage = product.images.find((img) => {
          if (typeof img === "object" && img.colour) {
            // Handle both populated and non-populated colour field
            const imgColourId =
              typeof img.colour === "object"
                ? img.colour._id?.toString()
                : img.colour.toString();

            // Compare with color object's _id
            const colorObjId = selectedColorObj._id?.toString();

            return imgColourId === colorObjId;
          }
          return false;
        });

        // Agar matching image mili, return karo
        if (colorImage) {
          return typeof colorImage === "object" && colorImage.url
            ? colorImage.url
            : colorImage;
        }
      }
    }

    // Default: first image
    if (product.images && product.images.length > 0) {
      const firstImg = product.images[0];
      return typeof firstImg === "object" && firstImg.url
        ? firstImg.url
        : firstImg;
    }

    return "/placeholder-image.jpg";
  };

  const getProductPrice = (product) => {
    const basePrice = selectedPrices[product._id] ?? product.price;

    if (
      product.discount &&
      product.discount.percent &&
      (!product.discount.expiresAt ||
        new Date(product.discount.expiresAt) > new Date())
    ) {
      const discountAmount = (basePrice * product.discount.percent) / 100;
      return basePrice - discountAmount;
    }

    return basePrice;
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="Mycontainer">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 text-lg">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="Mycontainer">
        <h1 className="text-3xl font-semibold mb-8 border-b border-gray-300 pb-5">
          Shop
        </h1>

        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-10">
          <p className="text-sm sm:text-base lg:text-lg whitespace-nowrap">
            Showing <span className="font-medium">{indexOfFirst + 1}</span>–
            <span className="font-medium">
              {Math.min(indexOfLast, sortedProducts.length)}
            </span>{" "}
            of <span className="font-medium">{sortedProducts.length}</span>{" "}
            results
          </p>

          <div className="flex items-center gap-3">
            {/* ✅ Category Dropdown */}
            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm sm:text-base cursor-pointer transition-all duration-200"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="all">All Products</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* ✅ Sort Dropdown */}
<select
  className="border border-gray-300 rounded-md px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base cursor-pointer transition-all duration-200 w-full sm:w-auto"
  value={sortOption}
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
              key={product._id}
              className="text-left bg-white overflow-hidden group relative"
            >
              <div className="relative">
                {product.discount && product.discount.percent && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                    {product.discount.percent}% OFF
                  </span>
                )}

                {/* ✅ Image with fixed aspect ratio */}
                <Link href={`/prodects/${product._id}`}>
                  <div className="relative w-full aspect-[1/1.3] overflow-hidden bg-gray-100">
                    <img
                      src={getProductImage(product)}
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Link>

                {/* Hover Icons */}
                <div
                  className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-3
                  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10"
                >
                  <div className="relative flex items-center group/cart">
                    <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      Add to Cart
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        // ✅ Validate product before creating item
                        if (
                          !product ||
                          !product._id ||
                          !product.title ||
                          !product.price
                        ) {
                          console.warn("Skipping invalid product:", product);
                          return;
                        }

                        const item = {
                          productId: product._id,
                          name: product.title,
                          price: getProductPrice(product), // ✅ discounted price included
                          quantity: 1,
                          size: selectedSizes[product._id]?.label || null,
                          color: selectedOptions[product._id]?.color || null,
                          image: getProductImage(product),
                        };

                        dispatch(addToCart(item));
                        toast.success(`${product.title} added to cart!`, {
                          position: "top-right",
                          style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                          },
                        });
                      }}
                      className="cursor-pointer"
                    >
                      🛒
                    </button>
                  </div>

                  <div className="relative flex items-center group/view">
                    <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      View Details
                    </span>
                    <Link href={`/prodects/${product._id}`}>
                      <button className="cursor-pointer">👁️</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {product.category?.name || "Uncategorized"}
                </p>
                {product.description && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <p className="text-base sm:text-lg font-bold text-gray-800 mt-1 flex items-center gap-2">
                  ₹{getProductPrice(product).toFixed(2)}
                  {product.discount && product.discount.percent && (
                    <span className="text-sm line-through text-gray-400">
                      ₹
                      {(selectedPrices[product._id] ?? product.price).toFixed(
                        2
                      )}
                    </span>
                  )}
                </p>

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => handleSizeSelect(product._id, size)}
                        className={`border border-gray-300 px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-gray-100 transition-colors ${
                          selectedSizes[product._id]?.label === size.label
                            ? "bg-gray-200 border-gray-400"
                            : ""
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Colors - ✅ Click karne par image change hogi */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex gap-3 mt-4">
                    {product.colors.map((color) => (
                      <div
                        key={color.hex}
                        onClick={() =>
                          handleColorSelect(product._id, color.hex)
                        }
                        className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${
                          selectedOptions[product._id]?.color === color.hex
                            ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                            : "hover:scale-110"
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

        {/* No Products Message */}
        {currentProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
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
        )}
      </div>
    </section>
  );
};

export default Products;
