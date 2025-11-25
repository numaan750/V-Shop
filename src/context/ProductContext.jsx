// frontend/context/ProductContext.jsx

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllProducts, getAllCategories } from "../utiles/api.js";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ Dono APIs ek sath call hongi (parallel)
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getAllCategories()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData); // ✅ Categories set karein
    } catch (err) {
      setError(err.message);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    categories, // ✅ Ye add karein
    loading,
    error,
    refetch: fetchData, // ✅ Function name change
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
