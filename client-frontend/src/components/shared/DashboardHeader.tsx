import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import UserProfile from "@/components/shared/UserProfile";
import NotificationCenter from "@/components/shared/NotificationCenter";

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
    <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-white">
            <span className="text-orange-500">LEARN</span>
            <span className="text-white">2PAY</span> | {dashboardName} Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`${
                  badge.isPrimary
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-300"
                } px-3 py-1 rounded text-sm`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <NotificationCenter />
          <UserProfile user={user} onUpdate={onUserUpdate} />
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 text-orange-500 border-orange-500 hover:bg-orange-500/10"
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
