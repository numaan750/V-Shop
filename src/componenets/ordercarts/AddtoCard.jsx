"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart, clearCart } from "@/redux/cartslice";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const AddToCart = ({paymentStatus, sessionId}) => {
  
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY, {
  locale: 'auto'
});  console.log("Stripe Key:", process.env.NEXT_PUBLIC_STRIPE_KEY);

  const dispatch = useDispatch();
  const router = useRouter();
  const cartState = useSelector((state) => state.cart);
  const cartItems = cartState.userId ? cartState.items : cartState.guestCart;

  const [step, setStep] = useState("cart");
  // const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  // const [loadingShipping, setLoadingShipping] = useState(false);
  const [showShippingMethods, setShowShippingMethods] = useState(false);
  const [isCODSelected, setIsCODSelected] = useState(false);
  const [formError, setFormError] = useState("");
  const userId = useSelector((state) => state.cart.userId);
  // ✅ ADD THESE NEW STATES
  const [completedOrder, setCompletedOrder] = useState(null);
  const [paymentMethodUsed, setPaymentMethodUsed] = useState("");
  // ✅ Get URL parameters


  // COD charges (you can modify this value)
  const COD_CHARGES = 50;

  // Form Data State
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "India",
    houseAddress: "",
    apartment: "",
    city: "",
    phone: "",
  });

  // Backend URL
  const backendUrl = "http://localhost:4000/api";

  // ✅ Extract URL parameters on mount

  // ✅ ADD THIS USEEFFECT AFTER backendUrl
  useEffect(() => {
    const checkPaymentStatus = async () => {
      // ✅ Use props instead of searchParams
      if (paymentStatus === "success" && sessionId) {
        console.log("✅ Payment successful! Session ID:", sessionId);

        const pendingOrderStr = sessionStorage.getItem("pendingOrder");

        if (pendingOrderStr) {
          try {
            const orderData = JSON.parse(pendingOrderStr);
            orderData.paymentStatus = "paid";
            orderData.sessionId = sessionId;

            console.log("📤 Saving order to backend...", orderData);

            const res = await axios.post(
              `${backendUrl}/checkoutmodel`,
              orderData,
              {
                headers: { "Content-Type": "application/json" },
              }
            );

            console.log("✅ Order saved successfully:", res.data);

            setCompletedOrder(res.data);
            setPaymentMethodUsed("Card");

            sessionStorage.removeItem("pendingOrder");

            setStep("complete");

            toast.success("✅ Payment successful! Order placed.");

            // Clear URL parameters
            window.history.replaceState({}, "", "/ordercarts");
          } catch (err) {
            console.error("❌ Error saving order:", err);
            toast.error("Failed to save order. Please contact support.");
          }
        } else {
          toast.error("Order data not found. Please try again.");
        }
      } else if (paymentStatus === "cancelled") {
        toast.error("Payment was cancelled. Please try again.");
        setStep("checkout");
        window.history.replaceState({}, "", "/ordercarts");
      }
    };

    checkPaymentStatus();
  }, [paymentStatus, sessionId]); // ✅ Dependencies changed

  // Fetch shipping methods
  const fetchShippingMethods = async () => {
    setLoadingShipping(true);
    try {
      const res = await fetch(`${backendUrl}/shippingmodel`);
      const data = await res.json();
      const activeMethods = data.filter((method) => method.isActive);
      setShippingMethods(activeMethods);
    } catch (err) {
      console.error("Error fetching shipping methods:", err);
    } finally {
      setLoadingShipping(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form and show shipping methods
  const handleContinueToShipping = () => {
    // Validate required fields
    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.houseAddress ||
      !formData.city ||
      !formData.phone
    ) {
      setFormError("Please fill up the form first");
      return;
    }

    // Clear error and show shipping methods
    setFormError("");
    setShowShippingMethods(true);
    fetchShippingMethods();
  };

  // Handle COD checkbox toggle
  const handleCODToggle = (e) => {
    const isChecked = e.target.checked;
    setIsCODSelected(isChecked);

    // If COD is selected, hide shipping methods
    if (isChecked) {
      setShowShippingMethods(false);
      setSelectedShipping(null);
    }
  };

  const suggestedProducts = [
    {
      id: 1,
      name: "Funky Hoodie",
      category: "Men",
      priceRange: "₹120.00 – ₹125.00",
      image: "/related-img.jpg",
    },
    {
      id: 2,
      name: "T Jacket Combo",
      category: "Men",
      priceRange: "₹200.00 – ₹210.00",
      image: "/related-img2.jpg",
    },
  ];

  const incrementQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const decrementQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = selectedShipping ? selectedShipping.price : 0;
  const codCharges = isCODSelected ? COD_CHARGES : 0;
  const total = subtotal + shippingPrice + codCharges;

  // Handle Place Order - Save to Backend
  const handlePlaceOrder = async () => {
    try {
      // ✅ Validation - Check if user is logged in
      if (!userId) {
        toast.error("❌ Please login first to place order");
        router.push("/login"); // Redirect to login
        return;
      }

      // ✅ Validate cart
      if (cartItems.length === 0) {
        toast.error("❌ Your cart is empty");
        return;
      }

      // ✅ Validate form fields
      if (
        !formData.email ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.houseAddress ||
        !formData.city ||
        !formData.phone
      ) {
        toast.error("❌ Please fill all required fields");
        return;
      }

      // ✅ Validate shipping or COD selection
      if (!isCODSelected) {
        toast.error("❌ Please select a shipping method or COD");
        return;
      }

      console.log("📤 Preparing checkout data...");
      console.log("User ID:", userId);
      console.log("Form Data:", formData);
      console.log("Cart Items:", cartItems);

      // ✅ Prepare checkout data WITH userId (fixed field names)
      const checkoutData = {
        userId: userId, // 🔥 Logged-in user ki ID
        username: formData.firstName, // Ya koi username field ho
        email: formData.email,
        firstname: formData.firstName, // ✅ Backend ke hisaab se
        lastname: formData.lastName, // ✅ Backend ke hisaab se
        country: formData.country,
        city: formData.city,
        address: formData.houseAddress, // ✅ Backend expects "address"
        phone: formData.phone,
        apartment: formData.apartment || "",
        products: cartItems.map((item) => ({
          img: item.image || item.img || "/placeholder.jpg",
          title: item.name || item.title || "Unknown Product",
          price: item.price.toString(),
          quantity: item.quantity.toString(),
        })),
        status: "pending",
      };

      console.log("📤 Sending checkout data:", checkoutData);

      // ✅ Send to backend
      const res = await axios.post(
        `${backendUrl}/checkoutmodel`,
        checkoutData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Order created successfully:", res.data);
      toast.success("✅ Order placed successfully!");

      setCompletedOrder(res.data);
    setPaymentMethodUsed("COD");

      // ✅ Move to complete step
      setStep("complete");

      // ✅ Optional: Clear cart after successful order
      // dispatch(clearCart());
    } catch (err) {
      console.error(
        "❌ Order creation error:",
        err.response?.data || err.message
      );

      // Better error handling
      if (err.response?.status === 400) {
        toast.error(err.response?.data?.message || "Invalid order data");
      } else if (err.response?.status === 401) {
        toast.error("Please login to place order");
        router.push("/login");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    }
  };

  const handleStripeCheckout = async () => {
    try {
      if (!userId) {
        toast.error("❌ Please login first to proceed");
        router.push("/login");
        return;
      }

      if (cartItems.length === 0) {
        toast.error("❌ Your cart is empty");
        return;
      }

      if (
        !formData.email ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.houseAddress ||
        !formData.city ||
        !formData.phone
      ) {
        toast.error("❌ Please fill all required fields");
        return;
      }

      console.log("🔄 Processing Stripe payment...");

      // ✅ Prepare order data
      const orderData = {
        userId: userId,
        username: formData.firstName,
        email: formData.email,
        firstname: formData.firstName,
        lastname: formData.lastName,
        country: formData.country,
        city: formData.city,
        address: formData.houseAddress,
        phone: formData.phone,
        apartment: formData.apartment || "",
        products: cartItems.map((item) => ({
          img: item.image || "/placeholder.jpg",
          title: item.name,
          price: item.price.toString(),
          quantity: item.quantity.toString(),
        })),
        status: "pending", // Will be updated to "paid" on success page
        paymentStatus: "pending", // Will be updated to "paid" on success page
      };

      // ✅ Save to sessionStorage BEFORE redirecting to Stripe
      sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));
      console.log("💾 Order data saved to sessionStorage");

      // ✅ Create Stripe session
      const response = await axios.post("http://localhost:4000/api/stripe", {
        products: cartItems.map((item) => ({
          _id: item.id,
          name: item.name,
          image: item.image || "https://via.placeholder.com/150",
          price: item.price,
          quantity: item.quantity,
        })),
      });

      console.log("✅ Stripe session created:", response.data);

      // ✅ Redirect to Stripe
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("❌ Payment URL not received from server");
      }
    } catch (err) {
      console.error(
        "❌ Stripe checkout error:",
        err.response?.data || err.message
      );

      if (err.response?.status === 404) {
        toast.error("❌ Payment service not found. Please contact support.");
      } else if (err.response?.status === 400) {
        toast.error(err.response?.data?.message || "Invalid payment data");
      } else {
        toast.error("Payment failed. Please try again.");
      }
    }
  };

  return (
    <div className="py-15">
      <div className="Mycontainer">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-loose">
          Cart {!cartState.userId && "(Guest Mode)"}
        </h1>

        {/* Progress steps */}
        <div className="flex items-center space-x-2 text-lg md:text-xl lg:text-4xl justify-center mb-7">
          <button
            onClick={() => setStep("cart")}
            className={`font-bold cursor-pointer ${
              step === "cart" ? "text-red-500" : "text-gray-400"
            }`}
          >
            1 Shopping Cart
          </button>

          <span className="text-gray-400">›</span>

          <button
            onClick={() => setStep("checkout")}
            className={`font-bold cursor-pointer ${
              step === "checkout" ? "text-red-500" : "text-gray-400"
            }`}
          >
            2 Checkout details
          </button>

          <span className="text-gray-400">›</span>

          <span
            className={`font-bold cursor-pointer ${
              step === "complete" ? "text-red-500" : "text-gray-400"
            }`}
          >
            3 Order Complete
          </span>
        </div>

        {step === "cart" && (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1 bg-white p-5">
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-xl mb-4">
                    Your cart is empty
                  </p>
                  <button
                    onClick={() => router.push("/shop")}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <table className="w-full text-left border-collapse border border-gray-300">
                    <thead className="bg-[#f7edee] border-b border-gray-300">
                      <tr>
                        <th className="py-5 px-50 text-left">Product</th>
                        <th className="py-5 px-2 text-left">Price</th>
                        <th className="py-5 px-2 text-left">Quantity</th>
                        <th className="py-5 px-2 text-left">Subtotal</th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {cartItems.map((item, idx) => (
                        <tr
                          key={`${item.id}_${item.size}_${item.color}_${idx}`}
                          className="border-b border-[#f7edee]"
                        >
                          <td className="py-2 flex items-center gap-11 pl-5">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-gray-900 cursor-pointer border rounded-full w-5 h-5 flex items-center justify-center"
                            >
                              ✕
                            </button>

                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />

                            <span className="text-xl max-w-xs text-black hover:text-red-500 cursor-pointer">
                              {item.name}
                            </span>
                          </td>
                          <td className="py-2 text-md">
                            ₹{item.price.toFixed(2)}
                          </td>
                          <td className="py-2 flex items-center gap-2">
                            <button
                              onClick={() => decrementQuantity(item.id)}
                              className="px-2 py-1 border rounded cursor-pointer"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => incrementQuantity(item.id)}
                              className="px-2 py-1 border rounded cursor-pointer"
                            >
                              +
                            </button>
                          </td>
                          <td className="py-2 text-md">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Suggested Products */}
                  <div className="mt-5 bg-rose-50 p-3 rounded">
                    <h2 className="font-bold mb-2">
                      You may be interested in…
                    </h2>
                    <div className="flex flex-col gap-3">
                      {suggestedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center justify-between gap-3 bg-white p-2"
                        >
                          <div className="relative flex items-center gap-5 pl-2">
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow z-10">
                              SALE
                            </span>

                            <div className="relative group">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-30 h-30 object-cover rounded"
                              />

                              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="relative">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-black bg-white rounded-full cursor-pointer"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-black hover:text-red-600 font-semibold text-xl cursor-pointer mb-2">
                                {prod.name}
                              </p>
                              <p className="text-gray-400 text-lg">
                                {prod.category}
                              </p>
                            </div>
                          </div>

                          <span className="font-semibold text-lg text-gray-600">
                            {prod.priceRange}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cart Totals */}
            {cartItems.length > 0 && (
              <div className="w-full lg:w-1/3 bg-white rounded shadow h-[400] mt-6">
                <h2 className="text-4xl items-center font-bold mb-5 bg-[#f8ecee] p-9 rounded-t">
                  Cart totals
                </h2>

                <div className="flex justify-between py-3 px-5 border-b">
                  <span className="text-gray-700 text-lg">Subtotal</span>
                  <span className="text-gray-900 font-medium text-lg">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-3 px-5 border-b font-bold text-lg">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="px-5 mt-5">
                  <p className="mb-3 text-gray-700">Have a coupon?</p>
                  <button
                    onClick={() => setStep("checkout")}
                    className="bg-red-500 hover:bg-red-600 text-white py-5 w-[50%] rounded-full text-sm font-semibold transition"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-15">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="inline-block text-4xl font-bold mb-4 pb-5 border-b-2 border-[#d1d1d1]">
                  Customer information
                </h2>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Username or Email Address *"
                  className="w-full border rounded p-2 mt-3 hover:border-[#e67070] focus:outline-none transition duration-200"
                />
              </div>

              <div>
                <h2 className="inline-block text-4xl font-bold mb-7 pb-5 border-b-2 border-[#d1d1d1]">
                  Billing details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name *"
                    className="border rounded border-gray-300 p-2 mb-3"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name *"
                    className="border rounded border-gray-300 p-2 mb-3"
                  />
                </div>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="border rounded border-gray-300 p-2 w-full mt-3"
                >
                  <option>India</option>
                  <option>Pakistan</option>
                  <option>Bangladesh</option>
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <input
                    type="text"
                    name="houseAddress"
                    value={formData.houseAddress}
                    onChange={handleInputChange}
                    placeholder="House number and street name *"
                    className="border rounded border-gray-300 p-2 mt-3"
                  />
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="border rounded border-gray-300 p-2 mt-3"
                  />
                </div>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Town / City *"
                  className="border rounded border-gray-300 p-2 w-full mt-3"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  className="border rounded border-gray-300 p-2 w-full mt-5"
                />

                {formError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-3">
                    {formError}
                  </div>
                )}

                {!showShippingMethods && (
                  <button
                    onClick={handleContinueToShipping}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition mt-5"
                  >
                    Continue to Shipping Methods
                  </button>
                )}
              </div>

              {/* Shipping Methods Section */}
              {/* {showShippingMethods && !isCODSelected && (
                <div>
                  <h2 className="inline-block text-4xl font-bold mb-7 pb-5 border-b-2 border-[#d1d1d1]">
                    Shipping Methods
                  </h2>

                  {loadingShipping ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-3 border-red-500 border-t-transparent mx-auto"></div>
                      <p className="text-gray-600 mt-3 text-sm">
                        Loading shipping methods...
                      </p>
                    </div>
                  ) : shippingMethods.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <p className="text-gray-600">
                        No shipping methods available
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {shippingMethods.map((method) => (
                        <div
                          key={method._id}
                          onClick={() => setSelectedShipping(method)}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedShipping?._id === method._id
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                name="shipping"
                                checked={selectedShipping?._id === method._id}
                                onChange={() => setSelectedShipping(method)}
                                className="mt-1 accent-red-500"
                              />
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900">
                                  {method.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {method.description}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-lg text-gray-900">
                              ₹{method.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )} */}

              {showShippingMethods && (
                <>
                  <div className="mt-10">
                    <h2 className="text-4xl font-bold mb-10">Payment Method</h2>
                    <div className="pl-15 max-w-3xl space-y-4">
                      {/* ✅ Card Payment with Stripe */}
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                          !isCODSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 bg-white"
                        }`}
                        onClick={() => setIsCODSelected(false)}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={!isCODSelected}
                            onChange={() => setIsCODSelected(false)}
                            className="mr-3 mt-1 accent-blue-500 cursor-pointer"
                          />
                          <div>
                            <p className="text-gray-900 text-xl font-semibold">
                              💳 Card Payment (Stripe)
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              Pay securely with your credit/debit card
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* ✅ Cash on Delivery */}
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                          isCODSelected
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 bg-white"
                        }`}
                        onClick={() => setIsCODSelected(true)}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={isCODSelected}
                            onChange={() => setIsCODSelected(true)}
                            className="mr-3 mt-1 accent-green-500 cursor-pointer"
                          />
                          <div>
                            <p className="text-gray-900 text-xl font-semibold">
                              💵 Cash on Delivery
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              Pay when you receive your order (₹{COD_CHARGES}{" "}
                              extra charges)
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <p className="mt-5 text-lg text-gray-500 pl-15">
                      Have a coupon?
                    </p>
                  </div>

                  {/* ✅ Payment Buttons */}
                  <div className="pl-15 max-w-3xl">
                    {isCODSelected ? (
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition mt-4"
                      >
                        PLACE ORDER (COD) - ₹{total.toFixed(2)}
                      </button>
                    ) : (
                      <button
                        onClick={handleStripeCheckout}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition mt-4"
                      >
                        PAY WITH CARD - ₹{total.toFixed(2)}
                      </button>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-center mt-5">
                <button
                  onClick={() => {
                    setStep("cart");
                    setShowShippingMethods(false);
                    setIsCODSelected(false);
                    setFormError("");
                  }}
                  className="text-sm text-gray-600 underline cursor-pointer hover:text-gray-800"
                >
                  &lt; Back to Cart
                </button>
              </div>
            </div>

            <div className="bg-white rounded shadow h-fit mt-20">
              <h2 className="text-3xl font-bold mb-5 p-5 rounded-t">
                Your order
              </h2>
              <div className="px-5">
                <div className="flex justify-between items-center py-2 pb-5 border-b-2 border-gray-300 mb-6">
                  <span className="font-medium text-gray-700">Product</span>
                  <span className="font-medium text-gray-700">Subtotal</span>
                </div>

                {cartItems.map((item, idx) => (
                  <div
                    key={`${item.id}_${idx}`}
                    className="flex justify-between items-center pb-5 py-2 border-b-2 border-gray-300"
                  >
                    <div className="flex items-start space-x-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-15 h-15 rounded object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-md leading-tight">{item.name}</p>
                        <span className="text-gray-500 text-sm">
                          × {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="flex justify-between py-3 border-b-2 pb-5 border-gray-300">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                {selectedShipping && (
                  <div className="flex justify-between py-3 border-b-2 pb-5 border-gray-300">
                    <span className="text-gray-700">
                      Shipping ({selectedShipping.name})
                    </span>
                    <span className="text-gray-900 font-medium">
                      ₹{selectedShipping.price.toFixed(2)}
                    </span>
                  </div>
                )}

                {isCODSelected && (
                  <div className="flex justify-between py-3 border-b-2 pb-5 border-gray-300">
                    <span className="text-gray-700">COD Charges</span>
                    <span className="text-gray-900 font-medium">
                      ₹{COD_CHARGES.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between py-3 font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded shadow-md mt-10">
            <div className="text-green-500 text-7xl mb-5">✅</div>

            <h1 className="text-4xl font-bold mb-3 text-gray-800">
              Thank you! Your order has been received.
            </h1>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-5 w-full max-w-3xl text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center border-b border-gray-300 pb-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm uppercase">
                    Order Number
                  </p>
                  <p className="text-lg font-semibold">
                    {completedOrder?._id
                      ? `#${completedOrder._id.slice(-8)}`
                      : "#N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm uppercase">Date</p>
                  <p className="text-lg font-semibold">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm uppercase">Total</p>
                  <p className="text-lg font-semibold">₹{total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm uppercase">
                    Payment Method
                  </p>
                  <p className="text-lg font-semibold">
                    {paymentMethodUsed === "COD"
                      ? "Cash on Delivery"
                      : "Card Payment (Stripe)"}
                  </p>
                </div>
              </div>

              {completedOrder && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    ✅ Order Status:{" "}
                    <span className="font-bold text-green-600 uppercase">
                      {completedOrder.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    📧 Confirmation sent to:{" "}
                    <span className="font-bold">{formData.email}</span>
                  </p>
                </div>
              )}

              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Product</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, idx) => (
                    <tr key={`${item.id}_${idx}`} className="border-t">
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {selectedShipping && (
                    <tr className="border-t">
                      <td className="py-2 px-4">
                        Shipping ({selectedShipping.name})
                      </td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">
                        ₹{selectedShipping.price.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {isCODSelected && (
                    <tr className="border-t">
                      <td className="py-2 px-4">COD Charges</td>
                      <td className="py-2 px-4">-</td>
                      <td className="py-2 px-4">₹{COD_CHARGES.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="border-t font-bold">
                    <td className="py-3 px-4">Total</td>
                    <td></td>
                    <td className="py-3 px-4">₹{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  dispatch(clearCart());
                  setCompletedOrder(null);
                  setPaymentMethodUsed("");
                  setSelectedShipping(null);
                  setShowShippingMethods(false);
                  setIsCODSelected(false);
                  setFormError("");
                  setFormData({
                    email: "",
                    firstName: "",
                    lastName: "",
                    country: "India",
                    houseAddress: "",
                    apartment: "",
                    city: "",
                    phone: "",
                  });
                  router.push("/home");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition"
              >
                Back to Home
              </button>

              <button
                onClick={() => router.push("/profile")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition"
              >
                View My Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
