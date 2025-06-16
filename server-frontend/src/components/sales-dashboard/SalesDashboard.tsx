import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  CalendarDays,
  ChevronRight,
  Phone,
  Mail,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SalesDashboard = () => {
  // Mock data for dashboard
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (in lakhs ₹)",
        data: [12, 15, 18, 14, 21, 24],
        backgroundColor: "#f97316",
        borderRadius: 6,
      },
    ],
  };

  const targetData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Target",
        data: [15, 15, 15, 20, 20, 20],
        borderColor: "#fff",
        borderDash: [5, 5],
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
        backgroundColor: "transparent",
      },
    ],
  };

  const conversionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: [22, 24, 25, 24, 26, 28],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const stageDistributionData = {
    labels: [
      "Initial Contact",
      "Needs Assessment",
      "Proposal",
      "Negotiation",
      "Closed",
    ],
    datasets: [
      {
        data: [32, 25, 18, 15, 10],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
          "#f43f5e",
        ],
        borderWidth: 0,
      },
    ],
  };

  const recentLeads = [
    {
      name: "Sunrise Public School",
      contact: "Dr. Priya Sharma",
      status: "Hot",
      date: "Today",
      value: "₹25,000",
    },
    {
      name: "Excel Coaching Center",
      contact: "Mr. Rajesh Kumar",
      status: "Warm",
      date: "Yesterday",
      value: "₹15,000",
    },
    {
      name: "Modern Academy",
      contact: "Ms. Anita Patel",
      status: "Cold",
      date: "2 days ago",
      value: "₹12,000",
    },
  ];

  const upcomingTasks = [
    {
      task: "Follow up with Sunrise Public School",
      deadline: "Today, 2:30 PM",
      priority: "High",
    },
    {
      task: "Send proposal to Excel Coaching",
      deadline: "Tomorrow, 10:00 AM",
      priority: "Medium",
    },
    {
      task: "Onboarding call with Modern Academy",
      deadline: "July 15, 11:00 AM",
      priority: "Medium",
    },
    {
      task: "Monthly sales report submission",
      deadline: "July 16, EOD",
      priority: "High",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return "bg-red-600 text-white";
      case "Warm":
        return "bg-yellow-400 text-black";
      case "Cold":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-900/60 text-red-300";
      case "Medium":
        return "bg-yellow-900/60 text-yellow-300";
      case "Low":
        return "bg-blue-900/60 text-blue-300";
      default:
        return "bg-gray-800 text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Monthly Revenue</p>
                <h3 className="text-2xl font-bold text-white mt-1">₹24.5L</h3>
                <p className="text-sm mt-1 text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 15% vs last month
                </p>
              </div>
              <div className="bg-orange-500/20 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">New Leads</p>
                <h3 className="text-2xl font-bold text-white mt-1">156</h3>
                <p className="text-sm mt-1 text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 8% vs last month
                </p>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-full">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Institutes Onboarded</p>
                <h3 className="text-2xl font-bold text-white mt-1">42</h3>
                <p className="text-sm mt-1 text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 12% vs last month
                </p>
              </div>
              <div className="bg-green-500/20 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-white mt-1">26.8%</h3>
                <p className="text-sm mt-1 text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 2.4% vs last month
                </p>
              </div>
              <div className="bg-purple-500/20 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">
                  Revenue Performance
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Monthly revenue vs targets
                </CardDescription>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                +15% YOY
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Bar
                  key="revenue-bar-chart"
                  data={revenueData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { labels: { color: "#fff" } },
                    },
                    scales: {
                      x: {
                        ticks: { color: "#fff" },
                        grid: { color: "#232b45" },
                      },
                      y: {
                        ticks: { color: "#fff" },
                        grid: { color: "#232b45" },
                      },
                    },
                  }}
                />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <Line
                    key="revenue-target-line"
                    data={targetData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                      },
                      scales: {
                        x: { display: false },
                        y: { display: false },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
            <CardHeader>
              <CardTitle className="text-white">
                Conversion Rate Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-36 flex items-center justify-center">
                <Line
                  key="conversion-line-chart"
                  data={conversionData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        ticks: { color: "#fff" },
                        grid: { color: "#232b45" },
                      },
                      y: {
                        ticks: { color: "#fff" },
                        grid: { color: "#232b45" },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
            <CardHeader>
              <CardTitle className="text-white">Leads by Stage</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div style={{ width: "200px", height: "140px" }}>
                <Doughnut
                  key="leads-doughnut-chart"
                  data={stageDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: { color: "#fff", padding: 10 },
                      },
                    },
                    cutout: "65%",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Leads and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardHeader>
            <CardTitle className="text-white">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLeads.map((lead, index) => (
                <div
                  key={index}
                  className="p-3 border border-[#232b45] rounded-lg bg-[#232b45] flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-gray-400">
                      {lead.contact} • {lead.date}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                    <div className="text-sm text-gray-300">{lead.value}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-0 hover:bg-transparent hover:text-orange-400"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <Button variant="link" className="text-orange-400">
                  View All Leads
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="p-3 border border-[#232b45] rounded-lg bg-[#232b45]"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <AlertCircle className="h-4 w-4 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-medium">{task.task}</div>
                        <div className="text-sm text-gray-400 flex items-center mt-1">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {task.deadline}
                        </div>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <Button variant="link" className="text-orange-400">
                  View All Tasks
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesDashboard;
