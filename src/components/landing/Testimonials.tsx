"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

interface Review {
  text: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

/** * SECTION 7: TESTIMONIALS SECTION
 */
const Testimonials: React.FC = () => {
  const reviews: Review[] = [
    {
      text: "The web development course completely changed my career. I went from zero coding knowledge to landing my dream job as a frontend developer in just 6 months!",
      author: "David Wilson",
      role: "Frontend Developer",
      avatar: "https://i.pravatar.cc/150?u=alex",
      rating: 5,
    },
    {
      text: "Amazing UI/UX course! The instructor explained complex concepts in such a simple way. Now I'm confidently designing products for major clients.",
      author: "Lisa Anderson",
      role: "UX Designer",
      avatar: "https://i.pravatar.cc/150?u=sam",
      rating: 5,
    },
    {
      text: "Best investment I've made! The data science course gave me the skills to transition into AI. The projects were incredibly practical and relevant.",
      author: "James Martinez",
      role: "Data Analyst",
      avatar: "https://i.pravatar.cc/150?u=david",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-md font-medium uppercase mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of successful learners who transformed their careers.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-slate-50 p-10 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                {/* Star Rating */}
                <div className="flex gap-1 text-[#FACC15] amber-500 mb-8">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={18} fill="currentColor" />
                  ))}
                </div>

                {/* Quote Content */}
                <div className="relative">
                  <Quote
                    className="absolute -top-6 -left-4 text-blue-100 w-12 h-12 -z-10 group-hover:text-blue-200 transition-colors"
                    fill="currentColor"
                  />
                  <p className="text-slate-700 text-md font-normal leading-relaxed relative z-10">
                    &quot;{review.text}&quot;
                  </p>
                </div>
              </div>

              {/* Author Profile */}
              <div className="mt-4 flex items-center gap-4">
                <div className="w-14 h-14">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 leading-tight">
                      {review.author}
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;