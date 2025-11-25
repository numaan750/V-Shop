"use client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartslice";
import toast from "react-hot-toast";

const Newarrivals = () => {
  const dispatch = useDispatch();
  const { products: backendProducts, loading, error } = useProducts();

  // ✅ Latest 3 products
  const newProducts = useMemo(() => {
    if (!backendProducts || backendProducts.length === 0) return [];
    return [...backendProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3); // only latest 3
  }, [backendProducts]);

  // ✅ Local state for selected options (color & size)
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({});

  const handleColorSelect = (productId, colorHex) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorHex,
    }));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));

    // ✅ Size ki price update karna
    const productObj = newProducts.find((p) => p._id === productId);
    if (productObj && productObj.sizes) {
      const sizeObj = productObj.sizes.find((s) => s.label === size);
      if (sizeObj) {
        setSelectedPrices((prev) => ({ ...prev, [productId]: sizeObj.price }));
      }
    }
  };

  const getProductImage = (product) => {
    const selectedColor = selectedColors[product._id];
    if (selectedColor && product.colors && product.images) {
      const colorObj = product.colors.find((c) => c.hex === selectedColor);
      if (colorObj) {
        const colorImage = product.images.find((img) => {
          const imgColorId =
            typeof img.colour === "object" ? img.colour._id : img.colour;
          return imgColorId === colorObj._id;
        });
        if (colorImage)
          return typeof colorImage === "object" ? colorImage.url : colorImage;
      }
    }
    // Default: first image
    if (product.images && product.images.length > 0) {
      return typeof product.images[0] === "object"
        ? product.images[0].url
        : product.images[0];
    }
    return "/placeholder-image.jpg";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error)
    return <div className="py-16 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center px-6 py-13">
      <div className="Mycontainer text-center">
        <div className="bg-white text-left mx-auto py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-lg text-gray-600 md:mb-0 mb-8 md:w-3/4">
              Be the first to wear this season’s latest looks. Handpicked and
              freshly styled.
            </p>
            <div className="md:w-auto flex md:justify-end w-full mb-5">
              <button className="border border-red-500 text-red-500 rounded-full px-8 py-3 text-lg font-medium transition duration-300 hover:bg-red-500 hover:text-white">
                SEE WHAT'S NEW
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
            {newProducts.map((product) => (
              <div key={product._id} className="group relative overflow-hidden">
                {product.sale && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Sale!
                  </span>
                )}

                <Link href={`/prodects/${product._id}`}>
                  <div className="relative w-full aspect-[1/1.2] overflow-hidden bg-gray-100">
                    <img
                      src={getProductImage(product)}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Link>

                {/* Hover Buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="relative flex items-center group/cart">
                    <span className="mr-2 text-xs bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      Add to Cart
                    </span>
                    <button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!product._id || !product.title || !product.price)
                          return;

                        const item = {
                          productId: product._id,
                          name: product.title,
                          price: product.price,
                          quantity: 1,
                          size:
                            selectedSizes[product._id] ||
                            (product.sizes?.[0]?.label ?? null),
                          color:
                            selectedColors[product._id] ||
                            (product.colors?.[0]?.hex ?? null),
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

                {/* Product Info */}
                <div className="p-4 text-left">
                  <h3 className="font-semibold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.category?.name || "Uncategorized"}
                  </p>
                  <p className="mt-1 text-gray-900 font-semibold">
                    ₹{selectedPrices[product._id] ?? product.price}.00
                  </p>

                  {/* Sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size.label}
                          onClick={() =>
                            handleSizeSelect(product._id, size.label)
                          }
                          className={`border border-gray-300 px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-gray-100 transition-colors ${
                            selectedSizes[product._id] === size.label
                              ? "bg-gray-200 border-gray-400"
                              : ""
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mt-4 flex gap-2">
                      {product.colors.map((color) => (
                        <div
                          key={color.hex}
                          onClick={() =>
                            handleColorSelect(product._id, color.hex)
                          }
                          className={`w-4 h-4 rounded-sm border border-transparent cursor-pointer transition-all ${
                            selectedColors[product._id] === color.hex
                              ? "ring-1  ring-red-500 "
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
        </div>
      </div>
    </div>
  );
};

export default Newarrivals;
