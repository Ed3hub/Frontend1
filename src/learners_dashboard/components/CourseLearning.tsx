'use client';
import React, { useEffect, useState } from 'react';
import {
  ChevronLeft, ChevronDown, ChevronUp, CheckCircle2,
  PlayCircle, FileText, ClipboardList, Lock, Loader2,
} from 'lucide-react';
import api from '@/lib/api';

interface Lesson {
  id: number;
  title: string;
  lesson_type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration_minutes: number;
  is_free_preview: boolean;
  video_url?: string;
  content?: string;
}

interface Module {
  id: number;
  title: string;
  order: number;
  reward_tokens: number;
  lessons: Lesson[];
}

interface LessonProgress {
  lesson: number;
  completed: boolean;
}

interface CourseData {
  id: number;
  title: string;
  modules: Module[];
}

interface CourseLearningProps {
  setActivePage: (page: string) => void;
  course: { title: string; instructor: string; img: string; slug?: string; courseId?: number } | null;
}

const LESSON_ICONS = {
  video: <PlayCircle className="w-4 h-4" />,
  reading: <FileText className="w-4 h-4" />,
  quiz: <ClipboardList className="w-4 h-4" />,
  assignment: <ClipboardList className="w-4 h-4" />,
};

export default function CourseLearning({ setActivePage, course }: CourseLearningProps) {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!course?.slug) { setLoading(false); return; }
    Promise.all([
      api.get(`/courses/${course.slug}/`),
      api.get('/courses/my/enrollments/'),
    ]).then(([courseRes, enrollRes]) => {
      const data: CourseData = courseRes.data;
      setCourseData(data);

      // get lesson progress from enrollment
      const enr = enrollRes.data.find(
        (e: { course: { slug: string }; lesson_progress: LessonProgress[] }) =>
          e.course.slug === course.slug
      );
      if (enr?.lesson_progress) setProgress(enr.lesson_progress);

      // auto-select first lesson
      const firstLesson = data.modules?.[0]?.lessons?.[0];
      if (firstLesson) selectLesson(firstLesson);
    }).catch(() => {})
      .finally(() => setLoading(false));
  }, [course?.slug]);

  const selectLesson = (lesson: Lesson) => {
    setActiveLessonId(lesson.id);
    setLessonLoading(true);
    api.get(`/courses/lessons/${lesson.id}/`)
      .then((res) => setActiveLesson(res.data))
      .catch(() => setActiveLesson(lesson))
      .finally(() => setLessonLoading(false));
  };

  const isCompleted = (lessonId: number) =>
    progress.some((p) => p.lesson === lessonId && p.completed);

  const markComplete = async () => {
    if (!activeLesson || marking) return;
    setMarking(true);
    try {
      await api.post(`/courses/lessons/${activeLesson.id}/complete/`);
      setProgress((prev) => {
        const exists = prev.find((p) => p.lesson === activeLesson.id);
        if (exists) return prev.map((p) => p.lesson === activeLesson.id ? { ...p, completed: true } : p);
        return [...prev, { lesson: activeLesson.id, completed: true }];
      });
      // auto-advance to next lesson
      goNext();
    } catch {
      // already completed is fine
      goNext();
    } finally {
      setMarking(false);
    }
  };

  const allLessons = courseData?.modules.flatMap((m) => m.lessons) ?? [];
  const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);

  const goNext = () => {
    if (currentIndex < allLessons.length - 1) selectLesson(allLessons[currentIndex + 1]);
  };
  const goPrev = () => {
    if (currentIndex > 0) selectLesson(allLessons[currentIndex - 1]);
  };

  const toggleModule = (idx: number) =>
    setExpandedModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );

  const completedCount = progress.filter((p) => p.completed).length;
  const totalLessons = allLessons.length;
  const progressPct = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} shrink-0 transition-all duration-300 overflow-hidden border-r border-gray-100 flex flex-col`}>
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => setActivePage('courseDetails')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-3"
          >
            <ChevronLeft className="w-4 h-4" /> Back to course
          </button>
          <h2 className="font-bold text-gray-900 text-sm line-clamp-2">{courseData?.title ?? course?.title}</h2>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{completedCount}/{totalLessons} lessons</span>
              <span>{progressPct}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-blue-500 transition-all" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {courseData?.modules.map((mod, idx) => (
            <div key={mod.id}>
              <button
                onClick={() => toggleModule(idx)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-700">{mod.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{mod.lessons.length} lessons · +{mod.reward_tokens} tokens</p>
                </div>
                {expandedModules.includes(idx)
                  ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
              </button>

              {expandedModules.includes(idx) && mod.lessons.map((lesson) => {
                const done = isCompleted(lesson.id);
                const active = lesson.id === activeLessonId;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => selectLesson(lesson)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 transition-colors ${
                      active ? 'bg-blue-50 border-l-2 border-l-blue-500' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={done ? 'text-green-500' : active ? 'text-blue-500' : 'text-gray-300'}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : LESSON_ICONS[lesson.lesson_type] ?? <FileText className="w-4 h-4" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${active ? 'text-blue-700' : 'text-gray-700'}`}>{lesson.title}</p>
                      <p className="text-[10px] text-gray-400">{lesson.duration_minutes}m</p>
                    </div>
                    {!lesson.is_free_preview && !done && !active && (
                      <Lock className="w-3 h-3 text-gray-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            title="Toggle sidebar"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-700 truncate">{activeLesson?.title ?? 'Select a lesson'}</span>
          <span className="ml-auto text-xs text-gray-400">{currentIndex + 1} / {totalLessons}</span>
        </div>

        {/* Lesson content */}
        <div className="flex-1 overflow-y-auto">
          {lessonLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          ) : activeLesson ? (
            <div>
              {/* Video */}
              {activeLesson.lesson_type === 'video' && activeLesson.video_url && (
                <div className="w-full bg-black aspect-video">
                  <iframe
                    src={activeLesson.video_url.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )}
              {activeLesson.lesson_type === 'video' && !activeLesson.video_url && (
                <div className="w-full bg-gray-900 aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle className="w-16 h-16 mx-auto mb-3 opacity-40" />
                    <p className="text-sm opacity-60">Video not available yet</p>
                  </div>
                </div>
              )}

              {/* Text content */}
              <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full capitalize font-medium">
                    {activeLesson.lesson_type}
                  </span>
                  <span className="text-xs text-gray-400">{activeLesson.duration_minutes} min</span>
                  {isCompleted(activeLesson.id) && (
                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  )}
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-6">{activeLesson.title}</h1>

                {activeLesson.content ? (
                  <div
                    className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                  />
                ) : (
                  <p className="text-gray-400 text-sm italic">No content available for this lesson yet.</p>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
                  <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  {!isCompleted(activeLesson.id) ? (
                    <button
                      onClick={markComplete}
                      disabled={marking}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 disabled:opacity-60 transition-colors"
                    >
                      {marking ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      {marking ? 'Saving...' : 'Mark Complete & Next'}
                    </button>
                  ) : (
                    <button
                      onClick={goNext}
                      disabled={currentIndex === allLessons.length - 1}
                      className="flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 disabled:opacity-40 transition-colors"
                    >
                      Next Lesson <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <PlayCircle className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-sm">Select a lesson from the sidebar to start learning</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
