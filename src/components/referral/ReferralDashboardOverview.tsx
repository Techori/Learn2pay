import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, TrendingUp, Award, UserPlus, Calendar, ArrowUpRight } from 'lucide-react';

const ReferralDashboardOverview = () => {
  const monthlyStats = [
    { label: "Active Referrals", value: "45", icon: Users, color: "bg-blue-100 text-blue-800", change: "+12%" },
    { label: "Commission Earned", value: "₹2,45,000", icon: DollarSign, color: "bg-green-100 text-green-800", change: "+23%" },
    { label: "Conversion Rate", value: "68%", icon: TrendingUp, color: "bg-purple-100 text-purple-800", change: "+5%" },
    { label: "New Leads", value: "23", icon: UserPlus, color: "bg-orange-100 text-orange-800", change: "+8%" }
  ];

  const recentActivity = [
    { action: "New referral signed up", institute: "Modern Public School", time: "2 hours ago", status: "success", amount: "₹15,000" },
    { action: "Commission earned", institute: "Excel Coaching", time: "1 day ago", status: "success", amount: "₹8,500" },
    { action: "Referral converted", institute: "Sunrise College", time: "2 days ago", status: "success", amount: "₹12,000" },
    { action: "Follow-up scheduled", institute: "Tech Academy", time: "3 days ago", status: "pending", amount: "-" }
  ];

  const topPerformers = [
    { name: "Modern Public School", revenue: "₹45,000", students: 450, growth: "+15%" },
    { name: "Excel Coaching Center", revenue: "₹32,000", students: 320, growth: "+23%" },
    { name: "Sunrise College", revenue: "₹28,000", students: 280, growth: "+8%" },
    { name: "Tech Academy", revenue: "₹22,000", students: 220, growth: "+12%" }
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {monthlyStats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Progress */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Monthly Revenue Target</CardTitle>
              <CardDescription>Track your progress towards monthly goals</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">82% Complete</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Current: <span className="font-medium text-gray-900">₹4,12,000</span></span>
              <span>Target: <span className="font-medium text-gray-900">₹5,00,000</span></span>
            </div>
            <Progress value={82} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">₹88,000</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">18</div>
                <div className="text-sm text-gray-600">Days Left</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">₹4,889</div>
                <div className="text-sm text-gray-600">Daily Required</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest referral activities and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.institute}</div>
                    <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm text-gray-900">{activity.amount}</div>
                    <Badge className={`mt-1 ${
                      activity.status === 'success' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Referrals</CardTitle>
            <CardDescription>Your highest revenue generating institutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div>
                    <div className="font-medium text-gray-900">{performer.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{performer.students} students</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{performer.revenue}</div>
                    <div className="text-xs text-green-600 mt-1">{performer.growth}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Referrals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center text-blue-600 hover:bg-blue-50/50">
              <UserPlus className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Add Referral</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center text-green-600 hover:bg-green-50/50 border-gray-300">
              <DollarSign className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Track Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center text-purple-600 hover:bg-purple-50/50 border-gray-300">
              <TrendingUp className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">View Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center text-orange-600 hover:bg-orange-50/50 border-gray-300">
              <Calendar className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Schedule Follow-up</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralDashboardOverview;
