"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";

interface Course {
  title: string;
  desc: string;
  category: string;
  price: number;
  rating: number;
  reviews: string;
  img: string;
  instructor: string;
  bestSeller: boolean;
  categoryBg: string;
  catColor: string;
}

/** * SECTION 5: TRENDING COURSES SECTION
 */
const TrendingCourses: React.FC = () => {
  const courses: Course[] = [
    {
      title: "Complete Web Development Bootcamp",
      desc: "Master HTML, CSS, JavaScript, React and build real-world projects.",
      category: "Development",
      price: 89,
      rating: 4.9,
      reviews: "2.4k",
      img: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b93c3b4ba7-e6d262df4d849c43430f.png",
      instructor: "John Smith",
      bestSeller: true,
      categoryBg: "#EBF2FE",
      catColor: "#579FF9",
    },
    {
      title: "UI/UX Design Masterclass",
      desc: "Learn design thinking, Figma, prototyping and create stunning interfaces.",
      category: "Design",
      price: 79,
      rating: 4.8,
      reviews: "1.8k",
      img: "https://storage.googleapis.com/uxpilot-auth.appspot.com/620af3fda3-4171be31550b79881e0e.png",
      instructor: "Sarah Johnson",
      bestSeller: false,
      categoryBg: "#EBF2FE",
      catColor: "#579FF9",
    },
    {
      title: "Python for Data Science & ML",
      desc: "Master Python, NumPy, Pandas and build ML models from scratch.",
      category: "Data Science",
      price: 99,
      rating: 4.9,
      reviews: "3.2k",
      img: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6998e592dd-4ccd9b81f3ed80256d86.png",
      instructor: "Mike Chen",
      bestSeller: true,
      categoryBg: "#DCFCE7",
      catColor: "#16A34A",
    },
  ];

  return (
    <section id="courses" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-16">
          <div className="w-fit px-4 mx-auto py-1.5 rounded-full bg-[#E6EEFA] text-blue-600 text-md font-semibold uppercase mb-4">
            popular courses
          </div>{" "}
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-center">
            Trending Courses
          </h3>
          <p className="text-slate-600 text-lg font-medium text-center">
            Explore our most popular courses and start learning today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <Image
                  src={course.img}
                  alt={course.title}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div
                    className="px-4 p-1.5 rounded-full font-bold"
                    style={{
                      backgroundColor: course.categoryBg,
                      color: course.catColor,
                    }}
                  >
                    {course.category}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star size={16} fill="currentColor" /> {course.rating}{" "}
                    <span className="text-slate-400 font-medium">
                      ({course.reviews})
                    </span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {course.title}
                </h4>
                <p className="mt-3 pb-3 mb-4 text-gray-500 font-medium border-b border-slate-100">
                  {course.desc}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${idx}`}
                        alt={course.instructor}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-md font-semibold text-black">
                      {course.instructor}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#3B82F6]">
                    ${course.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/courses">
            <button className="bg-gradient-to-r from-[#3C83F6] from-20% to-[#5EA3FA] to-80% text-white px-10 py-4 rounded-md font-bold text-lg hover:shadow-lg shadow-blue-300 flex items-center gap-3 mx-auto active:scale-95 group">
              View All Courses
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;