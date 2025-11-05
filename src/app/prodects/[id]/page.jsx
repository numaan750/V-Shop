"use client";
import React from "react";
import { useParams } from "next/navigation";
import products from "@/utiles/subprodects";
import Prodectreview from "@/componenets/singleprodect/component/Prodectreview";


const ProductPage = () => {
  const { id } = useParams(); // get product id from URL
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="p-20 text-center text-gray-600 text-xl">
        ❌ Product not found
      </div>
    );
  }

  // send product data as prop to your single page UI
  return <Prodectreview product={product} />;
};

export default ProductPage;
