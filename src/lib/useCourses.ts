import { useEffect, useState, useCallback } from 'react';
import api from '@/lib/api';

export interface CourseItem {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  skill_level: string;
  price: string;
  is_free: boolean;
  instructor_name: string;
  average_rating: number;
  total_reviews: number;
  total_enrolled: number;
  category_name: string | null;
  estimated_hours: number;
  is_published: boolean;
}

export interface Enrollment {
  id: number;
  course: CourseItem;
  enrolled_at: string;
  completed: boolean;
  completed_at: string | null;
  progress_percent: number;
}

export function useEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/courses/my/enrollments/');
      setEnrollments(data);
    } catch {
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { enrollments, loading, refetch: fetch };
}

export function useRecommendedCourses(skillLevel?: string) {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async (skill?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (skill && skill !== 'All Levels') params.set('skill_level', skill.toLowerCase());
      const { data } = await api.get(`/courses/?${params.toString()}`);
      setCourses(data);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(skillLevel); }, [fetch, skillLevel]);

  return { courses, loading, refetch: fetch };
}

export async function enrollInCourse(courseId: number) {
  const { data } = await api.post(`/courses/${courseId}/enroll/`);
  return data;
}
