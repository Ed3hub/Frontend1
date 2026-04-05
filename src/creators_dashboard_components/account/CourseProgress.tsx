import React from "react";
import { Star, Users, Clock } from "lucide-react"; // Optional: using lucide-react for icons

const courses = [
  {
    id: 1,
    title: "Ethereum Development",
    rating: 4.8,
    students: 283,
    duration: "3hr 45min",
    image:
      "https://images.unsplash.com/photo-1626162987518-4fee900a9323?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXRoZXJldW18ZW58MHx8MHx8fDA%3D", // Replace with your Ethereum icon
  },
  // ... duplicate this for as many cards as you need
];

interface Course {
  id: number;
  title: string;
  rating: number;
  students: number;
  duration: string;
  image: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      {/* Course Image */}
      <div className="relative mb-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover rounded-xl"
        />
      </div>

      {/* Course Details */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 text-[13px] leading-tight w-2/3">
            {course.title}
          </h3>
          <div className="flex items-center text-yellow-500 font-semibold">
            <Star size={16} fill="currentColor" className="mr-1" />
            <span className="text-gray-400">{course.rating}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-gray-400 text-[0.8rem]">
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{course.students} Students</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseProgress = () => {
  // Creating an array of 12 items to match your grid
  const courseList = Array(12).fill(courses[0]);

  return (
    <div className="max-w-7xl mx-auto p-8 min-h-screen">
      <header className="mb-8">
        <h1 className="text-base font-bold text-gray-900 mb-6">
          Course Progress
        </h1>
        <h2 className="text-sm font-semibold text-gray-700">My Courses</h2>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseList.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseProgress;
