import React from 'react'
import { useNavigate } from "react-router-dom";

const PricingPlan = () => {

      const navigate = useNavigate()
    
    const handlePricingPlan = ()=>{

        navigate('/payment')

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
  
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Choose A Pricing Plan For Your Organization
      </h2>
  

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">

        {["Free Plan", "Monthly", "Yearly (20% Off)"].map((plan, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg border border-teal-500 text-center hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan}</h3>
            <p className="text-gray-600 mb-6">Great for {index === 0 ? "individuals" : index === 1 ? "businesses" : "teams"}.</p>
            <ul className="space-y-3 text-gray-700 text-left">
              <li>✅ {index === 0 ? "5 Users" : index === 1 ? "50 Users" : "Unlimited Users"}</li>
              <li>✅ {index === 0 ? "Basic Support" : "Priority Support"}</li>
              <li>✅ {index === 0 ? "5GB Storage" : index === 1 ? "50GB Storage" : "500GB Storage"}</li>
              <li>✅ {index === 2 ? "AI Insights" : "Advanced Analytics"}</li>
            </ul>
            <button onClick={handlePricingPlan} className="mt-6 w-full py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-700 transition duration-300 cursor-pointer">
              {index === 0 ? "Get Started" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingPlan
