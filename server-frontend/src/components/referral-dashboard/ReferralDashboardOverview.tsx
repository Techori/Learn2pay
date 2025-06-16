import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import {
  DollarSign,
  Users,
  TrendingUp,
  UserPlus,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

const ReferralDashboardOverview = () => {
  const monthlyStats = [
    {
      label: "Active Referrals",
      value: "45",
      icon: Users,
      color: "bg-blue-500/20 text-blue-400",
      change: "+12%",
    },
    {
      label: "Commission Earned",
      value: "₹2,45,000",
      icon: DollarSign,
      color: "bg-green-500/20 text-green-400",
      change: "+23%",
    },
    {
      label: "Conversion Rate",
      value: "68%",
      icon: TrendingUp,
      color: "bg-purple-500/20 text-purple-400",
      change: "+5%",
    },
    {
      label: "New Leads",
      value: "23",
      icon: UserPlus,
      color: "bg-orange-500/20 text-orange-400",
      change: "+8%",
    },
  ];

  const recentActivity = [
    {
      action: "New referral signed up",
      institute: "Modern Public School",
      time: "2 hours ago",
      status: "success",
      amount: "₹15,000",
    },
    {
      action: "Commission earned",
      institute: "Excel Coaching",
      time: "1 day ago",
      status: "success",
      amount: "₹8,500",
    },
    {
      action: "Referral converted",
      institute: "Sunrise College",
      time: "2 days ago",
      status: "success",
      amount: "₹12,000",
    },
    {
      action: "Follow-up scheduled",
      institute: "Tech Academy",
      time: "3 days ago",
      status: "pending",
      amount: "-",
    },
  ];

  const topPerformers = [
    {
      name: "Modern Public School",
      revenue: "₹45,000",
      students: 450,
      growth: "+15%",
    },
    {
      name: "Excel Coaching Center",
      revenue: "₹32,000",
      students: 320,
      growth: "+23%",
    },
    {
      name: "Sunrise College",
      revenue: "₹28,000",
      students: 280,
      growth: "+8%",
    },
    { name: "Tech Academy", revenue: "₹22,000", students: 220, growth: "+12%" },
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {monthlyStats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700 shadow-md hover:shadow-lg hover:border-gray-600 transition-all duration-300"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
                    <span className="text-xs text-green-400">
                      {stat.change}
                    </span>
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
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg text-white">
                Monthly Revenue Target
              </CardTitle>
              <CardDescription className="text-gray-400">
                Track your progress towards monthly goals
              </CardDescription>
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              82% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-300">
              <span>
                Current:{" "}
                <span className="font-medium text-white">₹4,12,000</span>
              </span>
              <span>
                Target:{" "}
                <span className="font-medium text-white">₹5,00,000</span>
              </span>
            </div>
            <Progress
              value={82}
              className="h-3 bg-gray-700 [&>div]:bg-orange-500"
            />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">₹88,000</div>
                <div className="text-sm text-gray-400">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">18</div>
                <div className="text-sm text-gray-400">Days Left</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">₹4,889</div>
                <div className="text-sm text-gray-400">Daily Required</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest referral activities and transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-200"
                >
                  <div>
                    <div className="font-medium text-white text-sm">
                      {activity.action}
                    </div>
                    <div className="text-sm text-gray-300">
                      {activity.institute}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm text-white">
                      {activity.amount}
                    </div>
                    <Badge
                      className={`mt-1 ${
                        activity.status === "success"
                          ? "bg-green-500/20 text-green-400"
                          : activity.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Top Performing Referrals
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your highest revenue generating institutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-900/50 transition-colors duration-200"
                >
                  <div>
                    <div className="font-medium text-white">
                      {performer.name}
                    </div>
                    <div className="text-sm text-gray-300 mt-1">
                      {performer.students} students
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-white">
                      {performer.revenue}
                    </div>
                    <div className="text-xs text-green-400 mt-1">
                      {performer.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4 text-white border-gray-600 hover:bg-gray-700"
              variant="outline"
            >
              View All Referrals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-400">
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center bg-orange-500 hover:bg-orange-600 text-white">
              <UserPlus className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Add Referral</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center text-gray-200 hover:bg-gray-700 border-gray-600"
            >
              <DollarSign className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Track Payment</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center text-gray-200 hover:bg-gray-700 border-gray-600"
            >
              <TrendingUp className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">View Reports</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center text-gray-200 hover:bg-gray-700 border-gray-600"
            >
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
