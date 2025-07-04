import React from "react";
import { LogOut } from "lucide-react";
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
          <ThemeToggle />
          <NotificationCenter />
          <UserProfile user={user} onUpdate={onUserUpdate} />
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 text-primary border-primary hover:bg-primary/10"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
