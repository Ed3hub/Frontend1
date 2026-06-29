import React, { useState, useRef } from "react";
import { Check, ChevronDown, Paperclip, X } from "lucide-react";

const Pricing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("free");

  // Step 2 States
  const [courseTitle, setCourseTitle] = useState(
    "Introduction to DAOs — Governance on the Blockchain"
  );
  const [tagline, setTagline] = useState(
    "Learn how decentralized organizations operate without central authority"
  );
  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [walletRequired, setWalletRequired] = useState(true);
  const [freeCertificate, setFreeCertificate] = useState(true);
  const [categories, setCategories] = useState({
    DAO: true,
    Beginner: false,
    Web3Basics: false,
    Governance: true,
  });
  const [accessTypes, setAccessTypes] = useState({
    Free: true,
    Paid: false,
    TokenGated: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const plans = [
    {
      id: "free",
      title: "Free courses",
      price: "0",
      features: [
        "Open-access with no payment required",
        "Optional quizzes and basic self-checks",
        "Limited downloadable resources",
        "Basic community discussion access",
        "Optional PDF or on-chain certificate",
        "Limited live sessions and support",
      ],
    },
    {
      id: "paid",
      title: "Paid courses",
      price: "100",
      features: [
        "One-time or subscription payment required",
        "Full access to premium content and resources",
        "Standard or on-chain certificate-included",
        "Detailed learner progress tracking",
        "Access to live Q&A sessions and mentoring",
        "Built for professionals and structured learning",
        "Responsive support and help center access",
      ],
    },
    {
      id: "token",
      title: "Token-Gated courses",
      price: "0",
      features: [
        "Requires wallet and specific token/NFT ownership",
        "No fiat needed — decentralized access",
        "Auto-issued on-chain certificate (NFT or SBT)",
        "Token-gated community participation",
        "Exclusive access to live sessions and content",
        "On-chain progress with badges and milestones",
        "Ideal for Web3-savvy learners and crypto communities",
        "Creators earn via tokens or NFT access",
      ],
    },
  ];

  const handleScheduleSelect = (type: string) => {
    setSelectedSchedule(type);
    setShowScheduleDropdown(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(file);
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const displayTitle = selectedSchedule
    ? `${courseTitle} (${selectedSchedule})`
    : courseTitle;

  return (
    <div className="max-w-xl mx-auto py-8 bg-white font-sans text-[#1a1a1a]">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {currentStep === 1 ? (
        /* --- STEP 1: PLAN SELECTION --- */
        <div className="animate-in fade-in duration-300">
          <header className="mb-8">
            <h2 className="text-base font-bold">Pricing and Access Control</h2>
            <p className="text-xs text-gray-500 mt-1">
              Set your course as free, paid, or token-gated and manage who can
              join.
            </p>
          </header>

          <div className="space-y-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer border-2 transition-all rounded-2xl p-6 ${
                  selectedPlan === plan.id
                    ? "bg-[#E3F5FF] border-[#B2E7FF]"
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <h3 className="text-sm font-bold mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-bold">$ {plan.price}</span>
                  <span className="text-xs text-gray-500 font-medium">
                    /month
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className={`mt-1 flex-shrink-0 ${
                          selectedPlan === plan.id
                            ? "text-[#00AEEF]"
                            : "text-green-500"
                        }`}
                      >
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-[11px] font-medium leading-tight text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-40 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    selectedPlan === plan.id
                      ? "bg-[#00AEEF] text-white"
                      : "bg-[#D9D9D9] text-gray-500"
                  }`}
                >
                  Try It Now
                </button>
              </div>
            ))}
          </div>

          <footer className="flex justify-end gap-4 mt-12 pt-8">
            <button className="bg-[#00AEEF] text-white py-2.5 px-10 rounded-lg font-bold">
              Save
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-white border border-gray-300 text-gray-800 py-2.5 px-10 rounded-lg font-bold"
            >
              Next
            </button>
          </footer>
        </div>
      ) : (
        /* --- STEP 2: FREE COURSE SETUP --- */
        <div className="animate-in slide-in-from-right-4 duration-300">
          <header className="mb-8">
            <h2 className="text-base font-bold">Pricing and Access Control</h2>
            <p className="text-xs text-gray-800 font-medium mt-2">
              Free Course Setup
            </p>
          </header>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Course Title
              </label>
              <div
                onClick={() => setShowScheduleDropdown(!showScheduleDropdown)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer text-sm text-black"
              >
                <span>{displayTitle}</span>
                <ChevronDown size={18} className="text-gray-400" />
              </div>
              {showScheduleDropdown && (
                <div className="absolute right-0 top-full mt-[-2px] w-1/2 border border-gray-200 bg-white rounded-b-lg shadow-lg z-20 text-xs">
                  <div
                    onClick={() => handleScheduleSelect("Self-paced")}
                    className="px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 cursor-pointer text-black"
                  >
                    Self-paced
                  </div>
                  <div
                    onClick={() => handleScheduleSelect("Scheduled")}
                    className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-black"
                  >
                    Scheduled
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Tagline
              </label>
              <textarea
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm text-black resize-none outline-none"
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-gray-400">
                Select Category
              </label>
              {Object.keys(categories).map((cat) => (
                <div key={cat} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={categories[cat as keyof typeof categories]}
                    onChange={() =>
                      setCategories({ ...categories, [cat]: !categories[cat as keyof typeof categories] })
                    }
                    className="accent-[#00AEEF]"
                  />
                  <label className="text-xs font-medium text-gray-700">
                    {cat === "Web3Basics" ? "Web3 Basics" : cat}
                  </label>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400">
                  Upload Course Thumbnails
                </span>
                <Paperclip
                  size={18}
                  className="text-gray-400 cursor-pointer hover:text-[#00AEEF]"
                  onClick={() => fileInputRef.current?.click()}
                />
              </div>
              {thumbnail && (
                <div className="mt-2 flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md border border-blue-100">
                  <span className="text-xs text-blue-700 truncate font-medium">
                    {thumbnail.name}
                  </span>
                  <button
                    onClick={removeThumbnail}
                    className="text-blue-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-bold text-black">Pricing Type</h3>
              <div className="space-y-3">
                <label className="block text-xs font-medium text-gray-400">
                  Access Type
                </label>
                {Object.keys(accessTypes).map((type) => (
                  <div key={type} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={accessTypes[type as keyof typeof accessTypes]}
                      onChange={() =>
                        setAccessTypes({
                          ...accessTypes,
                          [type]: !accessTypes[type as keyof typeof accessTypes],
                        })
                      }
                      className="accent-[#00AEEF]"
                    />
                    <label className="text-xs font-medium text-gray-700">
                      {type === "TokenGated" ? "Token-gated" : type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-4">
              {[
                {
                  label: "Wallet required for certificate",
                  state: walletRequired,
                  setState: setWalletRequired,
                },
                {
                  label: "Offer free certificate on completion",
                  state: freeCertificate,
                  setState: setFreeCertificate,
                },
              ].map((toggle, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-800">
                    {toggle.label}
                  </span>
                  <button
                    onClick={() => toggle.setState(!toggle.state)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                      toggle.state ? "bg-[#00AEEF]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                        toggle.state ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <footer className="flex justify-end gap-4 mt-12 pt-8">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-white border border-gray-300 text-gray-800 py-2.5 px-10 rounded-lg font-bold"
            >
              Back
            </button>
            <button className="bg-[#00AEEF] text-white py-2.5 px-10 rounded-lg font-bold">
              Save
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Pricing;
