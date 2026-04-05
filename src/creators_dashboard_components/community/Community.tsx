import React from "react";
import { Clock } from "lucide-react";

const Community = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white font-sans text-[#1a1a1a]">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-blue-50 rounded-full p-6 mb-6">
          <Clock className="w-16 h-16 text-[#00AEEF]" />
        </div>
        <h2 className="text-3xl font-bold mb-3 text-gray-800">Coming Soon</h2>
        <p className="text-gray-600 text-center max-w-md">
          Community and Interaction features are currently under development. 
          Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default Community;
