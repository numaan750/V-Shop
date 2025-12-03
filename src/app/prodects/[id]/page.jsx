"use client";
import React, { useEffect, useState } from "react"; // ✅ useEffect, useState import karein
import { useParams } from "next/navigation";
// ❌ REMOVE THIS LINE
// import products from "@/utiles/subprodects";

// ✅ ADD THIS LINE - API function import
import { getProductById } from "@/utiles/api";

import Prodectreview from "@/componenets/singleprodect/component/Prodectreview";


const ProductPage = () => {
  const { id } = useParams(); // get product id from URL
  
  // ✅ ADD THESE 3 LINES - State variables
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


// ✅ Add this function to calculate discounted price
const getProductPrice = (product) => {
  if (!product) return 0;

  const basePrice = product.price; // single product, size logic optional here

  if (
    product.discount &&
    product.discount.percent &&
    (!product.discount.expiresAt || new Date(product.discount.expiresAt) > new Date())
  ) {
    const discountAmount = (basePrice * product.discount.percent) / 100;
    return basePrice - discountAmount;
  }

  return basePrice;
};


  // ✅ ADD THIS useEffect - Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id); // API call
        if (data.discount && data.discount.percent) {
  data.discountedPrice = getProductPrice(data);
}
        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // id change hone par re-fetch

  // ✅ ADD THIS - Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
      </div>
    );
  }

  // ✅ ADD THIS - Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ✅ KEEP THIS - Not found check (already correct)
  if (!product) {
    return (
      <div className="p-20 text-center text-gray-600 text-xl">
        ❌ Product not found
      </div>
    );
  }

  // ✅ KEEP THIS - Return statement (already correct)
  return <Prodectreview product={product} />;
};

export default ProductPage;