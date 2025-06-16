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

const TargetsGoals = () => {
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
    if (percentage >= 90) return "text-green-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-900/60 text-green-300";
      case "Needs Push":
        return "bg-yellow-900/60 text-yellow-300";
      case "Behind":
        return "bg-red-900/60 text-red-300";
      default:
        return "bg-gray-800 text-gray-300";
    }
  };

  const periodLabelMap = {
    monthly: "Monthly Goals Progress",
    quarterly: "Quarterly Goals Progress",
    yearly: "Yearly Goals Progress",
  };

  return (
    <div className="space-y-6 bg-[#101624] min-h-screen p-4 rounded-xl text-white">
      {/* Period Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Targets & Goals</h2>
        <div className="flex gap-2">
          <Button
            variant={period === "monthly" ? "default" : "outline"}
            className={period === "monthly" ? "bg-orange-500 text-white" : ""}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={period === "quarterly" ? "default" : "outline"}
            className={period === "quarterly" ? "bg-orange-500 text-white" : ""}
            onClick={() => setPeriod("quarterly")}
          >
            Quarterly
          </Button>
          <Button
            variant={period === "yearly" ? "default" : "outline"}
            className={period === "yearly" ? "bg-orange-500 text-white" : ""}
            onClick={() => setPeriod("yearly")}
          >
            Yearly
          </Button>
        </div>
      </div>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4 flex items-center">
            <Target className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {periodData[period].overallTarget}%
              </div>
              <div className="text-sm text-gray-400">Overall Target</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4 flex items-center">
            <DollarSign className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <div className="text-2xl font-bold text-green-400">
                {periodData[period].revenue}
              </div>
              <div className="text-sm text-gray-400">Revenue Achieved</div>
              <div className="text-xs text-green-400">
                {periodData[period].revenuePercent}% of target
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4 flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">
                {periodData[period].institutes}
              </p>
              <p className="text-sm text-gray-300">Institutes Onboarded</p>
              <p className="text-xs text-purple-400">
                {periodData[period].institutesPercent}% of target
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4 flex items-center">
            <Award className="h-8 w-8 text-orange-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">
                {periodData[period].avgConversion}%
              </p>
              <p className="text-sm text-gray-300">Avg Conversion</p>
              <p className="text-xs text-orange-400">Above benchmark</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Goals */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <BarChart3 className="h-5 w-5 mr-2 text-orange-400" />
            {periodLabelMap[period]}
          </CardTitle>
          <CardDescription className="text-gray-400">
            Track progress against {period} objectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {periodData[period].goals.map((goal, idx) => (
              <div
                key={idx}
                className="p-4 border border-[#232b45] rounded-lg bg-[#232b45] mb-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white">{goal.key}</h3>
                  <Badge className="font-semibold">{goal.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Target:</span>
                    <span className="font-medium text-white">
                      {goal.target}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Achieved:</span>
                    <span className="font-medium text-white">
                      {goal.achieved}
                    </span>
                  </div>
                  <div className="w-full bg-[#181f32] rounded-full h-3">
                    <div
                      className="bg-orange-500 h-3 rounded-full"
                      style={{ width: `${goal.percent}%` }}
                    ></div>
                  </div>
                  <div className="text-center font-bold text-orange-400">
                    {goal.percent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Users className="h-5 w-5 mr-2 text-orange-400" />
            Team Performance Leaderboard
          </CardTitle>
          <CardDescription className="text-gray-400">
            Individual target achievement and rankings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {periodData[period].leaderboard.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#232b45] rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full font-bold">
                    {member.ranking}
                  </div>
                  <div>
                    <div className="font-medium text-white">{member.name}</div>
                    <div className="text-sm text-gray-400">{member.role}</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-8 flex-1 max-w-2xl">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Institutes</div>
                    <div className="font-bold text-white">
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
                    <div className="text-sm text-gray-400">Revenue</div>
                    <div className="font-bold text-white">
                      {member.revenueAchieved}
                    </div>
                    <div className="text-xs text-gray-400">
                      of {member.revenueTarget}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-400">Conversion</div>
                    <div className="font-bold text-white">
                      {member.conversionRate}
                    </div>
                    <div className="text-xs text-gray-400">Rate</div>
                  </div>

                  <div className="text-center">
                    <div className="w-full bg-[#181f32] rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
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
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Calendar className="h-5 w-5 mr-2 text-orange-400" />
            Action Items & Improvements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-900/40 rounded border-l-4 border-red-500">
              <div>
                <div className="font-medium text-white">
                  Vikram needs support in Q1
                </div>
                <div className="text-sm text-gray-300">
                  60% target achievement - requires coaching
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#232b45] text-gray-300 hover:bg-orange-500/10"
              >
                Assign Mentor
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-900/40 rounded border-l-4 border-yellow-500">
              <div>
                <div className="font-medium text-white">
                  Revenue target behind by 19%
                </div>
                <div className="text-sm text-gray-300">
                  Focus on higher value clients this month
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#232b45] text-gray-300 hover:bg-orange-500/10"
              >
                Create Strategy
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-900/40 rounded border-l-4 border-green-500">
              <div>
                <div className="font-medium text-white">
                  Ravi exceeding targets consistently
                </div>
                <div className="text-sm text-gray-300">
                  Consider for team lead promotion
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#232b45] text-gray-300 hover:bg-orange-500/10"
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
