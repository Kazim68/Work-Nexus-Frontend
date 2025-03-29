import React from "react";
import { FaArrowRight, FaRegCreditCard } from "react-icons/fa"; // Import Credit Card Icon
import ArrowButton from "../../Shared/ArrowButton";

const PaymentSetup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        {/* Heading with Icon */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Just one Step To Go! <br />
            <span className="text-gray-700">Setup Payment Method</span>
          </h2>
          <FaRegCreditCard className="text-3xl text-gray-600" /> {/* Card Icon */}
        </div>

        {/* Payment Form */}
        <div className="mt-6 space-y-4">
          {/* Credit Card Number */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Credit Card Number
            </label>
            <input
              type="text"
              placeholder="Enter Credit Card Number"
              className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Full Name on Card */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Full Name On Card
            </label>
            <input
              type="text"
              placeholder="Enter Name Displayed On Your Card Here"
              className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Expiry Date & CIV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">CIV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Proceed Button */}
          <button className="cursor-pointer w-full flex justify-center items-center gap-2 bg-teal-700 text-white font-bold py-3 rounded-lg hover:bg-teal-800 transition">
            Proceed
          </button>
        </div>

        {/* Subscription Summary */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between font-semibold text-gray-700">
            <span>Organization Name</span>
            <span>PLAN TYPE</span>
          </div>
          <div className="mt-2 text-gray-600 text-sm">
            <p>Username: *</p>
            <p>Email: *</p>
            <p>Organization Type: *</p>
          </div>
          <div className="mt-2 text-right font-bold text-gray-900 text-xl">
            $XX <span className="text-sm font-normal text-gray-600">/Month</span>
          </div>
        </div>
      </div>



    </div>
  );
};

export default PaymentSetup;
