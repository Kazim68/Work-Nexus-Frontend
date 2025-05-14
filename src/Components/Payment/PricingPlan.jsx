import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { create, createWithAuth } from "../../Api/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PricingPlan = () => {

  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();


  useEffect(() => {
    if (!data || !data.token) {
      toast.error("Unauthorized, Sign in again");
      navigate("/signin");
    }
  }, [data, navigate]);


  const plans = [
    {
      title: "BASIC",
      subtitle: "for small websites or blogs",
      price: 2,
      color: "#0891b2",
      features: [
        "1 domain name",
        "10 GB of disk space",
        "100GB of bandwidth",
        "1 MySQL database",
        "5 email accounts",
        "cPanel control panel",
        "Free SSL certificate",
        "24/7 support",
      ],
    },
    {
      title: "STANDARD",
      subtitle: "for medium-sized businesses",
      price: 5,
      color: "#059669",
      features: [
        "Unlimited domain name",
        "50 GB of disk space",
        "500GB of bandwidth",
        "10 MySQL database",
        "50 email accounts",
        "cPanel control panel",
        "Free SSL certificate",
        "24/7 support",
      ],
    },
    {
      title: "PREMIUM",
      subtitle: "for small businesses",
      price: 10,
      color: "#c026d3",
      features: [
        "Unlimited domain name",
        "100 GB of disk space",
        "1TB of bandwidth",
        "Unlimited MySQL database",
        "Unlimited email accounts",
        "cPanel control panel",
        "Free SSL certificate",
        "24/7 priority support",
        "Advanced security features",
      ],
    },
  ];

  const employeeId = data.employee._id
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: 0, features: [] });

  const handlePricingPlan = (planName, price, features) => {
    setSelectedPlan({ name: planName, price: price, features: features });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProceed = async (amount, name) => {
    try {
      const res = await createWithAuth('/payment/create-checkout-session', { amount: amount, employeeId: employeeId, planType: name }, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        }
      });
      console.log(res)
      window.location.href = res.data.url; // redirect to Stripe
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Payment failed');
    }

  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#212020] px-4 py-12">
      <div className="bg-[#212020] text-white rounded-2xl p-10 max-w-md w-full shadow-2xl border border-amber-600">
        <h1 className="text-3xl font-bold text-center mb-4">Pay As You Go</h1>
        <p className="text-center text-white mb-6">
          One-time access to the full system. No subscriptions. No hidden fees.
        </p>
        <div className="text-center mb-8">
          <span className="text-5xl font-extrabold text-amber-600">$500</span>
          <p className="text-white text-sm mt-1">One-time payment</p>
        </div>
        <ul className="text-sm text-gray-300 space-y-3 mb-8">
          <li className="flex items-center gap-2">✓ Full access to all features</li>
          <li className="flex items-center gap-2">✓ Attendance & Leave Management</li>
          <li className="flex items-center gap-2">✓ Payroll System</li>
          <li className="flex items-center gap-2">✓ HR Dashboards & Charts</li>
          <li className="flex items-center gap-2">✓ No recurring charges</li>
        </ul>
        <button onClick={()=>handleProceed('premium' , 500)} className="w-full py-3 cursor-pointer bg-amber-600 hover:bg-amber-700 transition rounded-lg font-semibold text-white">
          Pay Now
        </button>
      </div>
    </section>
  );
};

export default PricingPlan;
