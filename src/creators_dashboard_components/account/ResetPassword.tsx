import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

const ResetPassword = () => {
  // Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation & UI State
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // 1. Handle Old Password Validation
  const handleValidate = () => {
    setIsValidating(true);
    setStatusMessage({ type: "", text: "" });

    // Simulating an API call for password validation
    setTimeout(() => {
      if (oldPassword === "123456") {
        setIsValidated(true);
        setIsValidating(false);
      } else {
        setIsValidating(false);
        setStatusMessage({
          type: "error",
          text: "Invalid old password. Please try again.",
        });
      }
    }, 1500);
  };

  // 2. Handle Save Changes
  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    // Simulating a successful save
    setStatusMessage({
      type: "success",
      text: "Password updated successfully!",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-white rounded-md border border-gray-100 p-10 w-full max-w-2xl">
        <h1 className="text-base font-bold text-gray-800 mb-10">
          Reset Password
        </h1>

        {/* Status Messages */}
        {statusMessage.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              statusMessage.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Input Old Password Section */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">
            Input Old Password
          </label>
          <p className="text-xs text-gray-400 mb-2">Old Password</p>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isValidated}
            placeholder="Enter old password"
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            onClick={handleValidate}
            disabled={!oldPassword || isValidating || isValidated}
            className={`w-full mt-4 p-4 rounded-xl font-bold transition-all ${
              isValidated
                ? "bg-green-500 text-white"
                : "bg-[#00A3FF] text-white disabled:bg-gray-200 disabled:text-gray-400"
            }`}
          >
            {isValidating
              ? "Validating..."
              : isValidated
                ? "Validated"
                : "Validate"}
          </button>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* New Password Section */}
        <div
          className={`space-y-6 ${!isValidated ? "opacity-40" : "opacity-100"}`}
        >
          <label className="block text-gray-700 font-semibold">
            Input desired new Password
          </label>

          <div>
            <p className="text-xs text-gray-400 mb-2">New Password</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!isValidated}
              className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Confirm New Password</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!isValidated}
              className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-12">
          <button className="px-10 py-4 bg-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValidated || !newPassword || !confirmPassword}
            className="px-10 py-4 bg-[#00A3FF] text-white font-bold rounded-xl disabled:bg-gray-200 disabled:text-gray-400 hover:bg-blue-600 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
