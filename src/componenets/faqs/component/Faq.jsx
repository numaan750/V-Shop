"use client";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const Faq = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 bg-white">
      <div className="Mycontainer space-y-16">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left mb-6">
            Returns & Exchanges
          </h2>

          <div
            className="border-b border-gray-400 py-5 cursor-pointer"
            onClick={() => toggle(1)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                What is your return policy?
              </h3>
              <FaChevronRight
                className={`text-gray-800 transition-transform duration-300 ${
                  open === 1 ? "rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                open === 1 ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                We accept returns within 30 days of purchase if the item is
                unused and in its original packaging.
              </p>
            </div>
          </div>

          <div
            className="border-b border-gray-400 py-5 cursor-pointer"
            onClick={() => toggle(2)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                How do I start a return or exchange?
              </h3>
              <FaChevronRight
                className={`text-gray-800 transition-transform duration-300 ${
                  open === 2 ? "rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                open === 2 ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                You can initiate a return through your account or contact our
                support team for assistance.
              </p>
            </div>
          </div>

          <div
            className="border-b border-gray-400 py-5 cursor-pointer"
            onClick={() => toggle(3)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                When will I get my refund?
              </h3>
              <FaChevronRight
                className={`text-gray-800 transition-transform duration-300 ${
                  open === 3 ? "rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                open === 3 ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Refunds are processed within 5–7 business days after we receive
                your returned item.
              </p>
            </div>
          </div>

          <div
            className="border-b border-gray-400 py-5 cursor-pointer"
            onClick={() => toggle(4)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                Can I exchange an item for a different size?
              </h3>
              <FaChevronRight
                className={`text-gray-800 transition-transform duration-300 ${
                  open === 4 ? "rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                open === 4 ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Yes! Exchanges are available for size or color, depending on
                stock availability.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left mb-6">
            Ordering & Payment
          </h2>
          {[
            {
              id: 5,
              q: "What payment methods do you accept?",
              a: "We accept Visa, MasterCard, PayPal, and Apple Pay.",
            },
            {
              id: 6,
              q: "Can I apply a promo code or gift card at checkout?",
              a: "Yes, enter your promo or gift card code during checkout before payment.",
            },
            {
              id: 7,
              q: "Can I modify or cancel my order after placing it?",
              a: "Orders can be changed or canceled within 1 hour of placing them.",
            },
            {
              id: 8,
              q: "Do you offer pre-orders?",
              a: "Occasionally we open pre-orders for limited collections.",
            },
          ].map(({ id, q, a }) => (
            <div
              key={id}
              className="border-b border-gray-400 py-5 cursor-pointer"
              onClick={() => toggle(id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                  {q}
                </h3>
                <FaChevronRight
                  className={`text-gray-800 transition-transform duration-300 ${
                    open === id ? "rotate-90" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  open === id ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-sm sm:text-base mt-2">{a}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left mb-6">
            Shipping & Delivery
          </h2>
          {[5, 6, 7, 8].map((id) => (
            <div
              key={id + "ship"}
              className="border-b border-gray-400 py-5 cursor-pointer"
              onClick={() => toggle(id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                  {id === 5
                    ? "How long does shipping take?"
                    : id === 6
                    ? "Do you offer international shipping?"
                    : id === 7
                    ? "Can I track my shipment?"
                    : "Do you offer express delivery?"}
                </h3>
                <FaChevronRight
                  className={`text-gray-800 transition-transform duration-300 ${
                    open === id ? "rotate-90" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  open === id ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                  {
                    {
                      5: "Standard shipping usually takes 3–7 business days.",
                      6: "Yes, we ship to many countries worldwide. Fees vary by location.",
                      7: "Tracking numbers are provided once your order ships.",
                      8: "Express delivery is available for select areas.",
                    }[id]
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left mb-6">
            Sizing & Fit
          </h2>
          {[5, 6, 7, 8].map((id) => (
            <div
              key={id + "fit"}
              className="border-b border-gray-400 py-5 cursor-pointer"
              onClick={() => toggle(id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                  {id === 5
                    ? "How do I find my size?"
                    : id === 6
                    ? "Do you offer a size chart?"
                    : id === 7
                    ? "What if an item doesn’t fit?"
                    : "Are your sizes true to standard?"}
                </h3>
                <FaChevronRight
                  className={`text-gray-800 transition-transform duration-300 ${
                    open === id ? "rotate-90" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  open === id ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                  {
                    {
                      5: "Use our size guide on each product page for accurate measurements.",
                      6: "Yes, detailed size charts are provided for all categories.",
                      7: "Returns and exchanges are available if sizing isn’t right.",
                      8: "Our sizing follows standard international measurements.",
                    }[id]
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
