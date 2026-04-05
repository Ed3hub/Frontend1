import React, { useState } from 'react';
import { Gift, X } from 'lucide-react';

interface CourseCompletionModalProps {
  setActivePage: (page: string) => void;
}

const CourseCompletionModal: React.FC<CourseCompletionModalProps> = ({ setActivePage }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Congratulations</h2>
          <p className="text-lg text-gray-600 mb-8">You’re half way to the end of the course</p>

          <div className="relative inline-block mb-10">
            <Gift className="w-24 h-24 text-red-500" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            <div className="absolute top-1/4 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-8 py-3.5 border border-gray-300 rounded-xl text-gray-700 font-semibold text-base hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setActivePage('tokens');
              }}
              className="flex-1 px-8 py-3.5 border border-blue-400 rounded-xl text-blue-400 font-semibold text-base bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              Tokens Earned
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCompletionModal;
