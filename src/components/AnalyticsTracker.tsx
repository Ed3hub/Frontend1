'use client';

import { useEffect } from 'react';
import { trackAnalyticsEvent } from '@/lib/analytics';

interface AnalyticsTrackerProps {
  eventType: 'landing_page_view' | 'course_page_view' | 'search_used';
  courseId?: number;
  metadata?: Record<string, unknown>;
}

export default function AnalyticsTracker({ eventType, courseId, metadata }: AnalyticsTrackerProps) {
  useEffect(() => {
    trackAnalyticsEvent(eventType, { courseId, metadata });
  }, [eventType, courseId, metadata]);

  return null;
}
