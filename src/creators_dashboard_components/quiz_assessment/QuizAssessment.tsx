import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  CheckCircle2,
  Edit3,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  BookOpen,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import api from "@/lib/api";

interface Course {
  id: number;
  title: string;
  slug: string;
}

interface Module {
  id: number;
  title: string;
  order: number;
}

interface Quiz {
  id: number;
  title: string;
  pass_score: number;
  reward_tokens: number;
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
  order: number;
  choices: Choice[];
}

interface Choice {
  id: number;
  text: string;
  is_correct: boolean;
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  assessment_type: string;
  duration_minutes: number;
}

const QuizAssessment = () => {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [contentType, setContentType] = useState<'quiz' | 'assessment'>('quiz');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Quiz creation state
  const [quizTitle, setQuizTitle] = useState('');
  const [passScore, setPassScore] = useState(70);
  const [questions, setQuestions] = useState<{
    text: string;
    choices: { text: string; is_correct: boolean }[];
  }[]>([]);

  // Assessment creation state
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [assessmentDescription, setAssessmentDescription] = useState('');
  const [assessmentType, setAssessmentType] = useState<'graded' | 'practice'>('graded');
  const [durationMinutes, setDurationMinutes] = useState(20);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadModules(selectedCourse.id);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedModule) {
      if (contentType === 'quiz') {
        loadQuiz(selectedModule.id);
      } else {
        loadAssessments(selectedModule.id);
      }
    }
  }, [selectedModule, contentType]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/courses/my/courses/');
      setCourses(response.data);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const loadModules = async (courseId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/courses/${courseId}/content/`);
      setModules(response.data.modules || []);
      setSelectedModule(null);
    } catch (err) {
      setError('Failed to load modules');
    } finally {
      setLoading(false);
    }
  };

  const loadQuiz = async (moduleId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/courses/${selectedCourse?.id}/content/`);
      const module = response.data.modules.find((m: any) => m.id === moduleId);
      if (module?.quiz) {
        setQuizzes([module.quiz]);
      } else {
        setQuizzes([]);
      }
    } catch (err) {
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const loadAssessments = async (moduleId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/courses/${selectedCourse?.id}/content/`);
      const module = response.data.modules.find((m: any) => m.id === moduleId);
      setAssessments(module?.assessments || []);
    } catch (err) {
      setError('Failed to load assessments');
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async () => {
    if (!selectedModule || !quizTitle || questions.length === 0) {
      setError('Please fill in all required fields and add at least one question');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.post(`/courses/modules/${selectedModule.id}/quiz/create/`, {
        title: quizTitle,
        pass_score: passScore,
        questions: questions.map((q, idx) => ({
          text: q.text,
          order: idx + 1,
          choices: q.choices,
        })),
      });
      setSuccess('Quiz created successfully!');
      setView('list');
      resetQuizForm();
      loadQuiz(selectedModule.id);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  const createAssessment = async () => {
    if (!selectedCourse || !selectedModule || !assessmentTitle) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.post(`/courses/${selectedCourse.id}/assessments/create/`, {
        title: assessmentTitle,
        description: assessmentDescription,
        assessment_type: assessmentType,
        duration_minutes: durationMinutes,
        module: selectedModule.id,
      });
      setSuccess('Assessment created successfully!');
      setView('list');
      resetAssessmentForm();
      loadAssessments(selectedModule.id);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create assessment');
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (quizId: number) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;

    try {
      setLoading(true);
      await api.delete(`/courses/quizzes/${quizId}/`);
      setSuccess('Quiz deleted successfully!');
      if (selectedModule) loadQuiz(selectedModule.id);
    } catch (err) {
      setError('Failed to delete quiz');
    } finally {
      setLoading(false);
    }
  };

  const deleteAssessment = async (assessmentId: number) => {
    if (!confirm('Are you sure you want to delete this assessment?')) return;

    try {
      setLoading(true);
      await api.delete(`/courses/assessments/${assessmentId}/`);
      setSuccess('Assessment deleted successfully!');
      if (selectedModule) loadAssessments(selectedModule.id);
    } catch (err) {
      setError('Failed to delete assessment');
    } finally {
      setLoading(false);
    }
  };

  const resetQuizForm = () => {
    setQuizTitle('');
    setPassScore(70);
    setQuestions([]);
  };

  const resetAssessmentForm = () => {
    setAssessmentTitle('');
    setAssessmentDescription('');
    setAssessmentType('graded');
    setDurationMinutes(20);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        choices: [
          { text: '', is_correct: false },
          { text: '', is_correct: false },
          { text: '', is_correct: false },
          { text: '', is_correct: false },
        ],
      },
    ]);
  };

  const updateQuestion = (index: number, text: string) => {
    const updated = [...questions];
    updated[index].text = text;
    setQuestions(updated);
  };

  const updateChoice = (qIndex: number, cIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex].text = text;
    setQuestions(updated);
  };

  const setCorrectChoice = (qIndex: number, cIndex: number) => {
    const updated = [...questions];
    updated[qIndex].choices.forEach((c, i) => {
      c.is_correct = i === cIndex;
    });
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white font-sans text-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-2">Quiz & Assessment Manager</h1>
        <p className="text-sm text-gray-500">Create and manage quizzes and assessments for your course modules</p>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
          <button onClick={() => setError('')} className="ml-auto">
            <X size={16} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2 text-green-700">
          <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
          <span className="text-sm">{success}</span>
          <button onClick={() => setSuccess('')} className="ml-auto">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Type Toggle */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => { setContentType('quiz'); setView('list'); }}
          className={`px-6 py-3 font-medium transition-colors ${
            contentType === 'quiz'
              ? 'text-[#00AEEF] border-b-2 border-[#00AEEF]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Quizzes
        </button>
        <button
          onClick={() => { setContentType('assessment'); setView('list'); }}
          className={`px-6 py-3 font-medium transition-colors ${
            contentType === 'assessment'
              ? 'text-[#00AEEF] border-b-2 border-[#00AEEF]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Assessments
        </button>
      </div>

      {/* Course & Module Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Select Course</label>
          <select
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF] bg-white"
            value={selectedCourse?.id || ''}
            onChange={(e) => {
              const course = courses.find(c => c.id === Number(e.target.value));
              setSelectedCourse(course || null);
              setSelectedModule(null);
            }}
          >
            <option value="">-- Select a course --</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Select Module</label>
          <select
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF] bg-white disabled:bg-gray-50"
            value={selectedModule?.id || ''}
            onChange={(e) => {
              const module = modules.find(m => m.id === Number(e.target.value));
              setSelectedModule(module || null);
            }}
            disabled={!selectedCourse}
          >
            <option value="">-- Select a module --</option>
            {modules.map(module => (
              <option key={module.id} value={module.id}>{module.title}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#00AEEF]" size={32} />
        </div>
      )}

      {/* LIST VIEW */}
      {view === 'list' && !loading && selectedModule && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">
              {contentType === 'quiz' ? 'Quizzes' : 'Assessments'} for {selectedModule.title}
            </h2>
            <button
              onClick={() => setView('create')}
              className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#0096ce]"
            >
              <Plus size={18} />
              Create {contentType === 'quiz' ? 'Quiz' : 'Assessment'}
            </button>
          </div>

          {contentType === 'quiz' ? (
            <div className="space-y-4">
              {quizzes.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">No quiz created for this module yet</p>
                  <button
                    onClick={() => setView('create')}
                    className="px-6 py-2 bg-[#00AEEF] text-white rounded-lg font-medium hover:bg-[#0096ce]"
                  >
                    Create Quiz
                  </button>
                </div>
              ) : (
                quizzes.map(quiz => (
                  <div key={quiz.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">{quiz.title}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Pass Score: {quiz.pass_score}%</span>
                          <span>Reward: {quiz.reward_tokens} tokens</span>
                          <span>Questions: {quiz.questions?.length || 0}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteQuiz(quiz.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    {quiz.questions && quiz.questions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-400 mb-2">QUESTIONS:</p>
                        <ul className="space-y-2">
                          {quiz.questions.map((q, idx) => (
                            <li key={q.id} className="text-sm text-gray-700">
                              {idx + 1}. {q.text}
                              <span className="text-gray-400 ml-2">({q.choices?.length || 0} choices)</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {assessments.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                  <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">No assessments created for this module yet</p>
                  <button
                    onClick={() => setView('create')}
                    className="px-6 py-2 bg-[#00AEEF] text-white rounded-lg font-medium hover:bg-[#0096ce]"
                  >
                    Create Assessment
                  </button>
                </div>
              ) : (
                assessments.map(assessment => (
                  <div key={assessment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">{assessment.title}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Type: {assessment.assessment_type}</span>
                          <span>Duration: {assessment.duration_minutes} min</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteAssessment(assessment.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    {assessment.description && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-400 mb-2">DESCRIPTION:</p>
                        <p className="text-sm text-gray-700">{assessment.description}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* CREATE QUIZ VIEW */}
      {view === 'create' && contentType === 'quiz' && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setView('list')}
              className="text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">Create Quiz for {selectedModule?.title}</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Quiz Title *</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                placeholder="e.g., Module 1 Quiz"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Pass Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                value={passScore}
                onChange={(e) => setPassScore(Number(e.target.value))}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-600">Questions *</label>
                <button
                  onClick={addQuestion}
                  className="px-4 py-2 bg-blue-50 text-[#00AEEF] rounded-lg font-medium flex items-center gap-2 hover:bg-blue-100"
                >
                  <Plus size={18} />
                  Add Question
                </button>
              </div>

              <div className="space-y-6">
                {questions.map((question, qIdx) => (
                  <div key={qIdx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-bold text-gray-400">QUESTION {qIdx + 1}</span>
                      <button
                        onClick={() => removeQuestion(qIdx)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <textarea
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF] mb-4"
                      rows={2}
                      placeholder="Enter question text..."
                      value={question.text}
                      onChange={(e) => updateQuestion(qIdx, e.target.value)}
                    />

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-400 mb-2">CHOICES (click to mark as correct):</p>
                      {question.choices.map((choice, cIdx) => (
                        <div key={cIdx} className="flex gap-2">
                          <input
                            type="radio"
                            name={`correct-${qIdx}`}
                            checked={choice.is_correct}
                            onChange={() => setCorrectChoice(qIdx, cIdx)}
                            className="mt-3"
                          />
                          <input
                            type="text"
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                            placeholder={`Choice ${cIdx + 1}`}
                            value={choice.text}
                            onChange={(e) => updateChoice(qIdx, cIdx, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {questions.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-gray-400 text-sm">No questions added yet. Click "Add Question" to start.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setView('list')}
                className="flex-1 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createQuiz}
                disabled={loading}
                className="flex-1 py-3 bg-[#00AEEF] text-white rounded-lg font-medium hover:bg-[#0096ce] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE ASSESSMENT VIEW */}
      {view === 'create' && contentType === 'assessment' && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setView('list')}
              className="text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">Create Assessment for {selectedModule?.title}</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Assessment Title *</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                placeholder="e.g., Module 1 Assessment"
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Description / Instructions</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                rows={4}
                placeholder="Describe what students need to do..."
                value={assessmentDescription}
                onChange={(e) => setAssessmentDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF] bg-white"
                  value={assessmentType}
                  onChange={(e) => setAssessmentType(e.target.value as 'graded' | 'practice')}
                >
                  <option value="graded">Graded</option>
                  <option value="practice">Practice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#00AEEF]"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setView('list')}
                className="flex-1 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createAssessment}
                disabled={loading}
                className="flex-1 py-3 bg-[#00AEEF] text-white rounded-lg font-medium hover:bg-[#0096ce] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                Create Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {!selectedModule && !loading && view === 'list' && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Select a course and module to manage quizzes and assessments</p>
        </div>
      )}
    </div>
  );
};

export default QuizAssessment;