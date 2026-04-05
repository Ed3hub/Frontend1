"use client";

import AuthGuard from "@/components/AuthGuard";
import Dashboard from "@/learners_dashboard/dashboard";

export default function LearnerDashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
