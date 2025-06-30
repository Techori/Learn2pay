import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Target, Calendar } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const MyTargets = () => {
  const { theme } = useTheme();
  const [currentDate] = useState(new Date());
  
  // Theme variables
  const bgColor = theme === "dark" ? "bg-[#101624]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const cardBorder = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const textMuted = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const progressBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-200";
  const iconColor = theme === "dark" ? "text-orange-400" : "text-orange-500";
  
  const targetDuration = "Current Month";
  const assignedTarget = 10; // Onboardings
  const onboardedCount = 6; // Done
  const remaining = assignedTarget - onboardedCount;
  const daysLeft = 7; // Deadline reminder
  const progressPercent = Math.round((onboardedCount / assignedTarget) * 100);
  const status = progressPercent >= 60 ? "On Track" : progressPercent >= 30 ? "Watch" : "Behind";
  
  // Status color based on theme and progress
  const getStatusColor = () => {
    if (progressPercent >= 60) {
      return theme === "dark" 
        ? "bg-green-900/60 text-green-300" 
        : "bg-green-100 text-green-700";
    } else if (progressPercent >= 30) {
      return theme === "dark" 
        ? "bg-yellow-900/60 text-yellow-300" 
        : "bg-yellow-100 text-yellow-700";
    } else {
      return theme === "dark" 
        ? "bg-red-900/60 text-red-300" 
        : "bg-red-100 text-red-700";
    }
  };

  const statusColor = getStatusColor();

  return (
    <div className={`min-h-screen ${bgColor} p-4`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Target Overview Card */}
        <Card className={`${cardBg} border ${cardBorder}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`${textColor} text-lg`}>🎯 Target Overview</CardTitle>
            <Target className={`h-5 w-5 ${iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className={`text-sm ${textMuted}`}>Duration: {targetDuration}</p>
              <p className={`text-sm ${textMuted}`}>Assigned: {assignedTarget} onboardings</p>
              <p className={`text-sm ${textMuted}`}>Onboarded: {onboardedCount} done</p>
              <p className={`text-sm ${textMuted}`}>Remaining: {remaining} left</p>
              <p className={`text-sm ${textMuted}`}>Deadline: ⏰ {daysLeft} days left</p>
              <div className={`w-full ${progressBg} rounded-full h-2.5`}>
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className={`text-sm font-medium ${iconColor}`}>{progressPercent}%</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                {status}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className={`${cardBg} border ${cardBorder}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`${textColor} text-lg`}>📅 Next Steps</CardTitle>
            <Calendar className={`h-5 w-5 ${iconColor}`} />
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Add Onboarding</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyTargets;