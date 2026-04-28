'use client';
import React, { useState } from "react";
import {
  Sidebar,
  Header,
  Selection,
  Profile,
  MyCourses,
  UploadCourses,
  QuizAssessment,
  Community,
  ScheduleSession,
  Pricing,
  CourseVisibility,
  PublishCourse,
  Earnings,
  ResetPassword,
} from "../creators_dashboard_components";
import QuizAssessmentManager from "../creators_dashboard_components/quiz_assessment/QuizAssessmentManager";
import LanguagePage from "../learners_dashboard/components/LanguagePage";
import ChatPage from "../learners_dashboard/components/ChatPage";
import "./dashboard.css";

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
  description: string;
  what_you_learn: string;
  ideal_for: string;
  tools_used: string;
  what_included: string;
  duration_weeks: number;
  hours_per_week: number;
  is_self_paced: boolean;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selected, setSelected] = useState("My Courses");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [editCourse, setEditCourse] = useState<EditCourse | null>(null);

  const handleEditCourse = (course: EditCourse) => {
    setEditCourse(course);
    setSelected("Upload courses");
  };

  const handleCourseSaved = () => {
    setEditCourse(null);
    setSelected("My Courses");
  };

  if (activePage === "profile") {
    return (
      <div className="min-h-screen bg-white">
        <Header
          isMobileMenuOpen={false}
          setIsMobileMenuOpen={() => {}}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setActivePage={setActivePage}
        />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button
            onClick={() => setActivePage("dashboard")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Dashboard
          </button>
          <Profile />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {isMobileMenuOpen && (
        <div
          className="mobile-overlay md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <header className="head">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setActivePage={setActivePage}
        />
      </header>
      <aside className={`side ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <Sidebar
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === "Home") { setSelected("My Courses"); setEditCourse(null); }
            if (tab === "Account") setSelected("Earnings");
            if (tab === "Messages") setSelected("");
          }}
        />
      </aside>
      <section className="section">
        {activeTab !== "Messages" && (
          <Selection
            selected={selected}
            setSelected={(s) => { setSelected(s); if (s !== "Upload courses") setEditCourse(null); }}
            activeTab={activeTab}
          />
        )}
      </section>
      <main className="main">
        {activeTab === "Messages" ? (
          <ChatPage tutor={null} />
        ) : (
          <>
            {selected === "My Courses" && <MyCourses onEdit={handleEditCourse} />}
            {selected === "Upload courses" && <UploadCourses editCourse={editCourse} onSaved={handleCourseSaved} />}
            {selected === "Quiz and Assessment" && <QuizAssessmentManager />}
            {selected === "Community and Interaction" && <Community />}
            {selected === "Schedule a Session" && <ScheduleSession />}
            {selected === "Earnings" && <Earnings />}
            {selected === "Reset your password" && <ResetPassword />}
            {selected === "Language" && <LanguagePage />}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
