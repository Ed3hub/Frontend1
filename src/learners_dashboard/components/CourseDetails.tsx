'use client';
import React, { useEffect, useState } from 'react';
import {
  ChevronLeft, Star, Clock, CheckCircle2, FileText,
  Users, BookOpen, Award, ChevronDown, ChevronUp, MessageSquarePlus, X,
} from 'lucide-react';
import api from '@/lib/api';
import CertificateModal from './CertificateModal';

interface Lesson {
  id: number;
  title: string;
  lesson_type: string;
  duration_minutes: number;
  is_free_preview: boolean;
}

interface Module {
  id: number;
  title: string;
  order: number;
  reward_tokens: number;
  lessons: Lesson[];
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  assessment_type: string;
  duration_minutes: number;
}

interface Review {
  id: number;
  learner_name: string;
  rating: number;
  comment: string;
  is_mine?: boolean;
}

interface Enrollment {
  id: number;
  completed: boolean;
  progress_percent: number;
  certificate_id?: string | null;
}

interface CourseDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  instructor_name: string;
  skill_level: string;
  price: string;
  is_free: boolean;
  estimated_hours: number;
  duration_weeks: number;
  hours_per_week: number;
  is_self_paced: boolean;
  what_you_learn: string;
  what_included: string;
  ideal_for: string;
  tools_used: string;
  completion_tokens: number;
  average_rating: number;
  total_reviews: number;
  total_enrolled: number;
  modules: Module[];
  assessments: Assessment[];
  reviews: Review[];
}

interface CourseDetailsProps {
  setActivePage: (page: string) => void;
  course: { title: string; instructor: string; img: string; slug?: string; price?: string; courseId?: number; showPurchaseModal?: boolean } | null;
  setSelectedCourse?: (course: { title: string; instructor: string; img: string; slug?: string; price?: string; courseId?: number }) => void;
  setSelectedLessonId?: (id: number) => void;
}

const FALLBACK = 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&h=400&fit=crop';
const SKILL_LABELS: Record<string, string> = {
  beginner: 'Beginner', intermediate: 'Intermediate',
  advanced: 'Advanced', all_levels: 'All Levels',
};

