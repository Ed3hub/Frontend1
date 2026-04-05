'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface Choice {
  id?: number;
  text: string;
  is_correct: boolean;
}

interface Question {
  id?: number;
  text: string;
  order: number;
  choices: Choice[];
}

interface Quiz {
  id?: number;
  module?: number;
  title: string;
  pass_score: number;
  reward_tokens: number;
  questions: Question[];
}

interface Assessment {
  id?: number;
  course?: number;
  module?: number;
  title: string;
  description: string;
  assessment_type: 'graded' | 'practice';
  duration_minutes: number;
  due_date?: string;
  reward_tokens: number;
}

interface Module {
  id: number;
  title: string;
  course: number;
}

interface ModuleWithQuiz extends Module {
  quiz?: Quiz;
}

const QuizAssessmentManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'assessments'>('quizzes');
  const [courses, setCourses] = useState<any[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [modulesWithQuizzes, setModulesWithQuizzes] = useState<ModuleWithQuiz[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Quiz | Assessment | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Quiz form state
  const [quizForm, setQuizForm] = useState<Quiz>({
    title: '',
    pass_score: 70,
    reward_tokens: 5,
    questions: [],
  });

  // Assessment form state
  const [assessmentForm, setAssessmentForm] = useState<Assessment>({
    title: '',
    description: '',
    assessment_type: 'graded',
    duration_minutes: 20,
    reward_tokens: 15,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadModules(selectedCourse);
      if (activeTab === 'quizzes') {
        loadQuizzes(selectedCourse);
      } else {
        loadAssessments(selectedCourse);
      }
    }
  }, [selectedCourse, activeTab]);

  const loadCourses = async () => {
    try {
      const response = await api.get('/courses/my/courses/');
      setCourses(response.data);
      if (response.data.length > 0) {
        setSelectedCourse(response.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const loadModules = async (courseId: number) => {
    try {
      const response = await api.get(`/courses/${courseId}/content/`);
      setModules(response.data.modules || []);
    } catch (err) {
      console.error('Failed to load modules:', err);
    }
  };

  const loadQuizzes = async (courseId: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/courses/${courseId}/content/`);
      console.log('Course content response:', response.data);
      
      const allQuizzes: Quiz[] = [];
      const modsWithQuizzes: ModuleWithQuiz[] = [];
      
      response.data.modules.forEach((mod: any) => {
        console.log('Processing module:', mod);
        
        const moduleData: ModuleWithQuiz = {
          id: mod.id,
          title: mod.title,
          course: mod.course,
        };
        
        if (mod.quiz) {
          console.log('Found quiz for module:', mod.id, mod.quiz);
          moduleData.quiz = {
            ...mod.quiz,
            module: mod.id,
          };
          allQuizzes.push(moduleData.quiz);
        } else {
          console.log('No quiz for module:', mod.id);
        }
        
        modsWithQuizzes.push(moduleData);
      });
      
      console.log('Modules with quizzes:', modsWithQuizzes);
      console.log('All quizzes:', allQuizzes);
      
      setModulesWithQuizzes(modsWithQuizzes);
      setQuizzes(allQuizzes);
    } catch (err) {
      console.error('Failed to load quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAssessments = async (courseId: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/courses/${courseId}/content/`);
      setAssessments(response.data.assessments || []);
    } catch (err) {
      console.error('Failed to load assessments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [
        ...quizForm.questions,
        {
          text: '',
          order: quizForm.questions.length + 1,
          choices: [
            { text: '', is_correct: false },
            { text: '', is_correct: false },
            { text: '', is_correct: false },
            { text: '', is_correct: false },
          ],
        },
      ],
    });
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...quizForm.questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuizForm({ ...quizForm, questions: updated });
  };

  const updateChoice = (qIndex: number, cIndex: number, field: keyof Choice, value: any) => {
    const updated = [...quizForm.questions];
    const updatedChoices = [...updated[qIndex].choices];
    updatedChoices[cIndex] = { ...updatedChoices[cIndex], [field]: value };
    updated[qIndex] = { ...updated[qIndex], choices: updatedChoices };
    setQuizForm({ ...quizForm, questions: updated });
  };

  const removeQuestion = (index: number) => {
    setQuizForm({
      ...quizForm,
      questions: quizForm.questions.filter((_, i) => i !== index),
    });
  };

  const handleSaveQuiz = async () => {
    if (!quizForm.module || !quizForm.title.trim()) {
      setErrorMsg('Please select a module and enter a quiz title');
      setStatus('error');
      return;
    }

    setSaving(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      if (editingItem && 'id' in editingItem) {
        await api.patch(`/courses/quizzes/${editingItem.id}/`, quizForm);
      } else {
        await api.post(`/courses/modules/${quizForm.module}/quiz/create/`, quizForm);
      }
      setStatus('success');
      setIsModalOpen(false);
      if (selectedCourse) loadQuizzes(selectedCourse);
      resetForms();
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || 'Failed to save quiz');
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAssessment = async () => {
    if (!selectedCourse || !assessmentForm.title.trim()) {
      setErrorMsg('Please enter an assessment title');
      setStatus('error');
      return;
    }

    setSaving(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      const data = { ...assessmentForm, course: selectedCourse };
      if (editingItem && 'id' in editingItem) {
        await api.patch(`/courses/assessments/${editingItem.id}/`, data);
      } else {
        await api.post(`/courses/${selectedCourse}/assessments/create/`, data);
      }
      setStatus('success');
      setIsModalOpen(false);
      if (selectedCourse) loadAssessments(selectedCourse);
      resetForms();
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || 'Failed to save assessment');
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: Quiz | Assessment) => {
    setEditingItem(item);
    if (activeTab === 'quizzes') {
      const quiz = item as Quiz;
      console.log('Editing quiz:', quiz);
      // Ensure questions have proper structure with choices
      const formattedQuestions = quiz.questions?.map(q => ({
        ...q,
        choices: q.choices && q.choices.length > 0 ? q.choices : [
          { text: '', is_correct: false },
          { text: '', is_correct: false },
          { text: '', is_correct: false },
          { text: '', is_correct: false },
        ]
      })) || [];
      console.log('Formatted questions:', formattedQuestions);
      setQuizForm({
        ...quiz,
        questions: formattedQuestions
      });
    } else {
      setAssessmentForm(item as Assessment);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      if (activeTab === 'quizzes') {
        await api.delete(`/courses/quizzes/${id}/`);
        if (selectedCourse) loadQuizzes(selectedCourse);
      } else {
        await api.delete(`/courses/assessments/${id}/`);
        if (selectedCourse) loadAssessments(selectedCourse);
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const resetForms = () => {
    setQuizForm({
      title: '',
      pass_score: 70,
      reward_tokens: 5,
      questions: [],
    });
    setAssessmentForm({
      title: '',
      description: '',
      assessment_type: 'graded',
      duration_minutes: 20,
      reward_tokens: 15,
    });
    setEditingItem(null);
  };

  const openModal = () => {
    resetForms();
    setIsModalOpen(true);
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quiz & Assessment Manager</h2>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#0096ce]"
        >
          <Plus size={18} />
          Add {activeTab === 'quizzes' ? 'Quiz' : 'Assessment'}
        </button>
      </div>

      {/* Course Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">Select Course</label>
        <select
          className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
          value={selectedCourse || ''}
          onChange={(e) => setSelectedCourse(Number(e.target.value))}
        >
          <option value="">Select a course...</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'quizzes'
              ? 'text-[#00AEEF] border-b-2 border-[#00AEEF]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Quizzes ({quizzes.length})
        </button>
        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'assessments'
              ? 'text-[#00AEEF] border-b-2 border-[#00AEEF]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Assessments ({assessments.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#00AEEF]" />
        </div>
      ) : (
        <div className="space-y-4">
          {activeTab === 'quizzes' ? (
            !selectedCourse ? (
              <p className="text-center text-gray-400 py-12">Please select a course to view modules and quizzes</p>
            ) : modulesWithQuizzes.length === 0 ? (
              <p className="text-center text-gray-400 py-12">No modules found. Add modules to your course first.</p>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-2">Showing {modulesWithQuizzes.length} modules</p>
                {modulesWithQuizzes.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#00AEEF] transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{module.title}</h3>
                        {module.quiz ? (
                          <>
                            <p className="text-sm text-gray-500 mb-2">Quiz: {module.quiz.title}</p>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span>Pass Score: {module.quiz.pass_score}%</span>
                              <span>Reward: {module.quiz.reward_tokens} tokens</span>
                              <span>Questions: {module.quiz.questions?.length || 0}</span>
                            </div>
                          </>
                        ) : (
                          <p className="text-sm text-gray-400 italic">No quiz yet</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {module.quiz ? (
                          <>
                            <button
                              onClick={() => handleEdit(module.quiz!)}
                              className="p-2 text-gray-400 hover:text-[#00AEEF] hover:bg-blue-50 rounded"
                              title="Edit Quiz"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(module.quiz!.id!)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                              title="Delete Quiz"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              resetForms();
                              setQuizForm({ ...quizForm, module: module.id });
                              setIsModalOpen(true);
                            }}
                            className="px-3 py-1 text-sm bg-[#00AEEF] text-white rounded hover:bg-[#0096ce]"
                          >
                            Add Quiz
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )
          ) : assessments.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No assessments yet. Create your first assessment!</p>
          ) : (
            assessments.map((assessment) => (
              <div key={assessment.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#00AEEF] transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{assessment.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{assessment.description}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Type: {assessment.assessment_type}</span>
                      <span>Duration: {assessment.duration_minutes} min</span>
                      <span>Reward: {assessment.reward_tokens} tokens</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(assessment)}
                      className="p-2 text-gray-400 hover:text-[#00AEEF] hover:bg-blue-50 rounded"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(assessment.id!)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-4xl p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
              <h2 className="text-xl font-bold">
                {editingItem ? 'Edit' : 'Add'} {activeTab === 'quizzes' ? 'Quiz' : 'Assessment'}
              </h2>
              <X
                size={20}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            {activeTab === 'quizzes' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Module *</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={quizForm.module || ''}
                    onChange={(e) => setQuizForm({ ...quizForm, module: Number(e.target.value) })}
                    disabled={editingItem !== null}
                  >
                    <option value="">Select module...</option>
                    {modulesWithQuizzes.map((mod) => {
                      const hasQuiz = !editingItem && mod.quiz;
                      return (
                        <option key={mod.id} value={mod.id} disabled={hasQuiz}>
                          {mod.title} {hasQuiz ? '(Quiz exists)' : ''}
                        </option>
                      );
                    })}
                  </select>
                  {!editingItem && (
                    <p className="text-xs text-gray-400 mt-1">Note: Each module can only have one quiz. Modules with existing quizzes are disabled.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Quiz Title *</label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={quizForm.title}
                    onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                    placeholder="e.g. Module 1 Quiz"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Pass Score (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                      value={quizForm.pass_score}
                      onChange={(e) => setQuizForm({ ...quizForm, pass_score: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Reward Tokens</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                      value={quizForm.reward_tokens}
                      onChange={(e) => setQuizForm({ ...quizForm, reward_tokens: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-400">Questions</label>
                    <button
                      onClick={handleAddQuestion}
                      className="text-[#00AEEF] text-sm font-medium flex items-center gap-1"
                    >
                      <Plus size={16} /> Add Question
                    </button>
                  </div>

                  <div className="space-y-4">
                    {quizForm.questions.map((question, qIndex) => (
                      <div key={qIndex} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-gray-400">QUESTION {qIndex + 1}</span>
                          <button
                            onClick={() => removeQuestion(qIndex)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <textarea
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF] text-sm"
                          rows={2}
                          placeholder="Enter question..."
                          value={question.text}
                          onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                        />

                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 font-medium">Choices (check the correct answer):</label>
                          {question.choices.map((choice, cIndex) => {
                            console.log(`Question ${qIndex}, Choice ${cIndex}:`, choice);
                            return (
                              <div key={cIndex} className="flex gap-2 items-center">
                                <input
                                  type="checkbox"
                                  checked={choice.is_correct || false}
                                  onChange={(e) => updateChoice(qIndex, cIndex, 'is_correct', e.target.checked)}
                                  className="accent-[#00AEEF] w-4 h-4"
                                />
                                <input
                                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF] text-sm"
                                  placeholder={`Choice ${cIndex + 1}`}
                                  value={choice.text}
                                  onChange={(e) => updateChoice(qIndex, cIndex, 'text', e.target.value)}
                                />
                                {choice.is_correct && <span className="text-xs text-green-600 font-medium">✓ Correct</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle2 size={16} /> Quiz saved successfully!
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
                    onClick={handleSaveQuiz}
                    disabled={saving}
                    className="flex-1 py-3 bg-[#00AEEF] text-white rounded-lg font-semibold hover:bg-[#0096ce] disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : 'Save Quiz'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Module (Optional)</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={assessmentForm.module || ''}
                    onChange={(e) =>
                      setAssessmentForm({ ...assessmentForm, module: e.target.value ? Number(e.target.value) : undefined })
                    }
                  >
                    <option value="">Course-level assessment</option>
                    {modules.map((mod) => (
                      <option key={mod.id} value={mod.id}>
                        {mod.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Assessment Title *</label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={assessmentForm.title}
                    onChange={(e) => setAssessmentForm({ ...assessmentForm, title: e.target.value })}
                    placeholder="e.g. Final Project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    rows={4}
                    value={assessmentForm.description}
                    onChange={(e) => setAssessmentForm({ ...assessmentForm, description: e.target.value })}
                    placeholder="Describe the assessment requirements..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                      value={assessmentForm.assessment_type}
                      onChange={(e) =>
                        setAssessmentForm({ ...assessmentForm, assessment_type: e.target.value as 'graded' | 'practice' })
                      }
                    >
                      <option value="graded">Graded</option>
                      <option value="practice">Practice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                      value={assessmentForm.duration_minutes}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, duration_minutes: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Reward Tokens</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={assessmentForm.reward_tokens}
                    onChange={(e) => setAssessmentForm({ ...assessmentForm, reward_tokens: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Due Date (Optional)</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                    value={assessmentForm.due_date || ''}
                    onChange={(e) => setAssessmentForm({ ...assessmentForm, due_date: e.target.value })}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle2 size={16} /> Assessment saved successfully!
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
                    onClick={handleSaveAssessment}
                    disabled={saving}
                    className="flex-1 py-3 bg-[#00AEEF] text-white rounded-lg font-semibold hover:bg-[#0096ce] disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : 'Save Assessment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAssessmentManager;
