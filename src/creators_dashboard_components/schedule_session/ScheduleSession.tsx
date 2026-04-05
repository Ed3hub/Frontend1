'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, Users, Video, X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';

interface Session {
  id?: number;
  course?: number;
  title: string;
  description: string;
  session_type: 'live_qa' | 'workshop' | 'office_hours' | 'webinar';
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  meeting_link: string;
  meeting_platform: string;
  max_participants: number;
  registrations_count?: number;
  course_title?: string;
  registrations?: any[];
}

const ScheduleSession: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [sessionForm, setSessionForm] = useState<Session>({
    title: '',
    description: '',
    session_type: 'live_qa',
    status: 'scheduled',
    scheduled_date: '',
    scheduled_time: '',
    duration_minutes: 60,
    meeting_link: '',
    meeting_platform: 'Zoom',
    max_participants: 0,
  });

  useEffect(() => {
    loadSessions();
    loadCourses();
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/courses/sessions/');
      setSessions(response.data);
    } catch (err) {
      console.error('Failed to load sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await api.get('/courses/my/courses/');
      setCourses(response.data);
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const handleSave = async () => {
    if (!sessionForm.title.trim() || !sessionForm.scheduled_date || !sessionForm.scheduled_time) {
      setErrorMsg('Please fill in all required fields');
      setStatus('error');
      return;
    }

    setSaving(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      if (editingSession && editingSession.id) {
        await api.patch(`/courses/sessions/${editingSession.id}/`, sessionForm);
      } else {
        await api.post('/courses/sessions/', sessionForm);
      }
      setStatus('success');
      setIsModalOpen(false);
      loadSessions();
      resetForm();
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || 'Failed to save session');
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setSessionForm(session);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this session?')) return;

    try {
      await api.delete(`/courses/sessions/${id}/`);
      loadSessions();
    } catch (err) {
      console.error('Failed to delete session:', err);
    }
  };

  const resetForm = () => {
    setSessionForm({
      title: '',
      description: '',
      session_type: 'live_qa',
      status: 'scheduled',
      scheduled_date: '',
      scheduled_time: '',
      duration_minutes: 60,
      meeting_link: '',
      meeting_platform: 'Zoom',
      max_participants: 0,
    });
    setEditingSession(null);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
    setStatus('idle');
    setErrorMsg('');
  };

  const getSessionTypeLabel = (type: string) => {
    const labels: any = {
      live_qa: 'Live Q&A',
      workshop: 'Workshop',
      office_hours: 'Office Hours',
      webinar: 'Webinar',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      scheduled: 'bg-blue-100 text-blue-700',
      live: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Schedule a Session</h2>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#0096ce]"
        >
          <Plus size={18} />
          New Session
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#00AEEF]" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No sessions scheduled yet. Create your first session!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#00AEEF] transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{session.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(session.scheduled_date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {session.scheduled_time} ({session.duration_minutes} min)
                    </span>
                    <span className="flex items-center gap-1">
                      <Video size={14} />
                      {getSessionTypeLabel(session.session_type)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {session.registrations_count || 0} registered
                    </span>
                  </div>
                  {session.course_title && (
                    <p className="text-xs text-gray-500 mt-2">Course: {session.course_title}</p>
                  )}
                  {session.meeting_link && (
                    <a href={session.meeting_link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00AEEF] hover:underline mt-2 inline-block">
                      {session.meeting_link}
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(session)}
                    className="p-2 text-gray-400 hover:text-[#00AEEF] hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(session.id!)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
              <h2 className="text-xl font-bold">
                {editingSession ? 'Edit Session' : 'New Session'}
              </h2>
              <X
                size={20}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Course (Optional)</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                  value={sessionForm.course || ''}
                  onChange={(e) => setSessionForm({ ...sessionForm, course: e.target.value ? Number(e.target.value) : undefined })}
                >
                  <option value="">General Session</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Session Title *</label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                  value={sessionForm.title}
                  onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                  placeholder="e.g. DAO Governance Q&A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                  rows={4}
                  value={sessionForm.description}
                  onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                  placeholder="Describe what will be covered in this session..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Session Type</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={sessionForm.session_type}
                    onChange={(e) => setSessionForm({ ...sessionForm, session_type: e.target.value as any })}
                  >
                    <option value="live_qa">Live Q&A</option>
                    <option value="workshop">Workshop</option>
                    <option value="office_hours">Office Hours</option>
                    <option value="webinar">Webinar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={sessionForm.status}
                    onChange={(e) => setSessionForm({ ...sessionForm, status: e.target.value as any })}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Date *</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={sessionForm.scheduled_date}
                    onChange={(e) => setSessionForm({ ...sessionForm, scheduled_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Time *</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={sessionForm.scheduled_time}
                    onChange={(e) => setSessionForm({ ...sessionForm, scheduled_time: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={sessionForm.duration_minutes}
                    onChange={(e) => setSessionForm({ ...sessionForm, duration_minutes: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Max Participants (0 = unlimited)</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={sessionForm.max_participants}
                    onChange={(e) => setSessionForm({ ...sessionForm, max_participants: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Meeting Platform</label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                  value={sessionForm.meeting_platform}
                  onChange={(e) => setSessionForm({ ...sessionForm, meeting_platform: e.target.value })}
                  placeholder="e.g. Zoom, Google Meet, Teams"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Meeting Link</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                  value={sessionForm.meeting_link}
                  onChange={(e) => setSessionForm({ ...sessionForm, meeting_link: e.target.value })}
                  placeholder="https://zoom.us/j/..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle2 size={16} /> Session saved successfully!
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 bg-[#00AEEF] text-white rounded-lg font-semibold hover:bg-[#0096ce] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Saving...' : 'Save Session'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleSession;
