import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Target,
  TrendingUp,
  Calendar,
  Award,
  Users,
  DollarSign,
  BarChart3,
  BarChart2,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const TargetsGoals = () => {
  const { theme } = useTheme();
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">(
    "monthly"
  );

  const periodData = {
    monthly: {
      label: "Monthly Goals Progress",
      subLabel: "Track progress against monthly objectives",
      overallTarget: 85,
      revenue: "₹32.5L",
      revenuePercent: 81,
      institutes: 128,
      institutesPercent: 85,
      avgConversion: 24,
      goals: [
        {
          key: "January 2024 Targets",
          target: 50,
          achieved: 42,
          percent: 84,
          status: "On Track",
        },
        {
          key: "Revenue Goal",
          target: "₹10,00,000",
          achieved: "₹8,40,000",
          percent: 84,
          status: "On Track",
        },
        {
          key: "New Markets",
          target: 2,
          achieved: 1,
          percent: 50,
          status: "Needs Push",
        },
      ],
      leaderboard: [
        {
          name: "Ravi Kumar",
          role: "Senior Sales Executive",
          monthlyTarget: 20,
          achieved: 17,
          revenueTarget: "₹5,00,000",
          revenueAchieved: "₹4,25,000",
          conversionRate: "28%",
          ranking: 1,
        },
        {
          name: "Priya Patel",
          role: "Sales Executive",
          monthlyTarget: 15,
          achieved: 12,
          revenueTarget: "₹3,75,000",
          revenueAchieved: "₹3,00,000",
          conversionRate: "24%",
          ranking: 2,
        },
        {
          name: "Vikram Singh",
          role: "Sales Executive",
          monthlyTarget: 15,
          achieved: 9,
          revenueTarget: "₹3,75,000",
          revenueAchieved: "₹2,25,000",
          conversionRate: "18%",
          ranking: 3,
        },
        {
          name: "Anita Sharma",
          role: "Junior Sales Executive",
          monthlyTarget: 12,
          achieved: 8,
          revenueTarget: "₹3,00,000",
          revenueAchieved: "₹2,00,000",
          conversionRate: "22%",
          ranking: 4,
        },
      ],
    },
    quarterly: {
      label: "Quarterly Goals Progress",
      subLabel: "Track progress against quarterly objectives",
      overallTarget: 70,
      revenue: "₹90L",
      revenuePercent: 75,
      institutes: 350,
      institutesPercent: 70,
      avgConversion: 20,
      goals: [
        {
          key: "Q1 2024 Targets",
          target: 150,
          achieved: 128,
          percent: 85,
          status: "On Track",
        },
        {
          key: "Revenue Goal",
          target: "₹40,00,000",
          achieved: "₹32,50,000",
          percent: 81,
          status: "Needs Push",
        },
        {
          key: "New Markets",
          target: 5,
          achieved: 3,
          percent: 60,
          status: "Behind",
        },
      ],
      leaderboard: [
        {
          name: "Ravi Kumar",
          role: "Senior Sales Executive",
          monthlyTarget: 60,
          achieved: 51,
          revenueTarget: "₹15,00,000",
          revenueAchieved: "₹12,75,000",
          conversionRate: "30%",
          ranking: 1,
        },
        {
          name: "Priya Patel",
          role: "Sales Executive",
          monthlyTarget: 45,
          achieved: 36,
          revenueTarget: "₹11,25,000",
          revenueAchieved: "₹9,00,000",
          conversionRate: "25%",
          ranking: 2,
        },
        {
          name: "Vikram Singh",
          role: "Sales Executive",
          monthlyTarget: 45,
          achieved: 27,
          revenueTarget: "₹11,25,000",
          revenueAchieved: "₹6,75,000",
          conversionRate: "20%",
          ranking: 3,
        },
        {
          name: "Anita Sharma",
          role: "Junior Sales Executive",
          monthlyTarget: 36,
          achieved: 24,
          revenueTarget: "₹9,00,000",
          revenueAchieved: "₹6,00,000",
          conversionRate: "22%",
          ranking: 4,
        },
      ],
    },
    yearly: {
      label: "Yearly Goals Progress",
      subLabel: "Track progress against yearly objectives",
      overallTarget: 92,
      revenue: "₹3.8Cr",
      revenuePercent: 92,
      institutes: 1500,
      institutesPercent: 92,
      avgConversion: 26,
      goals: [
        {
          key: "2024 Targets",
          target: 600,
          achieved: 550,
          percent: 92,
          status: "On Track",
        },
        {
          key: "Revenue Goal",
          target: "₹1,60,00,000",
          achieved: "₹1,47,20,000",
          percent: 92,
          status: "On Track",
        },
        {
          key: "New Markets",
          target: 20,
          achieved: 18,
          percent: 90,
          status: "On Track",
        },
      ],
      leaderboard: [
        {
          name: "Ravi Kumar",
          role: "Senior Sales Executive",
          monthlyTarget: 240,
          achieved: 221,
          revenueTarget: "₹60,00,000",
          revenueAchieved: "₹55,00,000",
          conversionRate: "32%",
          ranking: 1,
        },
        {
          name: "Priya Patel",
          role: "Sales Executive",
          monthlyTarget: 180,
          achieved: 150,
          revenueTarget: "₹45,00,000",
          revenueAchieved: "₹37,50,000",
          conversionRate: "25%",
          ranking: 2,
        },
        {
          name: "Vikram Singh",
          role: "Sales Executive",
          monthlyTarget: 180,
          achieved: 108,
          revenueTarget: "₹45,00,000",
          revenueAchieved: "₹27,00,000",
          conversionRate: "20%",
          ranking: 3,
        },
        {
          name: "Anita Sharma",
          role: "Junior Sales Executive",
          monthlyTarget: 144,
          achieved: 96,
          revenueTarget: "₹36,00,000",
          revenueAchieved: "₹24,00,000",
          conversionRate: "22%",
          ranking: 4,
        },
      ],
    },
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return theme === "dark" ? "text-green-400" : "text-green-600";
    if (percentage >= 70) return theme === "dark" ? "text-yellow-400" : "text-yellow-600";
    return theme === "dark" ? "text-red-400" : "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return theme === "dark" ? "bg-green-900/60 text-green-300" : "bg-green-200 text-green-800";
      case "Needs Push":
        return theme === "dark" ? "bg-yellow-900/60 text-yellow-300" : "bg-yellow-200 text-yellow-800";
      case "Behind":
        return theme === "dark" ? "bg-red-900/60 text-red-300" : "bg-red-200 text-red-800";
      default:
        return theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-800";
    }
  };

  const periodLabelMap = {
    monthly: "Monthly Goals Progress",
    quarterly: "Quarterly Goals Progress",
    yearly: "Yearly Goals Progress",
  };

  // Theme variables
  const bgColor = theme === "dark" ? "bg-[#101624]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const cardBorder = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const inputBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const buttonDefault = theme === "dark" ? "bg-orange-500 text-white" : "bg-orange-500 text-white";
  const buttonOutline = theme === "dark" ? "border-[#232b45] text-gray-300 hover:bg-orange-500/10" : "border-gray-300 text-gray-700 hover:bg-orange-100";
  const progressBg = theme === "dark" ? "bg-[#181f32]" : "bg-gray-200";
  const progressFill = "bg-orange-500";
  const iconBlue = theme === "dark" ? "text-blue-400" : "text-blue-500";
  const iconGreen = theme === "dark" ? "text-green-400" : "text-green-500";
  const iconPurple = theme === "dark" ? "text-purple-400" : "text-purple-500";
  const iconOrange = theme === "dark" ? "text-orange-400" : "text-orange-500";
  const warningBorder = theme === "dark" ? "border-yellow-500" : "border-yellow-500";
  const errorBorder = theme === "dark" ? "border-red-500" : "border-red-500";
  const successBorder = theme === "dark" ? "border-green-500" : "border-green-500";
  const alertBgWarning = theme === "dark" ? "bg-yellow-900/40" : "bg-yellow-100";
  const alertBgError = theme === "dark" ? "bg-red-900/40" : "bg-red-100";
  const alertBgSuccess = theme === "dark" ? "bg-green-900/40" : "bg-green-100";

  return (
    <div className={`space-y-6 ${bgColor} min-h-screen p-4 rounded-xl ${textColor}`}>
      {/* Period Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Targets & Goals</h2>
        <div className="flex gap-2">
          <Button
            variant={period === "monthly" ? "default" : "outline"}
            className={period === "monthly" ? buttonDefault : buttonOutline}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={period === "quarterly" ? "default" : "outline"}
            className={period === "quarterly" ? buttonDefault : buttonOutline}
            onClick={() => setPeriod("quarterly")}
          >
            Quarterly
          </Button>
          <Button
            variant={period === "yearly" ? "default" : "outline"}
            className={period === "yearly" ? buttonDefault : buttonOutline}
            onClick={() => setPeriod("yearly")}
          >
            Yearly
          </Button>
        </div>
      </div>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${cardBg} border ${cardBorder} shadow-none`}>
          <CardContent className="p-4 flex items-center">
            <Target className={`h-8 w-8 ${iconBlue} mr-3`} />
            <div>
              <div className={`text-2xl font-bold ${iconBlue}`}>
                {periodData[period].overallTarget}%
              </div>
              <div className={`text-sm ${textSecondary}`}>Overall Target</div>
            </div>
          </CardContent>
        </Card>
        <Card className={`${cardBg} border ${cardBorder} shadow-none`}>
          <CardContent className="p-4 flex items-center">
            <DollarSign className={`h-8 w-8 ${iconGreen} mr-3`} />
            <div>
              <div className={`text-2xl font-bold ${iconGreen}`}>
                {periodData[period].revenue}
              </div>
              <div className={`text-sm ${textSecondary}`}>Revenue Achieved</div>
              <div className={`text-xs ${iconGreen}`}>
                {periodData[period].revenuePercent}% of target
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={`${cardBg} border ${cardBorder} shadow-none`}>
          <CardContent className="p-4 flex items-center">
            <TrendingUp className={`h-8 w-8 ${iconPurple} mr-3`} />
            <div>
              <p className={`text-2xl font-bold ${textColor}`}>
                {periodData[period].institutes}
              </p>
              <p className={`text-sm ${textSecondary}`}>Institutes Onboarded</p>
              <p className={`text-xs ${iconPurple}`}>
                {periodData[period].institutesPercent}% of target
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className={`${cardBg} border ${cardBorder} shadow-none`}>
          <CardContent className="p-4 flex items-center">
            <Award className={`h-8 w-8 ${iconOrange} mr-3`} />
            <div>
              <p className={`text-2xl font-bold ${textColor}`}>
                {periodData[period].avgConversion}%
              </p>
              <p className={`text-sm ${textSecondary}`}>Avg Conversion</p>
              <p className={`text-xs ${iconOrange}`}>Above benchmark</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Goals */}
      <Card className={`${cardBg} border ${cardBorder} shadow-none`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className={`h-5 w-5 mr-2 ${iconOrange}`} />
            {periodLabelMap[period]}
          </CardTitle>
          <CardDescription className={textSecondary}>
            Track progress against {period} objectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {periodData[period].goals.map((goal, idx) => (
              <div
                key={idx}
                className={`p-4 border ${borderColor} rounded-lg ${inputBg} mb-4`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold">{goal.key}</h3>
                  <Badge className={getStatusColor(goal.status) + " font-semibold"}>{goal.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={textSecondary}>Target:</span>
                    <span className="font-medium">
                      {goal.target}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={textSecondary}>Achieved:</span>
                    <span className="font-medium">
                      {goal.achieved}
                    </span>
                  </div>
                  <div className={`w-full ${progressBg} rounded-full h-3`}>
                    <div
                      className={`${progressFill} h-3 rounded-full`}
                      style={{ width: `${goal.percent}%` }}
                    ></div>
                  </div>
                  <div className={`text-center font-bold ${iconOrange}`}>
                    {goal.percent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card className={`${cardBg} border ${cardBorder} shadow-none`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className={`h-5 w-5 mr-2 ${iconOrange}`} />
            Team Performance Leaderboard
          </CardTitle>
          <CardDescription className={textSecondary}>
            Individual target achievement and rankings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {periodData[period].leaderboard.map((member, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 ${inputBg} rounded-lg`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full font-bold">
                    {member.ranking}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className={`text-sm ${textSecondary}`}>{member.role}</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-8 flex-1 max-w-2xl">
                  <div className="text-center">
                    <div className={`text-sm ${textSecondary}`}>Institutes</div>
                    <div className="font-bold">
                      {member.achieved}/{member.monthlyTarget}
                    </div>
                    <div
                      className={`text-xs ${getPerformanceColor(
                        (member.achieved / member.monthlyTarget) * 100
                      )}`}
                    >
                      {Math.round(
                        (member.achieved / member.monthlyTarget) * 100
                      )}
                      %
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`text-sm ${textSecondary}`}>Revenue</div>
                    <div className="font-bold">
                      {member.revenueAchieved}
                    </div>
                    <div className={`text-xs ${textSecondary}`}>
                      of {member.revenueTarget}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`text-sm ${textSecondary}`}>Conversion</div>
                    <div className="font-bold">
                      {member.conversionRate}
                    </div>
                    <div className={`text-xs ${textSecondary}`}>Rate</div>
                  </div>

                  <div className="text-center">
                    <div className={`w-full ${progressBg} rounded-full h-2`}>
                      <div
                        className={`${progressFill} h-2 rounded-full`}
                        style={{
                          width: `${
                            (member.achieved / member.monthlyTarget) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className={`${cardBg} border ${cardBorder} shadow-none`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className={`h-5 w-5 mr-2 ${iconOrange}`} />
            Action Items & Improvements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 ${alertBgError} rounded border-l-4 ${errorBorder}`}>
              <div>
                <div className="font-medium">
                  Vikram needs support in Q1
                </div>
                <div className={`text-sm ${textSecondary}`}>
                  60% target achievement - requires coaching
                </div>
              </div>
              <Button
                variant="outline"
                className={buttonOutline}
              >
                Assign Mentor
              </Button>
            </div>

            <div className={`flex items-center justify-between p-3 ${alertBgWarning} rounded border-l-4 ${warningBorder}`}>
              <div>
                <div className="font-medium">
                  Revenue target behind by 19%
                </div>
                <div className={`text-sm ${textSecondary}`}>
                  Focus on higher value clients this month
                </div>
              </div>
              <Button
                variant="outline"
                className={buttonOutline}
              >
                Create Strategy
              </Button>
            </div>

            <div className={`flex items-center justify-between p-3 ${alertBgSuccess} rounded border-l-4 ${successBorder}`}>
              <div>
                <div className="font-medium">
                  Ravi exceeding targets consistently
                </div>
                <div className={`text-sm ${textSecondary}`}>
                  Consider for team lead promotion
                </div>
              </div>
              <Button
                variant="outline"
                className={buttonOutline}
              >
                Review Performance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetsGoals;
