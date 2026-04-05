import React, { useEffect, useState } from 'react';
import { Users, CheckCircle2, Clock, BookOpen, Award, Coins } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

interface Stats {
  courses_enrolled: number;
  certificates_earned: number;
  total_tokens: number;
}

interface Enrollment {
  id: number;
  course: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    instructor_name: string;
    estimated_hours: number;
  };
  progress_percent: number;
  completed: boolean;
}

interface Course {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  instructor_name: string;
  total_enrolled: number;
}

interface HomePageProps {
  setActivePage: (page: string) => void;
  setSelectedCourse: (course: { title: string; instructor: string; img: string; slug?: string; showPurchaseModal?: boolean }) => void;
}

const FALLBACK = 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop';

const HomePage = ({ setActivePage, setSelectedCourse }: HomePageProps) => {
  const { user } = useAuth();
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.username || 'there';

  const [stats, setStats] = useState<Stats>({ courses_enrolled: 0, certificates_earned: 0, total_tokens: 0 });
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [recommended, setRecommended] = useState<Course[]>([]);

  useEffect(() => {
    api.get('/courses/my/stats/').then((res) => setStats(res.data)).catch(() => {});

    api.get('/courses/my/enrollments/').then((res) => {
      setEnrollments(res.data.slice(0, 3));
    }).catch(() => {});

    api.get('/courses/').then((res) => {
      setRecommended(res.data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-10">
      {/* Welcome Section */}
      <div className="mb-6 md:mb-10 text-center sm:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          Welcome, {fullName} 👋
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Start your journey into blockchain, NFTs, DAOs, and more.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
          <div className="p-3 bg-blue-50 rounded-xl"><BookOpen size={24} className="text-[#4E94F8]" /></div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.courses_enrolled}</p>
            <p className="text-sm text-gray-500">Courses Enrolled</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
          <div className="p-3 bg-green-50 rounded-xl"><Award size={24} className="text-green-500" /></div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.certificates_earned}</p>
            <p className="text-sm text-gray-500">Certificates Earned</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
          <div className="p-3 bg-yellow-50 rounded-xl"><Coins size={24} className="text-yellow-500" /></div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.total_tokens}</p>
            <p className="text-sm text-gray-500">Tokens Earned</p>
          </div>
        </div>
      </div>

      {/* Ongoing Courses */}
      <section className="mb-12 md:mb-16">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Ongoing courses</h3>
          <button onClick={() => setActivePage('ongoingCourses')} className="text-blue-600 font-medium text-sm md:text-base">See All</button>
        </div>

        {enrollments.length === 0 ? (
          <p className="text-gray-400 text-sm">You have no ongoing courses. Enroll in a course to get started!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {enrollments.map((enr) => (
              <div
                key={enr.id}
                onClick={() => {
                  setSelectedCourse({ title: enr.course.title, instructor: enr.course.instructor_name, img: enr.course.thumbnail || FALLBACK });
                  setActivePage('courseDetails');
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all"
              >
                <img src={enr.course.thumbnail || FALLBACK} alt={enr.course.title} className="w-full h-40 md:h-48 object-cover" />
                <div className="p-4 md:p-5">
                  <h4 className="font-bold text-base md:text-lg mb-3 line-clamp-2">{enr.course.title}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                      <Users className="w-4 h-4" /> {enr.course.instructor_name}
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                      <Clock className="w-4 h-4" /> {enr.course.estimated_hours}h estimated
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{enr.completed ? 'Completed' : 'In Progress'}</span>
                        <span>{enr.progress_percent}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${enr.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${enr.progress_percent}%` }}
                        />
                      </div>
                    </div>
                    {enr.completed && (
                      <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Certificate earned
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recommended Courses */}
      <section>
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Recommended courses</h3>
          <button onClick={() => setActivePage('recommendedCourses')} className="text-blue-600 font-medium text-sm md:text-base">See All</button>
        </div>

        {recommended.length === 0 ? (
          <p className="text-gray-400 text-sm">No courses available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recommended.map((course) => (
              <div key={course.id} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all"
              onClick={() => {
                setSelectedCourse({ title: course.title, instructor: course.instructor_name, img: course.thumbnail || FALLBACK, slug: course.slug });
                setActivePage('courseDetails');
              }}
            >
                <img
                  src={course.thumbnail || FALLBACK}
                  alt={course.title}
                  className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <h4 className="text-base md:text-lg font-bold leading-tight mb-2 text-gray-900 line-clamp-2">{course.title}</h4>
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse({ title: course.title, instructor: course.instructor_name, img: course.thumbnail || FALLBACK, slug: course.slug, showPurchaseModal: true });
                        setActivePage('courseDetails');
                      }}
                      className="text-blue-500 text-sm font-semibold hover:underline"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
