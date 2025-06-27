import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Target, Calendar } from "lucide-react";

const MyTargets = () => {
  const [currentDate] = useState(new Date());
  const targetDuration = "Current Month";
  const assignedTarget = 10; // Onboardings
  const onboardedCount = 6; // Done
  const remaining = assignedTarget - onboardedCount;
  const daysLeft = 7; // Deadline reminder
  const progressPercent = Math.round((onboardedCount / assignedTarget) * 100);
  const status = progressPercent >= 60 ? "On Track" : progressPercent >= 30 ? "Watch" : "Behind";
  const statusColor = progressPercent >= 60 ? "bg-green-900/60 text-green-300" : progressPercent >= 30 ? "bg-yellow-900/60 text-yellow-300" : "bg-red-900/60 text-red-300";

  return (
    <div className="min-h-screen bg-[#101624] p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Target Overview Card */}
        <Card className="bg-[#181f32] border border-[#232b45]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-white text-lg">🎯 Target Overview</CardTitle>
            <Target className="h-5 w-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Duration: {targetDuration}</p>
              <p className="text-sm text-gray-300">Assigned: {assignedTarget} onboardings</p>
              <p className="text-sm text-gray-300">Onboarded: {onboardedCount} done</p>
              <p className="text-sm text-gray-300">Remaining: {remaining} left</p>
              <p className="text-sm text-gray-300">Deadline: ⏰ {daysLeft} days left</p>
              <div className="w-full bg-[#232b45] rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className="text-sm font-medium text-orange-400">{progressPercent}%</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                {status}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-[#181f32] border border-[#232b45]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-white text-lg">📅 Next Steps</CardTitle>
            <Calendar className="h-5 w-5 text-orange-400" />
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