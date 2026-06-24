"use client";

import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import RecommendedCourses from '@/learners_dashboard/components/RecommendedCourses';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Master your future with <span className="text-blue-600">Ed3Hub</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Join thousands of learners and gain the skills that matter. From blockchain to design, we have everything you need.
          </p>
        </div>
        
        <RecommendedCourses 
          setActivePage={() => {}} 
          setSelectedCourse={(course) => {
            if (course.slug) router.push(`/course/${course.slug}`);
          }} 
        />
      </main>
      <Footer />
    </div>
  );
}