const CourseDetails = ({ setActivePage, course, setSelectedCourse, setSelectedLessonId }: CourseDetailsProps) => {
  const [detail, setDetail] = useState<CourseDetail | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [descExpanded, setDescExpanded] = useState(false);

  // Review state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!course?.slug && !course?.courseId) { setLoading(false); return; }
    setLoading(true);
    const courseRequest = course.courseId
      ? api.get(`/courses/enrolled/${course.courseId}/`)
      : api.get(`/courses/${course.slug}/`);
    Promise.all([
      courseRequest,
      api.get('/courses/my/enrollments/'),
    ]).then(([courseRes, enrollRes]) => {
      const courseData: CourseDetail = courseRes.data;
      setDetail(courseData);
      setReviews(courseData.reviews ?? []);
      const enr = enrollRes.data.find((e: Enrollment & { course: { id: number; slug: string } }) =>
        e.course.id === courseData.id
      );
      setEnrollment(enr ?? null);
      // detect if the current user already left a review
      if (enr && courseData.reviews?.length) {
        const mine = courseData.reviews.find((r: Review) => r.is_mine);
        if (mine) {
          setMyReview(mine);
          setReviewRating(mine.rating);
          setReviewComment(mine.comment);
        }
      }
    }).catch(() => {})
      .finally(() => setLoading(false));
  }, [course?.courseId, course?.slug]);

  const toggleModule = (idx: number) => {
    setExpandedModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const openReviewModal = () => {
    setReviewRating(myReview?.rating ?? 0);
    setReviewComment(myReview?.comment ?? '');
    setReviewError('');
    setReviewModalOpen(true);
  };

  const submitReview = async () => {
    if (!reviewRating) { setReviewError('Please select a star rating.'); return; }
    if (!detail) return;
    setReviewSubmitting(true);
    setReviewError('');
    try {
      const { data } = await api.post(`/courses/${detail.id}/review/`, {
        rating: reviewRating,
        comment: reviewComment,
      });
      const updated: Review = { ...data, is_mine: true };
      setMyReview(updated);
      setReviews((prev) => {
        const exists = prev.findIndex((r) => r.is_mine);
        if (exists >= 0) {
          const copy = [...prev];
          copy[exists] = updated;
          return copy;
        }
        return [updated, ...prev];
      });
      setDetail((prev) => prev ? {
        ...prev,
        average_rating: data.average_rating ?? prev.average_rating,
        total_reviews: data.total_reviews ?? prev.total_reviews,
      } : prev);
      setReviewModalOpen(false);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setReviewError(e.response?.data?.detail ?? 'Failed to submit review.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const totalLessons = detail?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="h-52 bg-gray-200 rounded-2xl" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  const d = detail;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => setActivePage('recommendedCourses')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold line-clamp-1">{d?.title ?? course?.title ?? 'Course Details'}</h1>
      </header>

      {/* Thumbnail */}
      <div className="w-full h-52 rounded-2xl overflow-hidden mb-6">
        <img src={d?.thumbnail || course?.img || FALLBACK} alt={d?.title} className="w-full h-full object-cover" />
      </div>

      {/* Title + meta */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{d?.title ?? course?.title}</h2>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {d?.instructor_name ?? course?.instructor}</span>
          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {d?.total_enrolled ?? 0} enrolled</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {d?.estimated_hours}h estimated</span>
          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {totalLessons} lessons</span>
          {d?.skill_level && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
              {SKILL_LABELS[d.skill_level] ?? d.skill_level}
            </span>
          )}
        </div>

        {/* Rating */}
        {d && (
          <div className="flex items-center gap-2 mt-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(d.average_rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="font-bold text-sm">{d.average_rating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({d.total_reviews} reviews)</span>
          </div>
        )}
      </div>

      {/* Price + Enroll CTA / Progress bar if enrolled */}
      {d && (
        <div className="flex items-center justify-between bg-blue-50 rounded-2xl px-6 py-4 mb-8">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {d.is_free ? 'Free' : `₦${d.price}`}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-yellow-500" /> Earn {d.completion_tokens} tokens on completion
            </p>
            {enrollment && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{enrollment.completed ? 'Completed' : 'In Progress'}</span>
                  <span>{enrollment.progress_percent}%</span>
                </div>
                <div className="w-40 bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${enrollment.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${enrollment.progress_percent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          {enrollment?.completed ? (
            <button
              onClick={() => enrollment.certificate_id ? window.open(`/certificate/${enrollment.certificate_id}`, '_blank') : setCertModalOpen(true)}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-md shadow-green-200 flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              {enrollment.certificate_id ? 'View Certificate' : 'Get Certificate'}
            </button>
          ) : enrollment ? (
            <button
              onClick={() => setActivePage('courseLearning')}
              className="px-8 py-3 bg-[#00A6FB] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-blue-200"
            >
              Continue Learning
            </button>
          ) : d.is_free ? (
            <button
              disabled={enrolling}
              onClick={async () => {
                setEnrolling(true);
                try {
                  const { data } = await api.post(`/courses/${d.id}/enroll/`);
                  setEnrollment(data);
                } catch (err: any) {
                  console.error('Enrollment failed:', err?.response?.data);
                } finally {
                  setEnrolling(false);
                }
              }}
              className="px-8 py-3 bg-[#00A6FB] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-blue-200 disabled:opacity-60"
            >
              {enrolling ? 'Enrolling...' : 'Enroll Free'}
            </button>
          ) : (
            <button
              onClick={() => {
                if (setSelectedCourse && d) {
                  setSelectedCourse({
                    title: d.title,
                    instructor: d.instructor_name,
                    img: d.thumbnail || course?.img || FALLBACK,
                    slug: d.slug,
                    price: d.price,
                    courseId: d.id,
                  });
                }
                setActivePage('payment');
              }}
              className="px-8 py-3 bg-[#00A6FB] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-blue-200"
            >
              Enroll Now
            </button>
          )}
        </div>
      )}

      {/* Description */}
      {d?.description && (
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3">About this course</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {descExpanded ? d.description : d.description.slice(0, 200)}
            {d.description.length > 200 && (
              <button onClick={() => setDescExpanded(!descExpanded)} className="text-blue-500 font-semibold ml-1">
                {descExpanded ? 'see less' : 'see more...'}
              </button>
            )}
          </p>
        </div>
      )}

      {/* What you'll learn */}
      {d?.what_you_learn && (
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3">What you&apos;ll learn</h3>
          <ul className="space-y-2">
            {d.what_you_learn.split('\n').filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What's included */}
      {d?.what_included && (
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3">What&apos;s included</h3>
          <ul className="space-y-2">
            {d.what_included.split('\n').filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Curriculum */}
      {d?.modules && d.modules.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Curriculum</h3>
          <div className="space-y-3">
            {d.modules.map((mod, idx) => (
              <div key={mod.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleModule(idx)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{mod.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{mod.lessons.length} lessons · +{mod.reward_tokens} tokens</p>
                  </div>
                  {expandedModules.includes(idx) ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>

                {expandedModules.includes(idx) && (
                  <div className="divide-y divide-gray-100">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedLessonId?.(lesson.id);
                          setActivePage('courseLearning');
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{lesson.title}</span>
                          {lesson.is_free_preview && (
                            <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">Preview</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{lesson.duration_minutes}m</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assessments */}
      {d?.assessments && d.assessments.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Assessments</h3>
          <div className="space-y-3">
            {d.assessments.map((a) => (
              <div key={a.id} className="border border-gray-200 rounded-xl px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-800">{a.title}</p>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {a.duration_minutes}m</span>
                </div>
                <p className="text-sm text-gray-500">{a.description}</p>
                <span className="mt-2 inline-block text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full capitalize">{a.assessment_type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">
            Reviews {reviews.length > 0 && <span className="text-gray-400 font-normal text-base">({reviews.length})</span>}
          </h3>
          {enrollment && (
            <button
              onClick={openReviewModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              {myReview ? 'Edit Review' : 'Write a Review'}
            </button>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.slice(0, 5).map((r) => (
              <div key={r.id} className={`border rounded-xl px-5 py-4 ${r.is_mine ? 'border-blue-200 bg-blue-50/40' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-800">{r.learner_name}</p>
                    {r.is_mine && <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full font-medium">Your review</span>}
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
                {r.comment && <p className="text-sm text-gray-500">{r.comment}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-200 rounded-xl">
            <Star className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No reviews yet.</p>
            {enrollment && (
              <button onClick={openReviewModal} className="mt-3 text-sm text-blue-500 font-semibold hover:underline">
                Be the first to review
              </button>
            )}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setReviewModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">{myReview ? 'Edit Your Review' : 'Write a Review'}</h2>
              <button onClick={() => setReviewModalOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {d && (
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <img src={d.thumbnail || course?.img || FALLBACK} alt={d.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{d.title}</p>
                  <p className="text-xs text-gray-400">by {d.instructor_name}</p>
                </div>
              </div>
            )}

            {/* Star picker */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Your rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setReviewHover(star)}
                    onMouseLeave={() => setReviewHover(0)}
                    onClick={() => { setReviewRating(star); setReviewError(''); }}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (reviewHover || reviewRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {reviewRating > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][reviewRating]}
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Comment <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea
                rows={4}
                placeholder="Share your experience with this course..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {reviewError && <p className="text-red-500 text-sm -mt-2">{reviewError}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setReviewModalOpen(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                disabled={reviewSubmitting}
                className="flex-1 py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 disabled:opacity-60 transition-colors"
              >
                {reviewSubmitting ? 'Submitting...' : myReview ? 'Update Review' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {certModalOpen && enrollment && d && (
        <CertificateModal
          enrollmentId={enrollment.id}
          courseTitle={d.title}
          onClose={() => setCertModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CourseDetails;
