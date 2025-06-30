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
        backgroundColor: "var(--primary)",
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
        borderColor: "var(--text-color)",
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
        borderColor: "var(--success)",
        backgroundColor: "rgba(var(--success-rgb), 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "var(--success)",
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
          "var(--secondary)",
          "var(--success)",
          "var(--warning)",
          "var(--primary)",
          "var(--danger)",
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
        return "bg-danger text-white";
      case "Warm":
        return "bg-warning text-text";
      case "Cold":
        return "bg-secondary text-white";
      default:
        return "bg-text-secondary text-text";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-danger/20 text-danger";
      case "Medium":
        return "bg-warning/20 text-warning";
      case "Low":
        return "bg-secondary/20 text-secondary";
      default:
        return "bg-text-secondary/20 text-text-secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-text-secondary">Monthly Revenue</p>
                <h3 className="text-2xl font-bold mt-1">₹24.5L</h3>
                <div className="flex items-center mt-2 text-success text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12% vs last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-text-secondary">New Leads</p>
                <h3 className="text-2xl font-bold mt-1">48</h3>
                <div className="flex items-center mt-2 text-success text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8% vs last month</span>
                </div>
              </div>
              <div className="bg-secondary/10 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-text-secondary">Conversion Rate</p>
                <h3 className="text-2xl font-bold mt-1">28%</h3>
                <div className="flex items-center mt-2 text-success text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>3% vs last month</span>
                </div>
              </div>
              <div className="bg-success/10 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-text-secondary">Tasks Completed</p>
                <h3 className="text-2xl font-bold mt-1">86%</h3>
                <div className="flex items-center mt-2 text-success text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>5% vs last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar
                data={revenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        color: "rgba(var(--border-color-rgb), 0.1)",
                      },
                    },
                    y: {
                      grid: {
                        color: "rgba(var(--border-color-rgb), 0.1)",
                      },
                      ticks: {
                        callback: function (value) {
                          return "₹" + value + "L";
                        },
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Rate</CardTitle>
            <CardDescription>Percentage of leads converted to sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line
                data={conversionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        color: "rgba(var(--border-color-rgb), 0.1)",
                      },
                    },
                    y: {
                      grid: {
                        color: "rgba(var(--border-color-rgb), 0.1)",
                      },
                      min: 0,
                      max: 40,
                      ticks: {
                        callback: function (value) {
                          return value + "%";
                        },
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Pipeline and Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Lead distribution by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut
                data={stageDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "65%",
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        boxWidth: 12,
                        padding: 15,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Your latest prospect activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{lead.name}</h4>
                      <p className="text-sm text-text-secondary mt-0.5">{lead.contact}</p>
                      <div className="flex items-center mt-1.5 text-sm">
                        <Mail className="h-3.5 w-3.5 mr-1 text-text-secondary" />
                        <span className="text-text-secondary mr-3">Email</span>
                        <Phone className="h-3.5 w-3.5 mr-1 text-text-secondary" />
                        <span className="text-text-secondary">Call</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                      <p className="text-sm mt-1">{lead.value}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{lead.date}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full justify-between">
                View All Leads <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Schedule for the next few days</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <CalendarDays className="h-4 w-4 mr-2" /> View Calendar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-text-secondary mt-1 flex items-center">
                      <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                      {task.deadline}
                    </p>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesDashboard;
