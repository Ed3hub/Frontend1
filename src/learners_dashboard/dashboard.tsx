import React, { useState } from 'react';
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

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage setActivePage={setActivePage} setSelectedCourse={setSelectedCourse} />;
      case 'languages': return <LanguagePage />;
      case 'tutors': return <TutorsPage setSelectedTutor={setSelectedTutor} setActivePage={setActivePage} />;
      case 'tutorProfile': return <TutorProfilePage tutor={selectedTutor} setActivePage={setActivePage} />;
      // case 'community': return <CommunityPage />;
      case 'chat': return <ChatPage tutor={selectedTutor} />;
      case 'ongoingCourses': return <OngoingCourses setActivePage={setActivePage} setSelectedCourse={setSelectedCourse} />;
      case 'recommendedCourses': return <RecommendedCourses setActivePage={setActivePage} setSelectedCourse={setSelectedCourse} />;
      case 'courseDetails': return <CourseDetails setActivePage={setActivePage} course={selectedCourse} setSelectedCourse={setSelectedCourse} setSelectedLesson={setSelectedLesson} />;
      case 'courseLearning': return <CourseLearning setActivePage={setActivePage} course={selectedCourse} />;
      case 'courseLesson': return <CourseLesson setActivePage={setActivePage} course={selectedCourse} lesson={selectedLesson} />;
      case 'payment': return <CheckoutFlow setActivePage={setActivePage} setSelectedCourse={setSelectedCourse} course={selectedCourse} />;
      case 'subscription': return <SubscriptionPage setActivePage={setActivePage} />;
      case 'profile': return <ProfilePage setActivePage={setActivePage} />;
      case 'tokens': return <TokensPage setActivePage={setActivePage} />;
      default: return <HomePage setActivePage={setActivePage} setSelectedCourse={setSelectedCourse} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="transition-all duration-300">
        {renderPage()}
      </main>
    </div>
  );
}
