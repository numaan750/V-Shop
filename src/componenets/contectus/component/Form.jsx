"use client";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Form = () => {
  const { submitContactForm, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [saveInfo, setSaveInfo] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "All fields are required!",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address!",
      });
      return;
    }

    console.log("Submitting form data:", formData); 

    const result = await submitContactForm(formData);

    console.log("Submit result:", result); 

    if (result.success) {
      setStatus({
        type: "success",
        message: result.message,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setSaveInfo(false);

      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000);
    } else {
      setStatus({
        type: "error",
        message: result.message,
      });
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="Mycontainer grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#f7edee] rounded-3xl py-20 px-12 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-15">
            Send Us Message
          </h2>

          <div className="space-y-10">
            {status.message && (
              <div
                className={`p-4 rounded-md ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {status.message}
              </div>
            )}

            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name *"
                className="w-full rounded-md p-3 border border-gray-300 hover:border-[#e67070] focus:border-red-300 focus:ring-2 focus:ring-red-200 focus:outline-none transition duration-200"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className="w-full rounded-md p-3 border border-gray-300 hover:border-[#e67070] focus:border-red-300 focus:ring-2 focus:ring-red-200 focus:outline-none transition duration-200"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Comment *"
                rows="4"
                className="w-full rounded-md p-3 border border-gray-300 hover:border-[#e67070] focus:border-red-300 focus:ring-2 focus:ring-red-200 focus:outline-none transition duration-200"
              ></textarea>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="save-info"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="accent-[#f0243c]"
              />
              <label htmlFor="save-info" className="text-md text-gray-700">
                Save my name, email and website in this browser
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#f0243c] text-white px-8 py-2 rounded-md font-semibold hover:bg-[#f0374d] disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? "SENDING..." : "SEND"}
            </button>
          </div>
        </div>

        <div className="bg-[#f7edee] rounded-3xl py-20 px-10 shadow-sm">
          <div className="space-y-25">
            <div className="flex items-center gap-4">
              <div className="bg-white text-[#f0243c] p-5 rounded-full shadow">
                <FaEnvelope size={23} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Email</h3>
                <p className="text-gray-700 text-lg ">contact@info.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white text-[#f0243c] p-5 rounded-full shadow">
                <FaPhoneAlt size={23} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Phone</h3>
                <p className="text-gray-700 text-lg">929-242-6868</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white text-[#f0243c] p-5 rounded-full shadow">
                <FaMapMarkerAlt size={23} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Address
                </h3>
                <p className="text-gray-700 text-lg">
                  123 Fifth Avenue, New York, NY 10160
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white text-[#f0243c] p-5 rounded-full shadow">
                <FaHeart size={23} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-5 text-lg ">
                  Follow Us
                </h3>
                <div className="flex gap-4 text-gray-800 text-lg">
                  <Link href="#" target="_blank">
                    <FaInstagram className="hover:text-[#f0243c] cursor-pointer" />
                  </Link>
                  <Link href="#" target="_blank">
                    <FaFacebookF className="hover:text-[#f0243c] cursor-pointer" />
                  </Link>
                  <Link href="#" target="_blank">
                    <FaLinkedinIn className="hover:text-[#f0243c] cursor-pointer" />
                  </Link>
                  <Link href="#" target="_blank">
                    <FaTwitter className="hover:text-[#f0243c] cursor-pointer" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
