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

// Define the referral button styling as a constant to reuse
const referralButtonStyle = "border-orange-500 bg-white text-orange-500 hover:bg-orange-500 hover:text-white transition-colors";

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
            className="bg-card-bg border-border-color shadow-md transition-all duration-300"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                  <p className="text-2xl font-bold text-text-color">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                    <span className="text-xs text-success">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-surface-color">
                  <stat.icon className="h-6 w-6 text-text-color" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Progress */}
      <Card className="bg-card-bg border-border-color shadow-md">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg text-text-color">
                Monthly Revenue Target
              </CardTitle>
              <CardDescription className="text-text-secondary">
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
            <div className="flex justify-between text-sm text-text-secondary">
              <span>
                Current:{" "}
                <span className="font-medium text-text-color">₹4,12,000</span>
              </span>
              <span>
                Target:{" "}
                <span className="font-medium text-text-color">₹5,00,000</span>
              </span>
            </div>
            <Progress
              value={82}
              className="h-3 bg-background-color [&>div]:bg-orange-500"
            />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">₹88,000</div>
                <div className="text-sm text-text-secondary">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">18</div>
                <div className="text-sm text-text-secondary">Days Left</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">₹4,889</div>
                <div className="text-sm text-text-secondary">Daily Required</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card-bg border-border-color shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-text-color">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Latest referral activities and transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-background-color rounded-lg hover:bg-background-color/80 transition-colors duration-200"
                >
                  <div>
                    <div className="font-medium text-text-color text-sm">
                      {activity.action}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {activity.institute}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      {activity.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm text-text-color">
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

        <Card className="bg-card-bg border-border-color shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-text-color">
              Top Performing Referrals
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Your highest revenue generating institutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border-color rounded-lg hover:bg-background-color/50 transition-colors duration-200"
                >
                  <div>
                    <div className="font-medium text-text-color">
                      {performer.name}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      {performer.students} students
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-text-color">
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
              className="w-full mt-4 text-text-color border-border-color hover:bg-background-color"
              variant="outline"
            >
              View All Referrals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card-bg border-border-color shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-text-color">Quick Actions</CardTitle>
          <CardDescription className="text-text-secondary">
            Common tasks for referral partners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              onClick={() => window.location.href = "/referral-dashboard/add-referrals"}
              variant="outline"
              className={`${referralButtonStyle} h-20 flex flex-col items-center justify-center`}
            >
              <UserPlus className="h-5 w-5 mb-1" />
              <span className="text-xs">Add New Referral</span>
            </Button>
            <Button 
              variant="outline" 
              className={`${referralButtonStyle} h-20 flex flex-col items-center justify-center`}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Schedule Follow-up</span>
            </Button>
            <Button 
              variant="outline" 
              className={`${referralButtonStyle} h-20 flex flex-col items-center justify-center`}
            >
              <DollarSign className="h-5 w-5 mb-1" />
              <span className="text-xs">Request Payout</span>
            </Button>
            <Button 
              variant="outline" 
              className={`${referralButtonStyle} h-20 flex flex-col items-center justify-center`}
            >
              <Users className="h-5 w-5 mb-1" />
              <span className="text-xs">View My Referrals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralDashboardOverview;
