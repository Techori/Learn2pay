import React from "react";
import { LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import UserProfile from "@/components/shared/UserProfile";
import NotificationCenter from "@/components/shared/NotificationCenter";
import ThemeToggle from "../ThemeToggle";

interface Badge {
  text: string;
  isPrimary?: boolean;
}

interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  address?: string;
}

interface DashboardHeaderProps {
  dashboardName: string;
  badges: Badge[];
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dashboardName,
  badges,
  user,
  onLogout,
  onUserUpdate,
}) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  // Apply consistent button styles
  const buttonStyle = "h-9 border border-primary bg-background text-text-color hover:bg-primary hover:text-white transition-colors";
  
  // Common wrapper style for all header elements
  const wrapperStyle = "flex items-center h-9"; 

  return (
    <header className="bg-surface-color/90 backdrop-blur-md border-b border-border-color px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-text-color">
            <span className="text-primary">Larn</span>
            <span className="text-text-color">2Pay</span> | {dashboardName} Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`${
                  badge.isPrimary
                    ? "bg-primary text-white"
                    : "bg-card-bg text-text-secondary"
                } px-3 py-1 rounded text-sm`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={wrapperStyle}>
            <Button
              onClick={handleHomeClick}
              variant="outline"
              size="sm"
              className={`flex items-center px-3 space-x-2 ${buttonStyle}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
          </div>
           
          <div className={`theme-toggle-wrapper ${wrapperStyle}`}>
            <ThemeToggle />
          </div>
           
          <div className={`notification-wrapper ${wrapperStyle}`}>
            <NotificationCenter />
          </div>
           
          <div className={`user-profile-wrapper ${wrapperStyle}`}>
            <UserProfile user={user} onUpdate={onUserUpdate} />
          </div>
           
          <div className={wrapperStyle}>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className={`flex items-center px-3 space-x-2 ${buttonStyle}`}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
