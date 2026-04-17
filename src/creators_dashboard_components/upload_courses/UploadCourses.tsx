'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Paperclip, Plus, X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader2, CheckCircle2, AlertCircle, Edit2, Trash2, FileText, Video, BookOpen } from 'lucide-react';
import api from '@/lib/api';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'document';
  content?: string;
  videoFile?: File | null;
  videoUrl?: string;       // existing uploaded URL (edit mode)
  duration?: string;
}

interface Quiz {
  id: string;
  question: string;
  type: 'mcq' | 'true_false' | 'fill_blank';
  options?: string[];
  correctAnswer: string;
}

interface Assessment {
  id: string;
  question: string;
  type: 'practical' | 'short_answer' | 'matching';
  expectedAnswer?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  quizzes: Quiz[];
  assessments: Assessment[];
}

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (module: Module) => void;
  onEdit?: (module: Module) => void;
  editModule?: Module | null;
  moduleCount: number;
}

const ModuleModal: React.FC<ModuleModalProps> = ({ isOpen, onClose, onAdd, onEdit, editModule, moduleCount }) => {
  const [moduleTitle, setModuleTitle] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [activeTab, setActiveTab] = useState<'lessons' | 'quizzes' | 'assessments'>('lessons');

  useEffect(() => {
    if (editModule) {
      setModuleTitle(editModule.title);
      setLessons(editModule.lessons);
      setQuizzes(editModule.quizzes);
      setAssessments(editModule.assessments);
    } else {
      setModuleTitle('');
      setLessons([]);
      setQuizzes([]);
      setAssessments([]);
    }
  }, [editModule, isOpen]);

  if (!isOpen) return null;

  const addLesson = () => {
    setLessons([...lessons, { id: Date.now().toString(), title: '', type: 'video', duration: '' }]);
  };

  const updateLesson = (id: string, field: keyof Lesson, value: any) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const removeLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  const addQuiz = () => {
    setQuizzes([...quizzes, { id: Date.now().toString(), question: '', type: 'mcq', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const updateQuiz = (id: string, field: keyof Quiz, value: any) => {
    setQuizzes(quizzes.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const removeQuiz = (id: string) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const addAssessment = () => {
    setAssessments([...assessments, { id: Date.now().toString(), question: '', type: 'short_answer', expectedAnswer: '' }]);
  };

  const updateAssessment = (id: string, field: keyof Assessment, value: any) => {
    setAssessments(assessments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const removeAssessment = (id: string) => {
    setAssessments(assessments.filter(a => a.id !== id));
  };

  const handleSubmit = () => {
    if (!moduleTitle.trim()) return;
    const module: Module = {
      id: editModule?.id || Date.now().toString(),
      title: moduleTitle,
      lessons,
      quizzes,
      assessments,
    };
    if (editModule && onEdit) {
      onEdit(module);
    } else {
      onAdd(module);
    }
    setModuleTitle('');
    setLessons([]);
    setQuizzes([]);
    setAssessments([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-2xl text-black my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
          <h2 className="text-xl font-bold">{editModule ? 'Edit Module' : 'Add Module'}</h2>
          <X size={20} className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={onClose} />
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Module Title *</label>
            <input 
              className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-[#00AEEF]" 
              placeholder="e.g. Understanding the Basics" 
              value={moduleTitle} 
              onChange={(e) => setModuleTitle(e.target.value)} 
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 mt-6">
            <button 
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${activeTab === 'lessons' ? 'text-[#00AEEF] border-b-2 border-[#00AEEF]' : 'text-gray-400'}`}
            >
              Lessons ({lessons.length})
            </button>
            <button 
              onClick={() => setActiveTab('quizzes')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${activeTab === 'quizzes' ? 'text-[#00AEEF] border-b-2 border-[#00AEEF]' : 'text-gray-400'}`}
            >
              Quizzes ({quizzes.length})
            </button>
            <button 
              onClick={() => setActiveTab('assessments')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${activeTab === 'assessments' ? 'text-[#00AEEF] border-b-2 border-[#00AEEF]' : 'text-gray-400'}`}
            >
              Assessments ({assessments.length})
            </button>
          </div>

          {/* Lessons Tab */}
          {activeTab === 'lessons' && (
            <div className="space-y-3 mt-4">
              {lessons.map((lesson, idx) => (
                <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-gray-400">LESSON {idx + 1}</span>
                    <button onClick={() => removeLesson(lesson.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <input 
                    className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF]" 
                    placeholder="Lesson title..." 
                    value={lesson.title} 
                    onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)} 
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <select 
                      className="border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF]"
                      value={lesson.type}
                      onChange={(e) => updateLesson(lesson.id, 'type', e.target.value)}
                    >
                      <option value="video">Video</option>
                      <option value="text">Text Content</option>
                      <option value="document">Document</option>
                    </select>
                    
                    <input 
                      className="border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF]" 
                      placeholder="Duration (e.g. 15 min)" 
                      value={lesson.duration} 
                      onChange={(e) => updateLesson(lesson.id, 'duration', e.target.value)} 
                    />
                  </div>
                  
                  {lesson.type === 'video' && (
                    <div className="space-y-2">
                      {lesson.videoUrl && !lesson.videoFile && (
                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded">
                          <Video size={12} className="text-blue-400 shrink-0" />
                          <span className="truncate">Current: {lesson.videoUrl.split('/').pop()}</span>
                        </div>
                      )}
                      {lesson.videoFile && (
                        <div className="flex items-center justify-between text-xs text-green-700 bg-green-50 px-3 py-2 rounded">
                          <div className="flex items-center gap-2 truncate">
                            <Video size={12} className="shrink-0" />
                            <span className="truncate">{lesson.videoFile.name}</span>
                          </div>
                          <button type="button" onClick={() => updateLesson(lesson.id, 'videoFile', null)} className="text-red-400 hover:text-red-600 shrink-0 ml-2">
                            <X size={14} />
                          </button>
                        </div>
                      )}
                      <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-lg py-3 cursor-pointer hover:border-[#00AEEF] hover:bg-blue-50 transition-colors text-sm text-gray-500">
                        <Video size={16} className="text-[#00AEEF]" />
                        {lesson.videoFile ? 'Change video file' : lesson.videoUrl ? 'Replace video' : 'Upload video file'}
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) updateLesson(lesson.id, 'videoFile', f);
                          }}
                        />
                      </label>
                    </div>
                  )}
                  
                  {lesson.type === 'text' && (
                    <textarea 
                      className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF] resize-none" 
                      rows={3}
                      placeholder="Lesson content..." 
                      value={lesson.content || ''} 
                      onChange={(e) => updateLesson(lesson.id, 'content', e.target.value)} 
                    />
                  )}
                </div>
              ))}
              
              <button onClick={addLesson} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-[#00AEEF] font-medium flex items-center justify-center gap-2 hover:border-[#00AEEF] hover:bg-blue-50 transition-colors">
                <Plus size={18} /> Add Lesson
              </button>
            </div>
          )}

          {/* Quizzes Tab */}
          {activeTab === 'quizzes' && (
            <div className="space-y-3 mt-4">
              {quizzes.map((quiz, idx) => (
                <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-gray-400">QUIZ {idx + 1}</span>
                    <button onClick={() => removeQuiz(quiz.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <textarea 
                    className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF] resize-none" 
                    rows={2}
                    placeholder="Quiz question..." 
                    value={quiz.question} 
                    onChange={(e) => updateQuiz(quiz.id, 'question', e.target.value)} 
                  />
                  
                  <select 
                    className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF]"
                    value={quiz.type}
                    onChange={(e) => updateQuiz(quiz.id, 'type', e.target.value as any)}
                  >
                    <option value="mcq">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="fill_blank">Fill in the Blank</option>
                  </select>
                  
                  {quiz.type === 'mcq' && (
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-medium">Options:</label>
                      {quiz.options?.map((opt, optIdx) => (
                        <input 
                          key={optIdx}
                          className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF]" 
                          placeholder={`Option ${optIdx + 1}`} 
                          value={opt} 
                          onChange={(e) => {
                            const newOpts = [...(quiz.options || [])];
                            newOpts[optIdx] = e.target.value;
                            updateQuiz(quiz.id, 'options', newOpts);
                          }} 
                        />
                      ))}
                    </div>
                  )}
                  
                  {quiz.type === 'true_false' && (
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-medium">Options:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="border border-gray-200 p-2 rounded text-sm text-center">True</div>
                        <div className="border border-gray-200 p-2 rounded text-sm text-center">False</div>
                      </div>
                    </div>
                  )}
                  
                  <input 
                    className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF]" 
                    placeholder="Correct answer..." 
                    value={quiz.correctAnswer} 
                    onChange={(e) => updateQuiz(quiz.id, 'correctAnswer', e.target.value)} 
                  />
                </div>
              ))}
              
              <button onClick={addQuiz} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-[#00AEEF] font-medium flex items-center justify-center gap-2 hover:border-[#00AEEF] hover:bg-blue-50 transition-colors">
                <Plus size={18} /> Add Quiz
              </button>
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div className="space-y-3 mt-4">
              {assessments.map((assessment, idx) => (
                <div key={assessment.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-gray-400">ASSESSMENT {idx + 1}</span>
                    <button onClick={() => removeAssessment(assessment.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <textarea 
                    className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF] resize-none" 
                    rows={2}
                    placeholder="Assessment question..." 
                    value={assessment.question} 
                    onChange={(e) => updateAssessment(assessment.id, 'question', e.target.value)} 
                  />
                  
                  <select 
                    className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF]"
                    value={assessment.type}
                    onChange={(e) => updateAssessment(assessment.id, 'type', e.target.value as any)}
                  >
                    <option value="practical">Practical Application</option>
                    <option value="short_answer">Short Answer</option>
                    <option value="matching">Matching Terms</option>
                  </select>
                  
                  <textarea 
                    className="w-full border border-gray-200 p-2 rounded text-sm outline-none focus:border-[#00AEEF] resize-none" 
                    rows={2}
                    placeholder="Expected answer or grading criteria..." 
                    value={assessment.expectedAnswer || ''} 
                    onChange={(e) => updateAssessment(assessment.id, 'expectedAnswer', e.target.value)} 
                  />
                </div>
              ))}
              
              <button onClick={addAssessment} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-[#00AEEF] font-medium flex items-center justify-center gap-2 hover:border-[#00AEEF] hover:bg-blue-50 transition-colors">
                <Plus size={18} /> Add Assessment
              </button>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-8 pt-4 border-t sticky bottom-0 bg-white">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-3 bg-[#00AEEF] text-white rounded-lg font-semibold hover:bg-[#0096ce]">
            {editModule ? 'Update Module' : 'Save Module'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface EditCourse {
  id: number;
  title: string;
  slug: string;
  skill_level: string;
  price: string;
  is_free: boolean;
  is_published: boolean;
  estimated_hours: number;
  thumbnail: string | null;
  total_enrolled: number;
  description?: string;
  what_you_learn?: string;
  ideal_for?: string;
  tools_used?: string;
  what_included?: string;
  duration_weeks?: number;
  hours_per_week?: number;
  is_self_paced?: boolean;
}

interface UploadCoursesProps {
  editCourse?: EditCourse | null;
  onSaved?: () => void;
}

const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced', 'all_levels'];

const UploadCourses: React.FC<UploadCoursesProps> = ({ editCourse, onSaved }) => {
  const isEdit = !!editCourse;
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [modules, setModules] = useState<Module[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [resources, setResources] = useState<File[]>([]);
  const resourceInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [viewDate, setViewDate] = useState(new Date());
  const [selectedFrom, setSelectedFrom] = useState<Date | null>(null);
  const [selectedTo, setSelectedTo] = useState<Date | null>(null);
  const [scheduleType, setScheduleType] = useState('');
  const [finalDurationDisplay, setFinalDurationDisplay] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    skill_level: 'beginner',
    price: '0',
    is_free: false,
    is_published: false,
    estimated_hours: '',
    duration_weeks: '1',
    hours_per_week: '',
    is_self_paced: true,
    tools_used: '',
    ideal_for: '',
    what_included: '',
    what_you_learn: '',
  });

  // Load edit data
  useEffect(() => {
    if (editCourse) {
      setForm((prev) => ({
        ...prev,
        title: editCourse.title,
        description: editCourse.description ?? '',
        skill_level: editCourse.skill_level,
        price: editCourse.price,
        is_free: editCourse.is_free,
        is_published: editCourse.is_published,
        estimated_hours: String(editCourse.estimated_hours),
        what_you_learn: editCourse.what_you_learn ?? '',
        ideal_for: editCourse.ideal_for ?? '',
        tools_used: editCourse.tools_used ?? '',
        what_included: editCourse.what_included ?? '',
        duration_weeks: String(editCourse.duration_weeks ?? '1'),
        hours_per_week: String(editCourse.hours_per_week ?? ''),
        is_self_paced: editCourse.is_self_paced ?? true,
      }));
      if (editCourse.thumbnail) setThumbnailPreview(editCourse.thumbnail);
      
      // Load existing modules
      loadCourseModules(editCourse.id);
    }
  }, [editCourse]);

  const loadCourseModules = async (courseId: number) => {
    try {
      const response = await api.get(`/courses/${courseId}/content/`);
      const data = response.data;
      
      // Transform backend data to frontend format
      const transformedModules: Module[] = data.modules.map((mod: any) => ({
        id: String(mod.id),
        title: mod.title,
        lessons: mod.lessons.map((lesson: any) => ({
          id: String(lesson.id),
          title: lesson.title,
          type: lesson.lesson_type === 'reading' ? 'text' : lesson.lesson_type,
          content: lesson.content,
          videoUrl: lesson.video_url,  // computed absolute URL from serializer
          duration: lesson.duration_minutes ? `${lesson.duration_minutes} min` : '',
        })),
        quizzes: mod.quiz?.questions?.map((q: any) => ({
          id: String(q.id),
          question: q.text,
          type: q.choices.length === 2 ? 'true_false' : q.choices.length === 1 ? 'fill_blank' : 'mcq',
          options: q.choices.map((c: any) => c.text),
          correctAnswer: q.choices.find((c: any) => c.is_correct)?.text || '',
        })) || [],
        assessments: mod.assessments?.map((a: any) => ({
          id: String(a.id),
          question: a.title,
          type: 'short_answer',
          expectedAnswer: a.description,
        })) || [],
      }));
      
      setModules(transformedModules);
    } catch (err) {
      console.error('Failed to load course modules:', err);
    }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleApply = () => {
    if (selectedFrom && selectedTo && scheduleType) {
      const diffDays = Math.ceil(Math.abs(selectedTo.getTime() - selectedFrom.getTime()) / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      const durationStr = `${weeks > 0 ? weeks + ' week' + (weeks > 1 ? 's ' : ' ') : ''}${days > 0 ? days + ' day' + (days > 1 ? 's' : '') : ''}`.trim();
      setFinalDurationDisplay(`${durationStr} (${scheduleType})`);
      setForm((prev) => ({ ...prev, duration_weeks: String(weeks || 1), is_self_paced: scheduleType === 'Self-paced' }));
      setShowCalendar(false);
    }
  };

  const renderMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`e-${i}`} />);
    for (let d = 1; d <= daysInMonth; d++) {
      const current = new Date(year, month, d);
      const isSelected = selectedFrom?.toDateString() === current.toDateString() || selectedTo?.toDateString() === current.toDateString();
      const inRange = selectedFrom && selectedTo && current > selectedFrom && current < selectedTo;
      days.push(
        <div key={d} onClick={() => {
          if (!selectedFrom || (selectedFrom && selectedTo)) { setSelectedFrom(current); setSelectedTo(null); }
          else if (current < selectedFrom) setSelectedFrom(current);
          else setSelectedTo(current);
        }} className={`p-1.5 cursor-pointer text-[10px] rounded-md transition-all ${isSelected ? 'bg-[#00AEEF] text-white font-bold' : inRange ? 'bg-[#E3F5FF] text-[#00AEEF]' : 'text-black hover:bg-gray-100'}`}>
          {d}
        </div>
      );
    }
    return days;
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setErrorMsg('Course title is required.'); setStatus('error'); return; }
    setSaving(true);
    setStatus('idle');
    setErrorMsg('');
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('skill_level', form.skill_level);
      fd.append('price', form.is_free ? '0' : form.price);
      fd.append('is_free', String(form.is_free));
      fd.append('is_published', String(form.is_published));
      fd.append('estimated_hours', form.estimated_hours || '0');
      fd.append('duration_weeks', form.duration_weeks);
      fd.append('hours_per_week', form.hours_per_week || '0');
      fd.append('is_self_paced', String(form.is_self_paced));
      fd.append('tools_used', form.tools_used);
      fd.append('ideal_for', form.ideal_for);
      fd.append('what_included', form.what_included);
      fd.append('what_you_learn', form.what_you_learn);
      fd.append('modules', JSON.stringify(modules));
      if (thumbnail) fd.append('thumbnail', thumbnail);

      let response;
      if (isEdit) {
        response = await api.patch(`/courses/${editCourse!.id}/update/`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        response = await api.post('/courses/create/', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }

      // Upload video files for lessons that have a new file attached
      const savedCourseId = response.data.id;
      const contentRes = await api.get(`/courses/${savedCourseId}/content/`);
      const savedModules = contentRes.data.modules;

      for (let mIdx = 0; mIdx < modules.length; mIdx++) {
        const frontendModule = modules[mIdx];
        const backendModule = savedModules[mIdx];
        if (!backendModule) continue;

        for (let lIdx = 0; lIdx < frontendModule.lessons.length; lIdx++) {
          const lesson = frontendModule.lessons[lIdx];
          const backendLesson = backendModule.lessons[lIdx];
          if (!backendLesson || !lesson.videoFile) continue;

          const videoFd = new FormData();
          videoFd.append('video_file', lesson.videoFile);
          try {
            await api.patch(`/courses/lessons/${backendLesson.id}/`, videoFd, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
          } catch (videoErr: any) {
            // Video upload failed — course was saved, just warn
            console.warn(`Video upload failed for lesson "${lesson.title}":`, videoErr?.response?.data);
          }
        }
      }

      setStatus('success');
      setTimeout(() => { setStatus('idle'); onSaved?.(); }, 2000);
    } catch (err: any) {
      const data = err?.response?.data;
      const msg = data
        ? Object.values(data).flat().join(' ')
        : err?.message || 'Failed to save course.';
      setErrorMsg(msg);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleEditModule = (module: Module) => {
    setEditingModule(module);
    setIsModalOpen(true);
  };

  const handleDeleteModule = (moduleId: string) => {
    if (confirm('Are you sure you want to delete this module?')) {
      setModules(modules.filter(m => m.id !== moduleId));
    }
  };

  const handleAddModule = (module: Module) => {
    setModules([...modules, module]);
  };

  const handleUpdateModule = (updatedModule: Module) => {
    setModules(modules.map(m => m.id === updatedModule.id ? updatedModule : m));
  };

  const getTotalLessons = () => modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const getTotalQuizzes = () => modules.reduce((sum, m) => sum + m.quizzes.length, 0);
  const getTotalAssessments = () => modules.reduce((sum, m) => sum + m.assessments.length, 0);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white font-sans text-black">
      <ModuleModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingModule(null); }} 
        onAdd={handleAddModule}
        onEdit={handleUpdateModule}
        editModule={editingModule}
        moduleCount={modules.length} 
      />
      <input type="file" ref={resourceInputRef} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setResources((p) => [...p, f]); }} />
      <input type="file" ref={thumbnailInputRef} className="hidden" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setThumbnail(f); setThumbnailPreview(URL.createObjectURL(f)); } }} />

      <h2 className="text-base font-bold mb-2 text-black">{isEdit ? `Editing: ${editCourse!.title}` : 'Upload Course'}</h2>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${currentStep === s ? 'bg-[#00AEEF] text-white' : currentStep > s ? 'bg-green-400 text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
            {s < 3 && <div className={`flex-1 h-0.5 ${currentStep > s ? 'bg-green-400' : 'bg-gray-100'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* ── STEP 1: Course Details ── */}
      {currentStep === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Course Title *</label>
            <input className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-black focus:border-[#00AEEF]" value={form.title} onChange={set('title')} placeholder="e.g. Introduction to DAOs" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">What You'll Learn</label>
            <textarea rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none resize-none text-black focus:border-[#00AEEF]" value={form.what_you_learn} onChange={set('what_you_learn')} placeholder="List the key learning outcomes..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Ideal For</label>
            <input className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-black focus:border-[#00AEEF]" value={form.ideal_for} onChange={set('ideal_for')} placeholder="e.g. Beginners, Web3 enthusiasts" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Skill Level</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-black focus:border-[#00AEEF] bg-white" value={form.skill_level} onChange={set('skill_level')}>
                {SKILL_LEVELS.map((l) => <option key={l} value={l}>{l.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Tools Used</label>
              <input className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-black focus:border-[#00AEEF]" value={form.tools_used} onChange={set('tools_used')} placeholder="e.g. MetaMask, Remix" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button onClick={() => setCurrentStep(2)} className="px-12 py-2.5 bg-[#00AEEF] text-white font-semibold rounded-lg">Next</button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Course Structure ── */}
      {currentStep === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Course Description</label>
            <textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none resize-none text-black focus:border-[#00AEEF]" value={form.description} onChange={set('description')} placeholder="Describe what this course covers..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">What's Included</label>
            <textarea rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none resize-none text-black focus:border-[#00AEEF]" value={form.what_included} onChange={set('what_included')} placeholder="e.g. 10 video lessons, quizzes, certificate" />
          </div>

          {/* Modules */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold">Course Modules</h3>
              <button onClick={() => { setEditingModule(null); setIsModalOpen(true); }} className="text-gray-400 text-sm flex items-center gap-1 hover:text-[#00AEEF]">
                Add Module <Plus size={16} />
              </button>
            </div>
            
            {modules.length === 0 && <p className="text-xs text-gray-300 py-4 text-center border border-dashed border-gray-200 rounded-lg">No modules yet. Add your first module above.</p>}
            
            <div className="space-y-4">
              {modules.map((mod, idx) => (
                <div key={mod.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#00AEEF] transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-sm mb-1">Module {idx + 1}: {mod.title}</h4>
                      {mod.description && <p className="text-xs text-gray-500">{mod.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditModule(mod)} className="text-gray-400 hover:text-[#00AEEF]">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteModule(mod.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <BookOpen size={14} className="text-[#00AEEF]" />
                      <span>{mod.lessons.length} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <FileText size={14} className="text-green-500" />
                      <span>{mod.quizzes.length} Quizzes</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <CheckCircle2 size={14} className="text-purple-500" />
                      <span>{mod.assessments.length} Assessments</span>
                    </div>
                  </div>
                  
                  {mod.lessons.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-400 mb-2">Lessons:</p>
                      <ul className="space-y-1">
                        {mod.lessons.slice(0, 3).map((lesson, li) => (
                          <li key={lesson.id} className="text-xs text-gray-600 flex items-center gap-2">
                            {lesson.type === 'video' && <Video size={12} className="text-red-400" />}
                            {lesson.type === 'text' && <FileText size={12} className="text-blue-400" />}
                            {lesson.type === 'document' && <Paperclip size={12} className="text-gray-400" />}
                            <span>{lesson.title || `Lesson ${li + 1}`}</span>
                            {lesson.duration && <span className="text-gray-400">({lesson.duration})</span>}
                          </li>
                        ))}
                        {mod.lessons.length > 3 && (
                          <li className="text-xs text-gray-400 italic">+ {mod.lessons.length - 3} more lessons</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {modules.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700">
                  <strong>Course Summary:</strong> {modules.length} modules • {getTotalLessons()} lessons • {getTotalQuizzes()} quizzes • {getTotalAssessments()} assessments
                </p>
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-2">Upload Resources</label>
            <div onClick={() => setShowResourcesDropdown(!showResourcesDropdown)} className="w-full px-4 py-3 border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer bg-white">
              <span className="text-gray-400 text-sm">Select type...</span>
              <ChevronDown className="text-gray-400" size={20} />
            </div>
            {showResourcesDropdown && (
              <div className="absolute right-0 w-1/2 border border-gray-200 bg-white rounded-b-lg shadow-lg z-20 text-sm">
                <div onClick={() => { resourceInputRef.current?.click(); setShowResourcesDropdown(false); }} className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b text-black">PDFs</div>
                <div onClick={() => { resourceInputRef.current?.click(); setShowResourcesDropdown(false); }} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">Videos</div>
              </div>
            )}
            <div className="mt-2 space-y-1">
              {resources.map((f, i) => (
                <div key={i} className="flex justify-between text-xs bg-gray-50 p-2 rounded">
                  <span>{f.name}</span>
                  <X size={14} className="cursor-pointer" onClick={() => setResources(resources.filter((_, idx) => idx !== i))} />
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Course Thumbnail</label>
            <div
              onClick={() => thumbnailInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#00AEEF] hover:bg-[#E3F5FF]/30 transition-colors"
            >
              {thumbnailPreview ? (
                <div className="relative w-full">
                  <img src={thumbnailPreview} alt="thumbnail preview" className="w-full h-40 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); setThumbnail(null); setThumbnailPreview(null); }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-gray-500 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-2">Click to change thumbnail</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#E3F5FF] flex items-center justify-center">
                    <Paperclip size={22} className="text-[#00AEEF]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700">Click to upload thumbnail</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — recommended 1280×720</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setCurrentStep(1)} className="px-10 py-2.5 bg-white border border-gray-300 text-black font-semibold rounded-lg">Back</button>
            <button onClick={() => setCurrentStep(3)} className="px-10 py-2.5 bg-[#00AEEF] text-white font-semibold rounded-lg">Next</button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Pricing & Duration ── */}
      {currentStep === 3 && (
        <div className="space-y-5 text-black">
          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Pricing</label>
            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={form.is_free} onChange={(e) => setForm((p) => ({ ...p, is_free: e.target.checked }))} className="accent-[#00AEEF]" />
                Free course
              </label>
            </div>
            {!form.is_free && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₦</span>
                <input type="number" min="0" className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg outline-none text-black focus:border-[#00AEEF]" value={form.price} onChange={set('price')} placeholder="0" />
              </div>
            )}
          </div>

          {/* Estimated hours */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Estimated Hours</label>
              <input type="number" min="0" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-black focus:border-[#00AEEF]" value={form.estimated_hours} onChange={set('estimated_hours')} placeholder="e.g. 12" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Hours / Week</label>
              <input type="number" min="0" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-black focus:border-[#00AEEF]" value={form.hours_per_week} onChange={set('hours_per_week')} placeholder="e.g. 3" />
            </div>
          </div>

          {/* Duration */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-2">Duration</label>
            <div onClick={() => setShowDurationDropdown(!showDurationDropdown)} className="w-full px-4 py-3 border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer bg-white">
              <span className={finalDurationDisplay ? 'text-black font-medium text-sm' : 'text-gray-400 text-sm'}>{finalDurationDisplay || 'Select schedule type...'}</span>
              <ChevronDown className="text-gray-400" size={20} />
            </div>
            {showDurationDropdown && (
              <div className="absolute right-0 w-1/2 border border-gray-200 bg-white rounded-lg shadow-lg z-30 text-sm mt-1 overflow-hidden">
                {['Self-paced', 'Scheduled'].map((type) => (
                  <div key={type} onClick={() => { setScheduleType(type); setShowDurationDropdown(false); }} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer text-black ${scheduleType === type ? 'bg-blue-50 text-[#00AEEF] font-bold' : ''}`}>{type}</div>
                ))}
              </div>
            )}
          </div>

          <div onClick={() => setShowCalendar(!showCalendar)} className="w-full bg-[#E3F5FF] p-3 rounded-lg flex items-center justify-between text-[#00AEEF] cursor-pointer">
            <span className="text-sm font-medium">
              {selectedFrom && selectedTo ? `${selectedFrom.toLocaleDateString()} → ${selectedTo.toLocaleDateString()}` : 'Select Date Range'}
            </span>
            <CalendarIcon size={20} />
          </div>

          {showCalendar && (
            <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
              <div className="flex gap-4">
                {[0, 1].map((offset) => {
                  const date = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
                  return (
                    <div key={offset} className="flex-1">
                      <div className="flex justify-between items-center mb-3">
                        {offset === 0 && <ChevronLeft onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} size={16} className="text-[#00AEEF] cursor-pointer" />}
                        <span className="font-bold text-xs">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        {offset === 1 && <ChevronRight onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} size={16} className="text-[#00AEEF] cursor-pointer" />}
                      </div>
                      <div className="grid grid-cols-7 text-[10px] text-center gap-1 font-medium">
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => <div key={d} className="text-gray-400">{d}</div>)}
                        {renderMonth(date)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={handleApply} className="px-6 py-1.5 bg-[#D1F0FF] text-[#00AEEF] font-bold rounded-lg text-[10px]">Apply</button>
              </div>
            </div>
          )}

          {/* Publish toggle */}
          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))} className="accent-[#00AEEF]" />
              Publish course immediately
            </label>
          </div>

          {/* Tokens info */}
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-700">
            <span>🏆</span>
            <span>Completion tokens are set to <strong>10</strong> by default for all courses.</span>
          </div>

          {/* Status */}
          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" /> Course {isEdit ? 'updated' : 'created'} successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-start gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /> {errorMsg}
            </div>
          )}

          <div className="flex justify-between pt-2">
            <button onClick={() => setCurrentStep(2)} className="px-10 py-2.5 bg-white border border-gray-300 text-black font-semibold rounded-lg">Back</button>
            <button onClick={handleSave} disabled={saving} className="px-10 py-2.5 bg-[#00AEEF] text-white font-semibold rounded-lg disabled:opacity-60 flex items-center gap-2">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? 'Saving...' : isEdit ? 'Update Course' : 'Save Course'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCourses;
