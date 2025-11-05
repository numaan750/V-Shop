import React from 'react'
import { Truck, Package, CreditCard, Headphones } from "lucide-react";


const Features = () => {
  return (
    <div className="w-full bg-[#fff5f5] py-25">
      <div className="Mycontainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Truck className="w-10 h-10 text-rose-600" />
          <h3 className="font-bold text-black text-xl">
            Free Standard Delivery
          </h3>
          <p className="text-gray-600 text-lg">
            On all Orders Over <span className="font-medium">$100</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <Package className="w-10 h-10 text-rose-600" />
          <h3 className="font-bold text-black text-lg">Quick Delivery</h3>
          <p className="text-gray-600 text-lg">
            Delivery within 3 Days across US
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <CreditCard className="w-10 h-10 text-rose-600" />
          <h3 className="font-bold text-black text-lg">Secure Payments</h3>
          <p className="text-gray-600 text-lg">Secure Payment Methods</p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <Headphones className="w-10 h-10 text-rose-600" />
          <h3 className="font-bold text-black text-lg">
            Top Rated Customer Service
          </h3>
          <p className="text-gray-600 text-lg">Quick Responses & Solutions</p>
        </div>
      </div>
    </div>
  )
}

export default Features