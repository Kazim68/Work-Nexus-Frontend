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
    console.log(amount)
    try {
      const res = await createWithAuth('/payment/create-checkout-session', { amount: amount, employeeId: employeeId, planType: name }, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        }
      });
      window.location.href = res.data.url; // redirect to Stripe
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Payment failed');
    }

  };

  return (
    <section className="min-h-screen grid place-items-center px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative w-[300px] p-6 pb-20 rounded-md border text-center transition-all hover:-translate-y-2 hover:scale-[1.015] hover:bg-opacity-50 hover:shadow-lg"
            style={{
              borderColor: plan.color,
              backgroundColor: "rgba(38, 38, 38, 0.125)",
            }}
          >
            <div className="mb-6">
              <h4 className="text-xl font-semibold" style={{ color: plan.color }}>
                {plan.title}
              </h4>
              <p className="text-xs text-gray-400">{plan.subtitle}</p>
            </div>

            <p
              className="text-[40px] font-bold mb-6 relative"
              style={{ color: plan.color }}
            >
              ${plan.price}
              <sub className="absolute bottom-1 text-xs text-gray-400 font-light">
                /month
              </sub>
            </p>

            <ul className="text-left mb-6 space-y-3 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-400">
                  <FaCheck className="inline text-white mr-2" />
                  <strong className="text-white">{feature}</strong>
                </li>
              ))}
            </ul>

            <button
              className="absolute bottom-6 left-1/2 cursor-pointer transform -translate-x-1/2 w-40 py-2 rounded border text-sm font-semibold"
              style={{
                backgroundColor: plan.color,
                borderColor: plan.color,
                color: "#e4e4e7",
              }}
              onClick={() => handleProceed(plan.price, plan.title.toLowerCase())}
            >
              SELECT
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlan;
