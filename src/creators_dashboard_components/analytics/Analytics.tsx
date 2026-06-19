'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Activity, BarChart3, BookOpen, Eye, Loader2, RefreshCw, Search, Trophy } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import api from '@/lib/api';

interface AnalyticsSummary {
  totals: {
    events: number;
    course_views: number;
    searches: number;
    purchases: number;
    course_starts: number;
    course_completions: number;
    last_30_days: number;
  };
  event_breakdown: Array<{
    event_type: string;
    label: string;
    total: number;
    last_30_days: number;
  }>;
  daily_activity: Array<{
    date: string;
    count: number;
  }>;
  top_courses: Array<{
    course_id: number;
    title: string;
    views: number;
  }>;
  recent_activity: Array<{
    id: number;
    event_type: string;
    label: string;
    course_title: string;
    username: string;
    created_at: string;
  }>;
}

const numberFormat = new Intl.NumberFormat();

const Analytics = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSummary = () => {
    setLoading(true);
    setError('');
    api.get('/analytics/summary/')
      .then((res) => setSummary(res.data))
      .catch((err) => {
        setSummary(null);
        setError(err.response?.data?.detail ?? 'Could not load analytics.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const dailyData = useMemo(() => (
    summary?.daily_activity.map((item) => ({
      ...item,
      label: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    })) ?? []
  ), [summary]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-7 h-7 animate-spin text-[#00AEEF]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="border border-red-100 bg-red-50 rounded-lg p-5">
          <p className="text-sm font-semibold text-red-700">{error}</p>
          <button
            onClick={loadSummary}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  const metricCards = [
    { label: 'Course views', value: summary.totals.course_views, icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Searches', value: summary.totals.searches, icon: Search, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Started', value: summary.totals.course_starts, icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Completed', value: summary.totals.course_completions, icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            {numberFormat.format(summary.totals.events)} total events, {numberFormat.format(summary.totals.last_30_days)} in the last 30 days
          </p>
        </div>
        <button
          onClick={loadSummary}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{numberFormat.format(card.value)}</p>
                </div>
                <span className={`${card.bg} ${card.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] gap-6">
        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            <h3 className="font-bold text-gray-900">Daily activity</h3>
          </div>
          {dailyData.length ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00AEEF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-gray-400 py-16 text-center">No recent activity yet.</p>
          )}
        </section>

        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-gray-500" />
            <h3 className="font-bold text-gray-900">Event breakdown</h3>
          </div>
          <div className="space-y-3">
            {summary.event_breakdown.filter((event) => event.total > 0).map((event) => (
              <div key={event.event_type} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{event.label}</p>
                  <p className="text-xs text-gray-400">{numberFormat.format(event.last_30_days)} last 30 days</p>
                </div>
                <p className="text-sm font-bold text-gray-900">{numberFormat.format(event.total)}</p>
              </div>
            ))}
            {summary.event_breakdown.every((event) => event.total === 0) && (
              <p className="text-sm text-gray-400 py-10 text-center">No analytics events yet.</p>
            )}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Top courses by views</h3>
          <div className="space-y-3">
            {summary.top_courses.map((course) => (
              <div key={course.course_id} className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-gray-700 truncate">{course.title}</p>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {numberFormat.format(course.views)} views
                </span>
              </div>
            ))}
            {!summary.top_courses.length && (
              <p className="text-sm text-gray-400 py-10 text-center">Course views will appear here.</p>
            )}
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Recent activity</h3>
          <div className="space-y-3">
            {summary.recent_activity.map((event) => (
              <div key={event.id} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-800 truncate">{event.label}</p>
                  <time className="text-xs text-gray-400 shrink-0">
                    {new Date(event.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </time>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {event.course_title || event.username || 'Platform activity'}
                </p>
              </div>
            ))}
            {!summary.recent_activity.length && (
              <p className="text-sm text-gray-400 py-10 text-center">Recent events will appear here.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analytics;
