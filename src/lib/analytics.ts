import api from './api';

type AnalyticsEventType = 'landing_page_view' | 'course_page_view' | 'search_used';

interface TrackAnalyticsEventOptions {
  courseId?: number;
  metadata?: Record<string, unknown>;
}

export async function trackAnalyticsEvent(
  eventType: AnalyticsEventType,
  options: TrackAnalyticsEventOptions = {}
) {
  try {
    await api.post('/analytics/track/', {
      event_type: eventType,
      ...(options.courseId ? { course_id: options.courseId } : {}),
      ...(options.metadata ? { metadata: options.metadata } : {}),
    });
  } catch {
    // Analytics must not block the user flow.
  }
}
