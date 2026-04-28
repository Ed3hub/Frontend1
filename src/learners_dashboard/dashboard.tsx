import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LanguagePage from './components/LanguagePage';
import TutorsPage from './components/TutorsPage';
import TutorProfilePage from './components/TutorProfilePage';
// import CommunityPage from './components/CommunityPage';
import ChatPage from './components/ChatPage';
import OngoingCourses from './components/OngoingCourses';
import CourseDetails from './components/CourseDetails';
import RecommendedCourses from './components/RecommendedCourses';
import CheckoutFlow from './components/Payment';
import SubscriptionPage from './components/Subscription';
import CourseLearning from './components/CourseLearning';
import CourseLesson from './components/CourseLesson';
import TokensPage from './components/TokensPage';
import ProfilePage from './components/ProfilePage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedTutor, setSelectedTutor] = useState<{
    id: number; username: string; full_name: string;
    email: string; bio: string; avatar: string | null;
    total_courses: number; whatsapp: string; facebook: string; twitter_x: string;
  } | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{ title: string; instructor: string; img: string; slug?: string; price?: string; courseId?: number; showPurchaseModal?: boolean } | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{ title: string; type: string; duration: string; completed: boolean } | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  useEffect(() => {
    // 1. Handle initial page from URL query param
    const params = new URLSearchParams(window.location.search);
    const initialPage = params.get('page');
    if (initialPage) {
      setActivePage(initialPage);
    }

    // 2. Handle browser back/forward buttons
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setActivePage(event.state.page);
      } else {
        // Fallback if no state (e.g., initial entry)
        const currentParams = new URLSearchParams(window.location.search);
        setActivePage(currentParams.get('page') || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handlePageChange = (page: string) => {
    if (page !== activePage) {
      setActivePage(page);
      // Update browser history
      window.history.pushState({ page }, '', `?page=${page}`);
    }
  };

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage setActivePage={handlePageChange} setSelectedCourse={setSelectedCourse} />;
      case 'languages': return <LanguagePage />;
      case 'tutors': return <TutorsPage setSelectedTutor={setSelectedTutor} setActivePage={handlePageChange} />;
      case 'tutorProfile': return <TutorProfilePage tutor={selectedTutor} setActivePage={handlePageChange} />;
      // case 'community': return <CommunityPage />;
      case 'chat': return <ChatPage tutor={selectedTutor} />;
      case 'ongoingCourses': return <OngoingCourses setActivePage={handlePageChange} setSelectedCourse={setSelectedCourse} />;
      case 'recommendedCourses': return <RecommendedCourses setActivePage={handlePageChange} setSelectedCourse={setSelectedCourse} />;
      case 'courseDetails': return <CourseDetails setActivePage={handlePageChange} course={selectedCourse} setSelectedCourse={setSelectedCourse} setSelectedLessonId={setSelectedLessonId} />;
      case 'courseLearning': return <CourseLearning setActivePage={handlePageChange} course={selectedCourse} initialLessonId={selectedLessonId} />;
      case 'courseLesson': return <CourseLesson setActivePage={handlePageChange} course={selectedCourse} lesson={selectedLesson} />;
      case 'payment': return <CheckoutFlow setActivePage={handlePageChange} setSelectedCourse={setSelectedCourse} course={selectedCourse} />;
      case 'subscription': return <SubscriptionPage setActivePage={handlePageChange} />;
      case 'profile': return <ProfilePage setActivePage={handlePageChange} />;
      case 'tokens': return <TokensPage setActivePage={handlePageChange} />;
      default: return <HomePage setActivePage={handlePageChange} setSelectedCourse={setSelectedCourse} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Navbar activePage={activePage} setActivePage={handlePageChange} />
      <main className="transition-all duration-300">
        {renderPage()}
      </main>
    </div>
  );
}

