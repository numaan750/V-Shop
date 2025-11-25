// frontend/utils/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://velora-website-backend.vercel.app/api";

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/productsmodel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    
    const result = await response.json();
    return result.data; // Backend se { success: true, data: [...] } aata hai
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productsmodel/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};


// ✅ Categories APIs (NEW - Ye add karein)
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categorymodel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};