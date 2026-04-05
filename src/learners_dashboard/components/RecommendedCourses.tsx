import React, { useEffect, useState } from 'react';
import { Users, Search } from 'lucide-react';
import api from '@/lib/api';

interface Course {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  instructor_name: string;
  total_enrolled: number;
  skill_level: string;
  estimated_hours: number;
  is_free: boolean;
  price: string;
}

const FALLBACK = 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop';
const SKILL_LEVELS = ['All', 'beginner', 'intermediate', 'advanced', 'all_levels'];
const SKILL_LABELS: Record<string, string> = {
  All: 'All',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  all_levels: 'All Levels',
};

interface RecommendedCoursesProps {
  setActivePage: (page: string) => void;
  setSelectedCourse: (course: { title: string; instructor: string; img: string; slug?: string; showPurchaseModal?: boolean }) => void;
}

export const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ setActivePage, setSelectedCourse }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    api.get('/courses/')
      .then((res) => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor_name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || c.skill_level === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="max-w-7xl mx-auto px-8 py-12 font-sans">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Recommended courses</h2>
        <p className="text-gray-500 mb-6">Courses trending among web3 developers</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Skill level filters */}
        <div className="flex flex-wrap gap-3">
          {SKILL_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setActiveFilter(level)}
              className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                activeFilter === level
                  ? 'border-blue-500 text-blue-500 ring-1 ring-blue-500 bg-blue-50'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              {SKILL_LABELS[level]}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video rounded-xl bg-gray-200 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="flex flex-col group cursor-pointer"
              onClick={() => {
                setSelectedCourse({ title: course.title, instructor: course.instructor_name, img: course.thumbnail || FALLBACK, slug: course.slug });
                setActivePage('courseDetails');
              }}
            >
              <div className="overflow-hidden rounded-xl mb-4 bg-gray-100 aspect-video">
                <img
                  src={course.thumbnail || FALLBACK}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold leading-tight mb-2 text-gray-900 line-clamp-2">{course.title}</h3>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">👤</span>
                    {course.instructor_name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Users className="w-3.5 h-3.5" /> {course.total_enrolled} enrolled
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-medium text-gray-400 capitalize">{SKILL_LABELS[course.skill_level] || course.skill_level}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse({
                        title: course.title,
                        instructor: course.instructor_name,
                        img: course.thumbnail || FALLBACK,
                        slug: course.slug,
                        showPurchaseModal: true,
                      });
                      setActivePage('courseDetails');
                    }}
                    className="text-blue-500 text-sm font-semibold hover:underline"
                  >
                    {course.is_free ? 'Enroll Free' : `Enroll — ₦${course.price}`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedCourses;
