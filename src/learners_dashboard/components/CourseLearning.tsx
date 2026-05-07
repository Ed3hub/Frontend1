'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  ChevronLeft, ChevronDown, ChevronUp, CheckCircle2,
  PlayCircle, FileText, ClipboardList, Lock, Loader2, Clock,
} from 'lucide-react';
import api from '@/lib/api';

interface Lesson {
  id: number;
  title: string;
  lesson_type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration_minutes: number;
  is_free_preview: boolean;
  video_url?: string | null;
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
  initialLessonId?: number | null;
}

const LESSON_ICONS = {
  video: <PlayCircle className="w-4 h-4" />,
  reading: <FileText className="w-4 h-4" />,
  quiz: <ClipboardList className="w-4 h-4" />,
  assignment: <ClipboardList className="w-4 h-4" />,
};

export default function CourseLearning({ setActivePage, course, initialLessonId }: CourseLearningProps) {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Video watch tracking via native <video> events
  const videoRef = useRef<HTMLVideoElement>(null);
  const watchedRef = useRef(0);           // seconds actually watched (deduplicated)
  const lastTimeRef = useRef<number>(0);  // last timeupdate position
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const autoMarkedRef = useRef(false);    // prevent double-marking

  const requiredSeconds = activeLesson?.lesson_type === 'video'
    ? (activeLesson.duration_minutes * 60)
    : 0;
  const watchPct = requiredSeconds > 0
    ? Math.min((watchedSeconds / requiredSeconds) * 100, 100)
    : 0;

  // Reset watch state whenever lesson changes
  useEffect(() => {
    watchedRef.current = 0;
    lastTimeRef.current = 0;
    autoMarkedRef.current = false;
    setWatchedSeconds(0);
  }, [activeLessonId]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const current = video.currentTime;
    const delta = current - lastTimeRef.current;
    // Only count forward progress ≤ 2 s (ignore seeks)
    if (delta > 0 && delta <= 2) {
      watchedRef.current += delta;
      setWatchedSeconds(Math.floor(watchedRef.current));
    }
    lastTimeRef.current = current;
  }, []);

  // Auto-mark complete when enough watch time accumulated
  useEffect(() => {
    if (
      requiredSeconds > 0 &&
      watchedSeconds >= requiredSeconds &&
      activeLesson &&
      !isCompleted(activeLesson.id) &&
      !autoMarkedRef.current &&
      !marking
    ) {
      autoMarkedRef.current = true;
      markComplete();
    }
  }, [watchedSeconds]);

  useEffect(() => {
    if (!course?.slug && !course?.courseId) { setLoading(false); return; }

    let cancelled = false;
    const loadCourse = async () => {
      setLoading(true);
      try {
        const enrollRes = await api.get('/courses/my/enrollments/');
        const enr = enrollRes.data.find(
          (e: { course: { id: number; slug: string }; lesson_progress: LessonProgress[] }) =>
            course?.courseId ? e.course.id === course.courseId : e.course.slug === course?.slug
        );
        const enrolledCourseId = enr?.course?.id ?? course?.courseId;
        const detailUrl = enrolledCourseId
          ? `/courses/enrolled/${enrolledCourseId}/`
          : `/courses/${course!.slug}/`;
        const courseRes = await api.get(detailUrl);
        if (cancelled) return;

        const data: CourseData = courseRes.data;
        setCourseData(data);
        setProgress(enr?.lesson_progress ?? []);

        const target = initialLessonId
          ? data.modules.flatMap((m: Module) => m.lessons).find((l: Lesson) => l.id === initialLessonId)
          : data.modules?.[0]?.lessons?.[0];
        if (target) selectLesson(target);
      } catch {
        if (!cancelled) {
          setCourseData(null);
          setProgress([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCourse();
    return () => { cancelled = true; };
  }, [course?.courseId, course?.slug, initialLessonId]);

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
      goNext();
    } catch {
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

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const isVideoLesson = activeLesson?.lesson_type === 'video';
  const alreadyCompleted = activeLesson ? isCompleted(activeLesson.id) : false;

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
              {/* Video player */}
              {isVideoLesson && (
                <div className="relative w-full bg-black aspect-video">
                  {activeLesson.video_url ? (
                    <video
                      key={activeLesson.id}
                      ref={videoRef}
                      src={activeLesson.video_url}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full"
                      onTimeUpdate={handleTimeUpdate}
                      onSeeked={() => { lastTimeRef.current = videoRef.current?.currentTime ?? 0; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <PlayCircle className="w-16 h-16 mx-auto mb-3 opacity-40" />
                        <p className="text-sm opacity-60">Video not available yet</p>
                      </div>
                    </div>
                  )}

                  {/* Watch progress bar overlay */}
                  {!alreadyCompleted && activeLesson.video_url && requiredSeconds > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 pointer-events-none">
                      <div className="flex items-center justify-between text-white text-xs mb-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {marking ? (
                            <span className="text-green-400 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Marking complete...
                            </span>
                          ) : watchedSeconds >= requiredSeconds ? (
                            <span className="text-green-400 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Completed!
                            </span>
                          ) : (
                            <span>Watched: {fmt(watchedSeconds)} / {fmt(requiredSeconds)}</span>
                          )}
                        </div>
                        <span>{Math.round(watchPct)}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full transition-all ${watchedSeconds >= requiredSeconds ? 'bg-green-400' : 'bg-blue-400'}`}
                          style={{ width: `${watchPct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Text content */}
              <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full capitalize font-medium">
                    {activeLesson.lesson_type}
                  </span>
                  <span className="text-xs text-gray-400">{activeLesson.duration_minutes} min</span>
                  {alreadyCompleted && (
                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  )}
                  {/* Show watch progress inline for video lessons */}
                  {isVideoLesson && !alreadyCompleted && activeLesson.video_url && requiredSeconds > 0 && (
                    <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />
                      Watch {fmt(requiredSeconds)} to complete
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

                  {alreadyCompleted ? (
                    <button
                      onClick={goNext}
                      disabled={currentIndex === allLessons.length - 1}
                      className="flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 disabled:opacity-40 transition-colors"
                    >
                      Next Lesson <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  ) : isVideoLesson ? (
                    // Video lesson — show watch progress, no manual button
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-500 rounded-xl text-sm">
                      <Clock className="w-4 h-4" />
                      {marking
                        ? 'Marking complete...'
                        : requiredSeconds > 0
                          ? `${fmt(watchedSeconds)} / ${fmt(requiredSeconds)}`
                          : 'Watch the video to complete'}
                    </div>
                  ) : (
                    // Non-video — manual mark complete
                    <button
                      onClick={markComplete}
                      disabled={marking}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 disabled:opacity-60 transition-colors"
                    >
                      {marking ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      {marking ? 'Saving...' : 'Mark Complete & Next'}
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
