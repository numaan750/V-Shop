// src/data/subprodects.js

const products = [
  {
    id: 1,
    title: "Flowline Dresses",
    category: "Women",
    price: 200,
    description:
      "A breezy and elegant flowline dress made from soft fabric, perfect for summer days or evening outings.",
    images: ["/home-img9.png", "/homeimg-3.jpg", "/home-last1.jpg", "/shop-2.jpg"],
    colors: [
      { name: "Purple", hex: "#5B2C6F" },
      { name: "Teal", hex: "#1ABC9C" },
      { name: "Gray", hex: "#616A6B" },
      { name: "Violet", hex: "#7D3C98" },
    ],
    sizes: [
      { label: "M", price: 200 },
      { label: "L", price: 220 },
      { label: "XL", price: 250 },
    ],
  },
  {
    id: 2,
    title: "Essential Polos",
    category: "Men",
    price: 80,
    description:
      "Classic cotton polo shirt with a modern fit — ideal for both casual wear and semi-formal outings.",
    images: ["/homeimg-3.jpg", "/shop-4.jpg", "/shop-3.jpg", "/shop-2.jpg"],
    colors: [
      { name: "Gray", hex: "#85929E" },
      { name: "Green", hex: "#1E8449" },
      { name: "Blue", hex: "#808B96" },
    ],
    sizes: [
      { label: "M", price: 80 },
      { label: "L", price: 90 },
      { label: "XL", price: 100 },
    ],
  },
  {
    id: 3,
    title: "Cream T-Shirt",
    category: "Men",
    price: 60,
    sale: true,
    description:
      "Soft and breathable cotton T-shirt in cream tone. Perfect for layering or solo wear with any outfit.",
    images: ["/home-last1.jpg", "/shop-3.jpg", "/shop-2.jpg", "/shop-1.jpg"],
    colors: [
      { name: "Lavender", hex: "#A569BD" },
      { name: "Slate", hex: "#566573" },
      { name: "Emerald", hex: "#229954" },
    ],
    sizes: [
      { label: "M", price: 60 },
      { label: "L", price: 70 },
      { label: "XL", price: 80 },
    ],
  },
  {
    id: 4,
    title: "Casual Jacket",
    category: "Men",
    price: 150,
    sale: true,
    description:
      "Lightweight casual jacket designed for comfort and versatility. Great for cool evenings and travel.",
    images: ["/shop-1.jpg", "/shop-4.jpg", "/shop-5.jpg", "/homeimg-3.jpg"],
    colors: [
      { name: "Mustard", hex: "#D68910" },
      { name: "Navy", hex: "#2E4053" },
    ],
    sizes: [
      { label: "M", price: 150 },
      { label: "L", price: 160 },
    ],
  },
  {
    id: 5,
    title: "Classic Tank",
    category: "Women",
    price: 100,
    description:
      "A lightweight and stylish tank top ideal for layering or solo wear during warm weather.",
    images: ["/shop-2.jpg", "/home-last1.jpg", "/homeimg-3.jpg", "/shop-3.jpg"],
    colors: [
      { name: "Violet", hex: "#884EA0" },
      { name: "Orange", hex: "#BA4A00" },
    ],
    sizes: [
      { label: "S", price: 100 },
      { label: "M", price: 110 },
      { label: "L", price: 120 },
    ],
  },
  {
    id: 6,
    title: "Kids Hoodie",
    category: "Kids",
    price: 90,
    description:
      "Cozy and durable hoodie designed for kids — soft fleece interior for warmth and comfort.",
    images: ["/shop-3.jpg", "/shop-5.jpg", "/homeimg-3.jpg", "/home-img9.png"],
    colors: [
      { name: "Pink", hex: "#F5B7B1" },
      { name: "Lavender", hex: "#AF7AC5" },
    ],
    sizes: [
      { label: "XS", price: 90 },
      { label: "S", price: 100 },
    ],
  },
  {
    id: 7,
    title: "Denim Shirt",
    category: "Men",
    price: 120,
    description:
      "Stylish denim shirt crafted from premium cotton. A timeless addition to your casual wardrobe.",
    images: ["/shop-4.jpg", "/shop-1.jpg", "/homeimg-3.jpg", "/shop-3.jpg"],
    colors: [
      { name: "Light Blue", hex: "#5DADE2" },
      { name: "Navy", hex: "#1B4F72" },
    ],
    sizes: [
      { label: "M", price: 120 },
      { label: "L", price: 130 },
    ],
  },
  {
    id: 8,
    title: "Summer Dress",
    category: "Women",
    price: 160,
    description:
      "A flowy summer dress with a flattering silhouette, perfect for holidays, picnics, and weekend brunches.",
    images: ["/shop-5.jpg", "/home-last1.jpg", "/homeimg-3.jpg", "/shop-4.jpg"],
    colors: [
      { name: "Peach", hex: "#E59866" },
      { name: "Lilac", hex: "#C39BD3" },
    ],
    sizes: [
      { label: "S", price: 160 },
      { label: "M", price: 170 },
      { label: "L", price: 180 },
    ],
  },
  {
    id: 9,
    title: "Puffer Jacket",
    category: "Women",
    price: 250,
    description:
      "Warm and stylish puffer jacket designed to keep you cozy while maintaining a chic silhouette.",
    images: ["/shop-6.png", "/shop-1.jpg", "/homeimg-3.jpg", "/shop-4.jpg"],
    colors: [
      { name: "Navy", hex: "#154360" },
      { name: "Red", hex: "#A93226" },
    ],
    sizes: [
      { label: "L", price: 250 },
      { label: "XL", price: 270 },
    ],
  },
  {
    id: 10,
    title: "Relaxed Tee",
    category: "Men",
    price: 70,
    description:
      "A casual relaxed-fit T-shirt crafted from soft cotton for everyday comfort and style.",
    images: ["/shop-7.jpg", "/shop-3.jpg", "/shop-4.jpg", "/shop-2.jpg"],
    colors: [
      { name: "Gray", hex: "#808B96" },
      { name: "Blue", hex: "#5DADE2" },
    ],
    sizes: [
      { label: "M", price: 70 },
      { label: "L", price: 80 },
    ],
  },
  {
    id: 11,
    title: "Hooded Sweatshirt",
    category: "Men",
    price: 110,
    description:
      "A premium hooded sweatshirt with a soft fleece lining — perfect for layering in cooler weather.",
    images: ["/home-img1.png", "/homeimg-3.jpg", "/shop-3.jpg", "/shop-5.jpg"],
    colors: [
      { name: "Gray", hex: "#7F8C8D" },
      { name: "Charcoal", hex: "#424949" },
    ],
    sizes: [
      { label: "L", price: 110 },
      { label: "XL", price: 120 },
    ],
  },
  {
    id: 12,
    title: "Casual Top",
    category: "Women",
    price: 130,
    description:
      "A soft, flowy casual top that pairs effortlessly with jeans or skirts for a chic everyday look.",
    images: ["/home-img2.jpg", "/home-last1.jpg", "/shop-4.jpg", "/shop-2.jpg"],
    colors: [
      { name: "Peach", hex: "#FAD7A0" },
      { name: "Pink", hex: "#F5B7B1" },
    ],
    sizes: [
      { label: "S", price: 130 },
      { label: "M", price: 140 },
      { label: "L", price: 150 },
    ],
  },
];

export default products;
