import React, { useState } from "react";
import { Check } from "lucide-react";

/** * SECTION 8: PRICING PLAN SECTION
 */
const PricingPlan = () => {
  const plans = [
    {
      name: "Basic",
      note: "Perfect for beginners",
      price: "29",
      features: [
        "Access to 100+ courses",
        "HD video quality",
        "Mobile app access",
        "Community support",
      ],
      best: false,
    },
    {
      name: "Pro",
      note: "For serious learners",
      price: "79",
      features: [
        "Access to all 1,200+ courses",
        "4K video quality",
        "Offline downloads",
        "Priority support",
        "Certificates included",
      ],
      best: true,
    },
    {
      name: "Ultimate",
      note: "For teams & organizations",
      price: "299",
      features: [
        "Unlimited team members",
        "Custom learning paths",
        "Analytics dashboard",
        "Dedicated account manager",
        "API access",
      ],
      best: false,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(
    plans.findIndex((plan) => plan.best),
  );

  return (
    <section id="pricing" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-md font-medium uppercase mb-4">
            PRICING PLANS
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-slate-600 text-xl">
            Flexible pricing options to fit your learning goals and budget.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`p-10 rounded-2xl flex flex-col border-2 transition-all cursor-pointer ${
                activeIndex === i
                  ? "bg-gradient-to-r from-[#3C83F6] from-20% to-[#5EA3FA] to-80% text-white border-blue-600 shadow-2xl scale-105 z-10"
                  : "bg-white relative text-slate-900 border-slate-50 shadow-sm"
              }`}
            >
              <div className="mb-8">
                <h3
                  className={`text-md absolute top-[-18px] left-30 px-4 py-1.5 rounded-3xl font-bold bg-[#FACC15] mb-2 ${
                    plan.name === "Pro" ? "block text-black" : "hidden"
                  }`}
                >
                  Most Popular
                </h3>
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    activeIndex === i ? "text-white" : "text-black"
                  }`}
                >
                  {plan.name}
                </h3>
                <p className="mb-4">{plan.note}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span
                    className={
                      activeIndex === i ? "text-blue-200" : "text-black"
                    }
                  >
                    /month
                  </span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow text-left">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 font-medium">
                    <Check
                      size={18}
                      className={
                        activeIndex === i ? "text-blue-200" : "text-[#47CF79]"
                      }
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
                  activeIndex === i
                    ? "bg-white text-blue-600 hover:bg-slate-50"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
