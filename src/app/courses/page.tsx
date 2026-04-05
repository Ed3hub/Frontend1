import React from 'react';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Courses
          </h1>
          <p className="text-xl text-gray-600">
            Explore our comprehensive collection of courses
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Courses Coming Soon
          </h2>
          <p className="text-gray-600">
            We're working hard to bring you amazing courses. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}