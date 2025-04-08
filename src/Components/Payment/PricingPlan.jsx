import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { create } from '../../Api/Api';

const PricingPlan = () => {
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: 0, features: [] });

  const handlePricingPlan = (planName, price, features) => {
    setSelectedPlan({ name: planName, price: price, features: features });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProceed = async(amount) => {
    
      try {
        const res = await create('/payment/create-checkout-session' , {amount:amount});
        window.location.href = res.data.url; // redirect to Stripe
      } catch (err) {
        console.error('Checkout error:', err);
        alert('Payment failed');
      }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Choose A Pricing Plan For Your Organization
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          {
            name: "Free Plan",
            price: 0,
            features: ["5 Users", "Basic Support", "5GB Storage", "Basic Analytics"]
          },
          {
            name: "Monthly",
            price: 50,
            features: ["50 Users", "Priority Support", "50GB Storage", "Advanced Analytics"]
          },
          {
            name: "Yearly (20% Off)",
            price: 1000,
            features: ["Unlimited Users", "Priority Support", "500GB Storage", "AI Insights"]
          }
        ].map((plan, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg border border-teal-500 text-center hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
            <p className="text-gray-600 mb-6">Great for {index === 0 ? "individuals" : index === 1 ? "businesses" : "teams"}.</p>
            <ul className="space-y-3 text-gray-700 text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✅ {feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handlePricingPlan(plan.name, plan.price, plan.features)}
              className="mt-6 w-full py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-700 transition duration-300 cursor-pointer"
            >
              {plan.name === "Free Plan" ? "Get Started" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-xl w-96 transform transition-all duration-300 scale-100 opacity-100">
            <h3 className="text-3xl font-semibold text-teal-600 mb-4">{selectedPlan.name}</h3>
            <p className="text-xl text-gray-700 mb-6">Price: <span className="text-teal-600">${selectedPlan.price}</span> per month</p>
            <div className="text-gray-600 mb-6">
              <h4 className="font-semibold text-lg mb-2">Plan Features:</h4>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-teal-500 mr-2">✅</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition duration-300 mr-4"
              >
                Close
              </button>
              <button
                onClick={()=>handleProceed(selectedPlan.price)}
                className="py-2 px-4 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPlan;
