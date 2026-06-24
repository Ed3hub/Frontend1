"use client";

import React, { use, useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import CourseDetails from '@/learners_dashboard/components/CourseDetails';
import { useRouter } from 'next/navigation';

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleAction = (page: string) => {
    if (page === 'recommendedCourses') {
      router.push('/courses');
    } else {
      // Redirect to sign-in for any interactive action (enroll, learn, etc)
      // The CourseDetails component will fetch data publicly if possible
      router.push('/sign-in');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-20">
        <CourseDetails 
          setActivePage={handleAction} 
          course={{ slug, title: '', instructor: '', img: '' }} 
        />
      </main>
      <Footer />
    </div>
  );
}
