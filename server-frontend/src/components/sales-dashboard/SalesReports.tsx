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
  FileText,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesReports = () => {
  const [selectedReport, setSelectedReport] = useState("performance");
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });
  const [showCustomReportDialog, setShowCustomReportDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const { toast } = useToast();

  const reportTypes = [
    { id: "performance", name: "Performance Report", icon: TrendingUp },
    { id: "revenue", name: "Revenue Analysis", icon: DollarSign },
    { id: "conversion", name: "Conversion Funnel", icon: BarChart3 },
    { id: "team", name: "Team Analytics", icon: Users },
  ];

  const performanceMetrics = [
    {
      label: "Total Leads Generated",
      value: "1,247",
      change: "+23%",
      trend: "up",
    },
    {
      label: "Institutes Onboarded",
      value: "324",
      change: "+15%",
      trend: "up",
    },
    { label: "Conversion Rate", value: "26%", change: "+3%", trend: "up" },
    {
      label: "Average Deal Size",
      value: "₹18,500",
      change: "+8%",
      trend: "up",
    },
    {
      label: "Sales Cycle (Days)",
      value: "12.5",
      change: "-2.1",
      trend: "down",
    },
    {
      label: "Customer Satisfaction",
      value: "4.7/5",
      change: "+0.2",
      trend: "up",
    },
  ];

  const revenueBreakdown = [
    {
      source: "Direct Sales",
      amount: "₹12,50,000",
      percentage: 52,
      color: "bg-blue-500",
    },
    {
      source: "Referral Program",
      amount: "₹6,20,000",
      percentage: 26,
      color: "bg-green-500",
    },
    {
      source: "Partner Channel",
      amount: "₹3,80,000",
      percentage: 16,
      color: "bg-purple-500",
    },
    {
      source: "Digital Marketing",
      amount: "₹1,50,000",
      percentage: 6,
      color: "bg-orange-500",
    },
  ];

  const conversionFunnel = [
    { stage: "Leads Generated", count: 1247, percentage: 100 },
    { stage: "Qualified Leads", count: 899, percentage: 72 },
    { stage: "Proposals Sent", count: 562, percentage: 45 },
    { stage: "Negotiations", count: 389, percentage: 31 },
    { stage: "Closed Won", count: 324, percentage: 26 },
  ];

  const monthlyTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Leads",
        data: [200, 300, 400, 350, 500, 600],
        backgroundColor: "#f97316",
        borderRadius: 6,
      },
      {
        label: "Conversions",
        data: [50, 80, 120, 100, 150, 180],
        backgroundColor: "#38bdf8",
        borderRadius: 6,
      },
      {
        label: "Revenue (k)",
        data: [80, 120, 160, 140, 200, 240],
        backgroundColor: "#a78bfa",
        borderRadius: 6,
      },
    ],
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-400" : "text-red-400";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? "↗" : "↘";
  };

  // New function to handle Generate Custom Report
  const handleGenerateCustomReport = () => {
    setShowCustomReportDialog(true);
  };

  // New function to handle Schedule Reports
  const handleScheduleReports = () => {
    setShowScheduleDialog(true);
  };

  // New function to handle Dashboard View
  const handleDashboardView = () => {
    // This would typically navigate to a dashboard view or toggle a fullscreen mode
    toast({
      title: "Dashboard View",
      description: "Switching to dashboard view mode",
    });
    // Here you might add logic to switch to a different view or open in fullscreen
  };

  // --- Export Logic for Each Section ---
  const handleExportPDF = () => {
    const doc = new jsPDF();
    if (selectedReport === "performance") {
      doc.text("Performance Report", 10, 10);
      autoTable(doc, {
        head: [["Metric", "Value", "Change"]],
        body: performanceMetrics.map((m) => [m.label, m.value, m.change]),
      });
    } else if (selectedReport === "revenue") {
      doc.text("Revenue Analysis", 10, 10);
      autoTable(doc, {
        head: [["Source", "Amount", "Percentage"]],
        body: revenueBreakdown.map((r) => [
          r.source,
          r.amount,
          r.percentage + "%",
        ]),
      });
    } else if (selectedReport === "conversion") {
      doc.text("Conversion Funnel", 10, 10);
      autoTable(doc, {
        head: [["Stage", "Count", "Percentage"]],
        body: conversionFunnel.map((c) => [
          c.stage,
          c.count,
          c.percentage + "%",
        ]),
      });
    } else if (selectedReport === "team") {
      doc.text("Team Analytics", 10, 10);
      doc.text("Detailed team performance metrics and comparisons.", 10, 20);
    }
    doc.save(`${selectedReport}_report.pdf`);
  };

  const handleExportExcel = () => {
    let ws, wb;
    if (selectedReport === "performance") {
      ws = XLSX.utils.json_to_sheet(
        performanceMetrics.map((m) => ({
          Metric: m.label,
          Value: m.value,
          Change: m.change,
        }))
      );
    } else if (selectedReport === "revenue") {
      ws = XLSX.utils.json_to_sheet(
        revenueBreakdown.map((r) => ({
          Source: r.source,
          Amount: r.amount,
          Percentage: r.percentage,
        }))
      );
    } else if (selectedReport === "conversion") {
      ws = XLSX.utils.json_to_sheet(
        conversionFunnel.map((c) => ({
          Stage: c.stage,
          Count: c.count,
          Percentage: c.percentage,
        }))
      );
    } else if (selectedReport === "team") {
      ws = XLSX.utils.aoa_to_sheet([
        ["Team Analytics"],
        ["Detailed team performance metrics and comparisons."],
      ]);
    }
    wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws!, "Report");
    XLSX.writeFile(wb, `${selectedReport}_report.xlsx`);
  };

  // --- Date Range Logic ---
  const handleDateRange = () => {
    // Replace with your date picker if needed
    const from = prompt("From Date (YYYY-MM-DD):", dateRange.from);
    const to = prompt("To Date (YYYY-MM-DD):", dateRange.to);
    if (from && to) setDateRange({ from, to });
  };

  // --- Data Filtering Example (if you want to filter by date) ---
  // For demo, data is static. If you have date fields, filter here.

  return (
    <div className="space-y-6 bg-[#101624] min-h-screen p-4 rounded-xl text-white">
      {/* Report Selection */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Sales Reports & Analytics
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10"
            onClick={handleDateRange}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button
            variant="outline"
            className="border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10"
            onClick={handleExportPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            className="border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10"
            onClick={handleExportExcel}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex space-x-2">
        {reportTypes.map((type) => (
          <Button
            key={type.id}
            variant={selectedReport === type.id ? "default" : "outline"}
            onClick={() => setSelectedReport(type.id)}
            className={`flex items-center ${
              selectedReport === type.id
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10"
            }`}
          >
            <type.icon className="h-4 w-4 mr-2" />
            {type.name}
          </Button>
        ))}
      </div>

      {/* Performance Report */}
      {selectedReport === "performance" && (
        <>
          <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
            <CardHeader>
              <CardTitle className="text-white">
                Key Performance Indicators
              </CardTitle>
              <CardDescription className="text-gray-400">
                Monthly performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#232b45] rounded-lg bg-[#232b45]"
                  >
                    <div className="text-sm text-gray-400">{metric.label}</div>
                    <div className="text-2xl font-bold mt-1 text-white">
                      {metric.value}
                    </div>
                    <div
                      className={`text-sm mt-1 ${getTrendColor(metric.trend)}`}
                    >
                      {getTrendIcon(metric.trend)} {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
            <CardHeader>
              <CardTitle className="text-white">
                Monthly Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-[#232b45] rounded">
                <Bar
                  data={monthlyTrendData}
                  options={{
                    responsive: true,
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
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Revenue Analysis */}
      {selectedReport === "revenue" && (
        <>
          <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
            <CardHeader>
              <CardTitle className="text-white">
                Revenue Breakdown by Source
              </CardTitle>
              <CardDescription className="text-gray-400">
                Analysis of revenue streams and their contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueBreakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${item.color}`}></div>
                      <span className="font-medium text-white">
                        {item.source}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-white">
                        {item.amount}
                      </span>
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 w-12">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[#232b45] rounded">
                <div className="text-lg font-bold text-orange-400">
                  Total Revenue: ₹24,00,000
                </div>
                <div className="text-sm text-gray-400">
                  15% increase from previous month
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Monthly Revenue Trend
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Last 6 months performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-[#232b45] rounded">
                  <Bar
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      datasets: [
                        {
                          label: "Revenue (in lakhs ₹)",
                          data: [15.2, 17.8, 19.5, 18.3, 21.4, 24.2],
                          backgroundColor: "#f97316",
                          borderRadius: 6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
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
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Revenue Forecast</CardTitle>
                  <Badge className="bg-green-500 text-white">+18% YOY</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-[#232b45] rounded">
                  <Bar
                    data={{
                      labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                      datasets: [
                        {
                          label: "Projected Revenue (in lakhs ₹)",
                          data: [26.5, 28.2, 29.0, 30.5, 32.0, 35.0],
                          backgroundColor: "#8b5cf6",
                          borderRadius: 6,
                        },
                        {
                          label: "Last Year (in lakhs ₹)",
                          data: [22.3, 24.0, 24.5, 26.0, 27.2, 29.5],
                          backgroundColor: "#475569",
                          borderRadius: 6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
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
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">Revenue Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-[#232b45] rounded-lg">
                  <div className="text-sm text-gray-400">Average Deal Size</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-2xl font-bold text-white">₹18,500</div>
                    <div className="text-sm text-green-400">
                      ↗ +8% vs last month
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#232b45] rounded-lg">
                  <div className="text-sm text-gray-400">
                    Revenue per Sales Rep
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-2xl font-bold text-white">₹4.2L</div>
                    <div className="text-sm text-green-400">
                      ↗ +12% vs last month
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#232b45] rounded-lg">
                  <div className="text-sm text-gray-400">
                    Customer Acquisition Cost
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-2xl font-bold text-white">₹3,200</div>
                    <div className="text-sm text-red-400">
                      ↘ +5% vs last month
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Top Performing Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Fee Management Suite</span>
                    <Badge className="bg-green-900 text-green-300">
                      ₹12,50,000
                    </Badge>
                  </div>
                  <div className="w-full bg-[#232b45] rounded-full h-2 mb-4">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "52%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white">Student Portal</span>
                    <Badge className="bg-blue-900 text-blue-300">
                      ₹6,30,000
                    </Badge>
                  </div>
                  <div className="w-full bg-[#232b45] rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "26%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white">Admin Dashboard</span>
                    <Badge className="bg-purple-900 text-purple-300">
                      ₹3,60,000
                    </Badge>
                  </div>
                  <div className="w-full bg-[#232b45] rounded-full h-2 mb-4">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white">Mobile App</span>
                    <Badge className="bg-orange-900 text-orange-300">
                      ₹1,60,000
                    </Badge>
                  </div>
                  <div className="w-full bg-[#232b45] rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "7%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Top Performing Regions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Mumbai</span>
                    <Badge className="bg-green-900 text-green-300">
                      ₹8,50,000
                    </Badge>
                  </div>
                  <div className="w-full bg-[#232b45] rounded-full h-2 mb-4">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white">Delhi</span>
                    <Badge className="bg-blue-900 text-blue-300">
                      ₹6,20,000
                    </Badge>
                  </div>
                  <div className="w-full bg-[#232b45] rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "26%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white">Bangalore</span>
                    <Badge className="bg-purple-900 text-purple-300">
                      ₹4,80,000
                    </Badge>
                  </div>
                  <div className="w-full bg-[#232b45] rounded-full h-2 mb-4">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white">Pune</span>
                    <Badge className="bg-orange-900 text-orange-300">
                      ₹3,50,000
                    </Badge>
                  </div>
                  <div className="w-full bg-[#232b45] rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Conversion Funnel */}
      {selectedReport === "conversion" && (
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
          <CardHeader>
            <CardTitle className="text-white">
              Sales Conversion Funnel
            </CardTitle>
            <CardDescription className="text-gray-400">
              Track prospect journey from lead to customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="mb-2 flex items-center">
                    <span className="font-medium text-white">
                      {stage.stage}
                    </span>
                  </div>
                  <div className="relative w-full h-5 mb-1">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-3 bg-[#232b45] rounded-full"></div>
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                    <div className="relative z-10 flex justify-between items-center h-5 px-2 pointer-events-none">
                      <span className="font-bold text-white">
                        {stage.count}
                      </span>
                      <span className="text-gray-400">{stage.percentage}%</span>
                    </div>
                  </div>
                  {index < conversionFunnel.length - 1 && (
                    <div className="text-right text-sm text-red-400 mb-2">
                      -
                      {conversionFunnel[index].count -
                        conversionFunnel[index + 1].count}{" "}
                      dropoff
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-900 rounded">
                <div className="text-2xl font-bold text-green-300">26%</div>
                <div className="text-sm text-gray-300">
                  Overall Conversion Rate
                </div>
              </div>
              <div className="text-center p-4 bg-blue-900 rounded">
                <div className="text-2xl font-bold text-blue-300">12.5</div>
                <div className="text-sm text-gray-300">
                  Avg. Sales Cycle (Days)
                </div>
              </div>
              <div className="text-center p-4 bg-purple-900 rounded">
                <div className="text-2xl font-bold text-purple-300">
                  ₹18,500
                </div>
                <div className="text-sm text-gray-300">Average Deal Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Analytics */}
      {selectedReport === "team" && (
        <>
          <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
            <CardHeader>
              <CardTitle className="text-white">
                Individual Performance Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Leads</th>
                      <th className="px-4 py-2">Conversions</th>
                      <th className="px-4 py-2">Revenue</th>
                      <th className="px-4 py-2">Conversion Rate</th>
                      <th className="px-4 py-2">Performance Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">John Doe</td>
                      <td className="px-4 py-2">120</td>
                      <td className="px-4 py-2">32</td>
                      <td className="px-4 py-2">₹2,40,000</td>
                      <td className="px-4 py-2">26.7%</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-green-500">Excellent</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Jane Smith</td>
                      <td className="px-4 py-2">100</td>
                      <td className="px-4 py-2">28</td>
                      <td className="px-4 py-2">₹2,00,000</td>
                      <td className="px-4 py-2">28%</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-blue-500">Good</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Bob Johnson</td>
                      <td className="px-4 py-2">80</td>
                      <td className="px-4 py-2">20</td>
                      <td className="px-4 py-2">₹1,60,000</td>
                      <td className="px-4 py-2">25%</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-yellow-500">Average</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Alice Brown</td>
                      <td className="px-4 py-2">60</td>
                      <td className="px-4 py-2">16</td>
                      <td className="px-4 py-2">₹1,20,000</td>
                      <td className="px-4 py-2">26.7%</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-red-500">Below Average</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Team Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#232b45] rounded-lg">
                    <div className="text-sm text-gray-400">Total Revenue</div>
                    <div className="text-2xl font-bold mt-1 text-white">
                      ₹28,45,000
                    </div>
                  </div>
                  <div className="p-4 bg-[#232b45] rounded-lg">
                    <div className="text-sm text-gray-400">
                      Average Conversion Rate
                    </div>
                    <div className="text-2xl font-bold mt-1 text-white">
                      25.8%
                    </div>
                  </div>
                  <div className="p-4 bg-[#232b45] rounded-lg">
                    <div className="text-sm text-gray-400">Total Leads</div>
                    <div className="text-2xl font-bold mt-1 text-white">
                      628
                    </div>
                  </div>
                  <div className="p-4 bg-[#232b45] rounded-lg">
                    <div className="text-sm text-gray-400">
                      Total Conversions
                    </div>
                    <div className="text-2xl font-bold mt-1 text-white">
                      163
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#232b45] rounded">
                  <div className="text-lg font-bold text-orange-400">
                    Overall Team Performance Rating
                  </div>
                  <div className="text-sm text-gray-400">Excellent</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Monthly Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-[#232b45] rounded">
                  <Bar
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      datasets: [
                        {
                          label: "Team Performance",
                          data: [85, 90, 88, 92, 95, 97],
                          backgroundColor: "#f97316",
                          borderRadius: 6,
                        },
                        {
                          label: "Target",
                          data: [80, 80, 80, 80, 80, 80],
                          backgroundColor: "#475569",
                          borderRadius: 6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
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
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Excellent</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Good</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Average</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">10%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Below Average</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "5%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">John Doe</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">80%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Jane Smith</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">70%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Bob Johnson</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Alice Brown</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">50%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Team Efficiency Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-[#232b45] rounded-lg">
                  <div className="text-sm text-gray-400">
                    Average Response Time
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-2xl font-bold text-white">2 hours</div>
                    <div className="text-sm text-green-400">-10% vs target</div>
                  </div>
                </div>
                <div className="p-4 bg-[#232b45] rounded-lg">
                  <div className="text-sm text-gray-400">
                    Daily Call Metrics
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-2xl font-bold text-white">120</div>
                    <div className="text-sm text-green-400">
                      +5% vs last month
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#232b45] rounded-lg">
                  <div className="text-sm text-gray-400">Deal Closing Time</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-2xl font-bold text-white">10 days</div>
                    <div className="text-sm text-red-400">
                      +2 days vs target
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white">
                      Response Time Optimization
                    </span>
                    <Badge className="bg-green-900 text-green-300">
                      High Impact
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Deal Size Improvement</span>
                    <Badge className="bg-blue-900 text-blue-300">
                      Medium Impact
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Geographic Expansion</span>
                    <Badge className="bg-purple-900 text-purple-300">
                      Low Impact
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Development Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Skills Training</span>
                    <Badge className="bg-green-900 text-green-300">
                      High Priority
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Mentorship Program</span>
                    <Badge className="bg-blue-900 text-blue-300">
                      Medium Priority
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Incentive Structure</span>
                    <Badge className="bg-purple-900 text-purple-300">
                      Low Priority
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Team Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-[#232b45] rounded">
                  <Bar
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      datasets: [
                        {
                          label: "Team Performance",
                          data: [85, 90, 88, 92, 95, 97],
                          backgroundColor: "#f97316",
                          borderRadius: 6,
                        },
                        {
                          label: "Target",
                          data: [80, 80, 80, 80, 80, 80],
                          backgroundColor: "#475569",
                          borderRadius: 6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
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
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Report Actions */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
        <CardHeader>
          <CardTitle className="text-white">Report Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center border-orange-500 text-orange-400 bg-[#232b45] hover:bg-orange-500/10"
              onClick={handleGenerateCustomReport}
            >
              <FileText className="h-6 w-6 mb-2" />
              <span>Generate Custom Report</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center border-orange-500 text-orange-400 bg-[#232b45] hover:bg-orange-500/10"
              onClick={handleScheduleReports}
            >
              <Calendar className="h-6 w-6 mb-2" />
              <span>Schedule Reports</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center border-orange-500 text-orange-400 bg-[#232b45] hover:bg-orange-500/10"
              onClick={handleDashboardView}
            >
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Dashboard View</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Dialog */}
      <Dialog
        open={showCustomReportDialog}
        onOpenChange={setShowCustomReportDialog}
      >
        <DialogContent className="bg-[#181f32] border border-[#232b45] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">
              Generate Custom Report
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Report Type
              </label>
              <select className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-white">
                <option value="sales">Sales Performance</option>
                <option value="revenue">Revenue Analysis</option>
                <option value="team">Team Performance</option>
                <option value="conversion">Conversion Funnel</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Date Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-white"
                  placeholder="From"
                />
                <input
                  type="date"
                  className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-white"
                  placeholder="To"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Format
              </label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#232b45] text-gray-300 bg-[#232b45] hover:bg-orange-500/10"
                >
                  PDF
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#232b45] text-gray-300 bg-[#232b45] hover:bg-orange-500/10"
                >
                  Excel
                </Button>
              </div>
            </div>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                toast({
                  title: "Report Generated",
                  description:
                    "Your custom report has been generated successfully",
                });
                setShowCustomReportDialog(false);
              }}
            >
              Generate Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Reports Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="bg-[#181f32] border border-[#232b45] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule Reports</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Report Type
              </label>
              <select className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-white">
                <option value="sales">Sales Performance</option>
                <option value="revenue">Revenue Analysis</option>
                <option value="team">Team Performance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Frequency
              </label>
              <select className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-white">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Recipients
              </label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-white"
                placeholder="Email addresses (comma separated)"
              />
            </div>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                toast({
                  title: "Report Scheduled",
                  description: "Your report has been scheduled successfully",
                });
                setShowScheduleDialog(false);
              }}
            >
              Schedule Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesReports;
