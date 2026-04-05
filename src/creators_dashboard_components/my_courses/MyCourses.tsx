'use client';
import React, { useEffect, useState } from 'react';
import { Loader2, Pencil, BookOpen, Eye, EyeOff } from 'lucide-react';
import api from '@/lib/api';

interface Course {
  id: number;
  title: string;
  slug: string;
  skill_level: string;
  price: string;
  is_free: boolean;
  is_published: boolean;
  estimated_hours: number;
  thumbnail: string | null;
  total_enrolled: number;
  description: string;
  what_you_learn: string;
  ideal_for: string;
  tools_used: string;
  what_included: string;
  duration_weeks: number;
  hours_per_week: number;
  is_self_paced: boolean;
}

interface MyCoursesProps {
  onEdit: (course: Course) => void;
}

const MyCourses: React.FC<MyCoursesProps> = ({ onEdit }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses/my/courses/').then((res) => setCourses(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-7 h-7 animate-spin text-[#00AEEF]" />
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
        <BookOpen className="w-12 h-12 text-gray-200" />
        <p className="text-gray-400 text-sm">You haven't created any courses yet.</p>
        <p className="text-xs text-gray-300">Click "Upload Course" to get started.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-base font-bold text-black mb-6">My Courses</h2>
      {courses.map((course) => (
        <div key={course.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {course.thumbnail
              ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center"><BookOpen className="w-6 h-6 text-gray-300" /></div>
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{course.title}</p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-gray-400 capitalize">{course.skill_level.replace('_', ' ')}</span>
              <span className="text-xs text-gray-400">{course.is_free ? 'Free' : `₦${parseFloat(course.price).toLocaleString()}`}</span>
              <span className="text-xs text-gray-400">{course.total_enrolled} enrolled</span>
              <span className={`flex items-center gap-1 text-xs font-medium ${course.is_published ? 'text-green-500' : 'text-orange-400'}`}>
                {course.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {course.is_published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
          <button
            onClick={() => onEdit(course)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#00AEEF] border border-[#00AEEF] rounded-lg hover:bg-[#E3F5FF] transition-colors flex-shrink-0"
          >
            <Pencil className="w-3 h-3" /> Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
