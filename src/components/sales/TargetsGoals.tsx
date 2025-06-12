import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Target, TrendingUp, Calendar, Award, Users, DollarSign, BarChart3 } from 'lucide-react';

const TargetsGoals = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const teamTargets = [
    {
      name: "Ravi Kumar",
      role: "Senior Sales Executive",
      monthlyTarget: 20,
      achieved: 17,
      revenueTarget: "₹5,00,000",
      revenueAchieved: "₹4,25,000",
      conversionRate: "28%",
      ranking: 1
    },
    {
      name: "Priya Patel", 
      role: "Sales Executive",
      monthlyTarget: 15,
      achieved: 12,
      revenueTarget: "₹3,75,000",
      revenueAchieved: "₹3,00,000",
      conversionRate: "24%",
      ranking: 2
    },
    {
      name: "Vikram Singh",
      role: "Sales Executive", 
      monthlyTarget: 15,
      achieved: 9,
      revenueTarget: "₹3,75,000",
      revenueAchieved: "₹2,25,000",
      conversionRate: "18%",
      ranking: 3
    },
    {
      name: "Anita Sharma",
      role: "Junior Sales Executive",
      monthlyTarget: 12,
      achieved: 8,
      revenueTarget: "₹3,00,000", 
      revenueAchieved: "₹2,00,000",
      conversionRate: "22%",
      ranking: 4
    }
  ];

  const quarterlyGoals = [
    {
      title: "Q1 2024 Targets",
      totalTarget: 150,
      achieved: 128,
      percentage: 85,
      status: "On Track"
    },
    {
      title: "Revenue Goal",
      totalTarget: "₹40,00,000",
      achieved: "₹32,50,000",
      percentage: 81,
      status: "Needs Push"
    },
    {
      title: "New Markets",
      totalTarget: 5,
      achieved: 3,
      percentage: 60,
      status: "Behind"
    }
  ];

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-900/60 text-green-300';
      case 'Needs Push': return 'bg-yellow-900/60 text-yellow-300';
      case 'Behind': return 'bg-red-900/60 text-red-300';
      default: return 'bg-gray-800 text-gray-300';
    }
  };

  return (
    <div className="space-y-6 bg-[#101624] min-h-screen p-4 rounded-xl text-white">
      {/* Period Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Targets & Goals</h2>
        <div className="flex space-x-2">
          <Button 
            variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('monthly')}
            className={selectedPeriod === 'monthly' ? 'bg-orange-500 border-orange-500 text-white' : 'border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10'}
          >
            Monthly
          </Button>
          <Button 
            variant={selectedPeriod === 'quarterly' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('quarterly')}
            className={selectedPeriod === 'quarterly' ? 'bg-orange-500 border-orange-500 text-white' : 'border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10'}
          >
            Quarterly
          </Button>
          <Button 
            variant={selectedPeriod === 'yearly' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('yearly')}
            className={selectedPeriod === 'yearly' ? 'bg-orange-500 border-orange-500 text-white' : 'border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10'}
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
              <p className="text-2xl font-bold text-white">85%</p>
              <p className="text-sm text-gray-300">Overall Target</p>
              <p className="text-xs text-blue-400">Team Performance</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4 flex items-center">
            <DollarSign className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">₹32.5L</p>
              <p className="text-sm text-gray-300">Revenue Achieved</p>
              <p className="text-xs text-green-400">81% of target</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4 flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">128</p>
              <p className="text-sm text-gray-300">Institutes Onboarded</p>
              <p className="text-xs text-purple-400">85% of target</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4 flex items-center">
            <Award className="h-8 w-8 text-orange-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">24%</p>
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
            Quarterly Goals Progress
          </CardTitle>
          <CardDescription className="text-gray-400">Track progress against quarterly objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quarterlyGoals.map((goal, index) => (
              <div key={index} className="p-4 border border-[#232b45] rounded-lg bg-[#232b45]">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white">{goal.title}</h3>
                  <Badge className={getStatusColor(goal.status) + " font-semibold"}>
                    {goal.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Target:</span>
                    <span className="font-medium text-white">{goal.totalTarget}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Achieved:</span>
                    <span className="font-medium text-white">{goal.achieved}</span>
                  </div>
                  <div className="w-full bg-[#181f32] rounded-full h-3">
                    <div 
                      className="bg-orange-500 h-3 rounded-full" 
                      style={{width: `${goal.percentage}%`}}
                    ></div>
                  </div>
                  <div className={`text-center font-bold ${getPerformanceColor(goal.percentage)}`}>
                    {goal.percentage}%
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
          <CardDescription className="text-gray-400">Individual target achievement and rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamTargets.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#232b45] rounded-lg">
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
                    <div className="font-bold text-white">{member.achieved}/{member.monthlyTarget}</div>
                    <div className={`text-xs ${getPerformanceColor((member.achieved/member.monthlyTarget)*100)}`}>
                      {Math.round((member.achieved/member.monthlyTarget)*100)}%
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Revenue</div>
                    <div className="font-bold text-white">{member.revenueAchieved}</div>
                    <div className="text-xs text-gray-400">of {member.revenueTarget}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Conversion</div>
                    <div className="font-bold text-white">{member.conversionRate}</div>
                    <div className="text-xs text-gray-400">Rate</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-full bg-[#181f32] rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{width: `${(member.achieved/member.monthlyTarget)*100}%`}}
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
                <div className="font-medium text-white">Vikram needs support in Q1</div>
                <div className="text-sm text-gray-300">60% target achievement - requires coaching</div>
              </div>
              <Button variant="outline" className="border-[#232b45] text-gray-300 hover:bg-orange-500/10">Assign Mentor</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-900/40 rounded border-l-4 border-yellow-500">
              <div>
                <div className="font-medium text-white">Revenue target behind by 19%</div>
                <div className="text-sm text-gray-300">Focus on higher value clients this month</div>
              </div>
              <Button variant="outline" className="border-[#232b45] text-gray-300 hover:bg-orange-500/10">Create Strategy</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-900/40 rounded border-l-4 border-green-500">
              <div>
                <div className="font-medium text-white">Ravi exceeding targets consistently</div>
                <div className="text-sm text-gray-300">Consider for team lead promotion</div>
              </div>
              <Button variant="outline" className="border-[#232b45] text-gray-300 hover:bg-orange-500/10">Review Performance</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetsGoals;
