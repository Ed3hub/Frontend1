import React, { useState } from "react";
import { Eye, Lock, Ban } from "lucide-react";

const CourseVisibility = () => {
  // Initial states for the two sections
  const initialVisibility = {
    public: true,
    unlisted: false,
    private: false,
    tokenGated: false,
    scheduled: false,
  };

  const initialPreview = {
    public: true,
    tokenHolder: false,
    guest: false,
  };

  const [visibility, setVisibility] = useState(initialVisibility);
  const [preview, setPreview] = useState(initialPreview);

  // Toggle function for visibility checkboxes
  const handleVisibilityChange = (key: keyof typeof initialVisibility) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle function for preview checkboxes
  const handlePreviewChange = (key: keyof typeof initialPreview) => {
    setPreview((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Reset function to uncheck everything
  const handleReset = () => {
    const clearedVisibility = Object.keys(visibility).reduce(
      (acc, key) => { acc[key as keyof typeof initialVisibility] = false; return acc; },
      { ...initialVisibility }
    );

    const clearedPreview = Object.keys(preview).reduce(
      (acc, key) => { acc[key as keyof typeof initialPreview] = false; return acc; },
      { ...initialPreview }
    );

    setVisibility(clearedVisibility);
    setPreview(clearedPreview);
  };

  const handleSave = () => {
    console.log("Saving Visibility Settings:", { visibility, preview });
    alert("Visibility settings saved!");
  };

  return (
    <div className="max-w-xl mx-auto py-8 bg-white font-sans text-[#1a1a1a]">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-base font-bold mb-2">Set Course Visibility</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Control who can access your course—choose public, private,
          token-gated, or scheduled visibility.
        </p>
      </header>

      {/* Visibility Type Section */}
      <section className="mb-10">
        <h3 className="text-sm font-medium text-gray-400 mb-4">
          Visibility Type
        </h3>
        <div className="space-y-4">
          {[
            { id: "public", label: "Public" },
            { id: "unlisted", label: "Unlisted" },
            { id: "private", label: "Private" },
            { id: "tokenGated", label: "Token-Gated" },
            { id: "scheduled", label: "Scheduled" },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={item.id}
                checked={visibility[item.id as keyof typeof initialVisibility]}
                onChange={() => handleVisibilityChange(item.id as keyof typeof initialVisibility)}
                className="w-4 h-4 rounded border-gray-300 accent-[#00AEEF] cursor-pointer"
              />
              <label
                htmlFor={item.id}
                className="text-sm font-medium text-gray-800 cursor-pointer"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section className="mb-10">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Preview</h3>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="prev-public"
                checked={preview.public}
                onChange={() => handlePreviewChange("public")}
                className="w-4 h-4 rounded border-gray-300 accent-[#00AEEF] cursor-pointer"
              />
              <label
                htmlFor="prev-public"
                className="text-sm font-medium text-gray-800 cursor-pointer"
              >
                Preview as public
              </label>
            </div>
            <Eye size={20} className="text-gray-700" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="prev-token"
                checked={preview.tokenHolder}
                onChange={() => handlePreviewChange("tokenHolder")}
                className="w-4 h-4 rounded border-gray-300 accent-[#00AEEF] cursor-pointer"
              />
              <label
                htmlFor="prev-token"
                className="text-sm font-medium text-gray-800 cursor-pointer"
              >
                Preview as token holder
              </label>
            </div>
            <Lock size={18} className="text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="prev-guest"
                checked={preview.guest}
                onChange={() => handlePreviewChange("guest")}
                className="w-4 h-4 rounded border-gray-300 accent-[#00AEEF] cursor-pointer"
              />
              <label
                htmlFor="prev-guest"
                className="text-sm font-medium text-gray-800 cursor-pointer"
              >
                Preview as guest
              </label>
            </div>
            <Ban size={18} className="text-gray-400" />
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-12">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Tips</h3>
        <ul className="space-y-2">
          <li className="text-sm text-gray-800 flex items-start gap-2">
            <span className="mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0" />
            Courses set to Private won't appear in search results.
          </li>
          <li className="text-sm text-gray-800 flex items-start gap-2">
            <span className="mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0" />
            Token-gated access may require wallet connection by learners.
          </li>
          <li className="text-sm text-gray-800 flex items-start gap-2">
            <span className="mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0" />
            Scheduling allows pre-launch setup and automatic publishing.
          </li>
        </ul>
      </section>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 pt-8">
        <button
          onClick={handleSave}
          className="bg-[#00AEEF] text-white py-2.5 px-10 rounded-lg font-bold hover:bg-[#008ec3] transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleReset}
          className="bg-white border border-gray-300 text-gray-800 py-2.5 px-10 rounded-lg font-bold hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CourseVisibility;
