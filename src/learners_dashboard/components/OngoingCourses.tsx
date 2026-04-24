import React, { useEffect, useState } from 'react';
import { Search, User, CheckCircle2, Clock } from 'lucide-react';
import api from '@/lib/api';
import CertificateModal from './CertificateModal';

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

const FALLBACK = 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop';

export default function OngoingCourses({ setActivePage, setSelectedCourse }: {
  setActivePage: (page: string) => void;
  setSelectedCourse: (course: { title: string; instructor: string; img: string; slug?: string; courseId?: number }) => void;
}) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [certModal, setCertModal] = useState<{ enrollmentId: number; courseTitle: string } | null>(null);

  const fetchEnrollments = () => {
    setLoading(true);
    api.get('/courses/my/enrollments/')
      .then((res) => setEnrollments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const filtered = enrollments.filter((enr) =>
    enr.course.title.toLowerCase().includes(search.toLowerCase()) ||
    enr.course.instructor_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white min-h-screen">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Ongoing courses</h1>
          <button
            onClick={fetchEnrollments}
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            Refresh
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video rounded-2xl bg-gray-200 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">
          {search ? 'No courses match your search.' : 'You are not enrolled in any courses yet.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((enr) => (
            <div
              key={enr.id}
              onClick={() => {
                setSelectedCourse({
                  title: enr.course.title,
                  instructor: enr.course.instructor_name,
                  img: enr.course.thumbnail || FALLBACK,
                  slug: enr.course.slug,
                  courseId: enr.course.id,
                });
                setActivePage('courseDetails');
              }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100">
                <img
                  src={enr.course.thumbnail || FALLBACK}
                  alt={enr.course.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-2">{enr.course.title}</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <User className="w-4 h-4" />
                    <span>{enr.course.instructor_name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <Clock className="w-4 h-4" />
                    {enr.course.estimated_hours}h
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{enr.completed ? 'Completed' : 'In Progress'}</span>
                    <span>{enr.progress_percent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${enr.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${enr.progress_percent}%` }}
                    />
                  </div>
                </div>

                {enr.completed && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="w-4 h-4 fill-emerald-100" /> Certificate earned
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCertModal({ enrollmentId: enr.id, courseTitle: enr.course.title }); }}
                      className="text-xs text-blue-500 font-semibold hover:underline"
                    >
                      Get Certificate
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {certModal && (
        <CertificateModal
          enrollmentId={certModal.enrollmentId}
          courseTitle={certModal.courseTitle}
          onClose={() => setCertModal(null)}
        />
      )}
    </div>
  );
}
