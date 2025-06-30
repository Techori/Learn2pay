import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import InstituteDashboard from "../pages/dashboards/Institute";
import ParentDashboard from "../pages/dashboards/parent";

const DashboardRouter: React.FC = () => {
  const { userType, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="flex items-center space-x-2 text-orange-400">
          <div className="w-6 h-6 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (userType === "institute") {
    return <InstituteDashboard />;
  } else if (userType === "parent") {
    return <ParentDashboard />;
  } else {
    // If no user type, redirect to login
    return <Navigate to="/login" replace />;
  }
};

export default DashboardRouter;
