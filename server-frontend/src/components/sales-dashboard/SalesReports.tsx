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
import { useTheme } from "../../context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesReports = () => {
  const { theme } = useTheme();
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
      color: "bg-primary",
    },
    {
      source: "Referral Program",
      amount: "₹6,20,000",
      percentage: 26,
      color: "bg-success",
    },
    {
      source: "Partner Channel",
      amount: "₹3,80,000",
      percentage: 16,
      color: "bg-secondary",
    },
    {
      source: "Digital Marketing",
      amount: "₹1,50,000",
      percentage: 6,
      color: "bg-warning",
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
        backgroundColor: "var(--primary)",
        borderRadius: 6,
      },
      {
        label: "Conversions",
        data: [50, 80, 120, 100, 150, 180],
        backgroundColor: "var(--secondary)",
        borderRadius: 6,
      },
      {
        label: "Revenue (k)",
        data: [80, 120, 160, 140, 200, 240],
        backgroundColor: "var(--accent)",
        borderRadius: 6,
      },
    ],
  };

  // Theme variables
  const bgColor = theme === "dark" ? "bg-[#101624]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const cardBorder = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const tableBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const tableHeaderBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const tableHeaderText = theme === "dark" ? "text-orange-400" : "text-orange-600";
  const inputBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const chartGridColor = theme === "dark" ? "#232b45" : "#e5e7eb";
  const buttonOutline = theme === "dark" 
    ? "border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10" 
    : "border-gray-300 text-gray-700 bg-white hover:bg-orange-100";
  const buttonAccent = theme === "dark" ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-orange-500 text-white hover:bg-orange-600";
  const dialogBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const dialogBorderColor = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const dialogText = theme === "dark" ? "text-white" : "text-gray-900";
  const kpiCardBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const paginationBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const selectBg = theme === "dark" ? "bg-[#232b45] border-[#232b45] text-gray-300" : "bg-white border-gray-300 text-gray-700";

  const getTrendColor = (trend: string) => {
    return trend === "up" 
      ? (theme === "dark" ? "text-success text-green-400" : "text-success text-green-600") 
      : (theme === "dark" ? "text-danger text-red-400" : "text-danger text-red-600");
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: theme === "dark" ? "#fff" : "#000" } },
    },
    scales: {
      x: {
        ticks: { color: theme === "dark" ? "#fff" : "#000" },
        grid: { color: chartGridColor },
      },
      y: {
        ticks: { color: theme === "dark" ? "#fff" : "#000" },
        grid: { color: chartGridColor },
      },
    },
  };

  return (
    <div className={`space-y-6 ${bgColor} min-h-screen p-4 rounded-xl ${textColor}`}>
      {/* Report Selection */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Sales Reports & Analytics
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className={buttonOutline}
            onClick={handleDateRange}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button
            variant="outline"
            className={buttonOutline}
            onClick={handleExportPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            className={buttonOutline}
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
            className={
              selectedReport === type.id
                ? "bg-orange-500 border-orange-500 text-white"
                : buttonOutline
            }
          >
            <type.icon className="h-4 w-4 mr-2" />
            {type.name}
          </Button>
        ))}
      </div>

      {/* Performance Report */}
      {selectedReport === "performance" && (
        <>
          <Card className={`${cardBg} border ${cardBorder} shadow-none ${textColor}`}>
            <CardHeader>
              <CardTitle className={textColor}>
                Key Performance Indicators
              </CardTitle>
              <CardDescription className={textSecondary}>
                Monthly performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className={`p-4 border ${cardBorder} rounded-lg ${kpiCardBg}`}
                  >
                    <div className={textSecondary}>{metric.label}</div>
                    <div className={`text-2xl font-bold mt-1 ${textColor}`}>
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

          <Card className={`${cardBg} border ${cardBorder} shadow-none ${textColor}`}>
            <CardHeader>
              <CardTitle className={textColor}>
                Monthly Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`h-64 flex items-center justify-center ${kpiCardBg} rounded`}>
                <Bar
                  data={monthlyTrendData}
                  options={chartOptions}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Revenue Analysis */}
      {selectedReport === "revenue" && (
        <>
          <Card className={`${cardBg} border ${cardBorder} shadow-none ${textColor}`}>
            <CardHeader>
              <CardTitle className={textColor}>
                Revenue Breakdown by Source
              </CardTitle>
              <CardDescription className={textSecondary}>
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
                      <span className="font-medium">
                        {item.source}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold">
                        {item.amount}
                      </span>
                      <div className={`w-32 ${kpiCardBg} rounded-full h-2`}>
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${textSecondary} w-12`}>
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`mt-6 p-4 ${kpiCardBg} rounded`}>
                <div className="text-lg font-bold text-orange-400">
                  Total Revenue: ₹24,00,000
                </div>
                <div className={`text-sm ${textSecondary}`}>
                  15% increase from previous month
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className={`${cardBg} border ${cardBorder} shadow-none ${textColor}`}>
              <CardHeader>
                <CardTitle className={textColor}>
                  Monthly Revenue Trend
                </CardTitle>
                <CardDescription className={textSecondary}>
                  Last 6 months performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`h-64 flex items-center justify-center ${kpiCardBg} rounded`}>
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
                    options={chartOptions}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={`${cardBg} border ${cardBorder} shadow-none ${textColor}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className={textColor}>Revenue Forecast</CardTitle>
                  <Badge className="bg-green-500 text-white">+18% YOY</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`h-64 flex items-center justify-center ${kpiCardBg} rounded`}>
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
                    options={chartOptions}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional revenue-related cards */}
        </>
      )}

      {/* Conversion Funnel */}
      {selectedReport === "conversion" && (
        <Card className={`${cardBg} border ${cardBorder} shadow-none ${textColor}`}>
          <CardHeader>
            <CardTitle className={textColor}>
              Sales Conversion Funnel
            </CardTitle>
            <CardDescription className={textSecondary}>
              Track prospect journey from lead to customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="mb-2 flex items-center">
                    <span className="font-medium">
                      {stage.stage}
                    </span>
                  </div>
                  <div className="relative w-full h-5 mb-1">
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-3 ${kpiCardBg} rounded-full`}></div>
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                    <div className="relative z-10 flex justify-between items-center h-5 px-2 pointer-events-none">
                      <span className="font-bold">
                        {stage.count}
                      </span>
                      <span className={textSecondary}>{stage.percentage}%</span>
                    </div>
                  </div>
                  {index < conversionFunnel.length - 1 && (
                    <div className={`text-right text-sm ${theme === "dark" ? "text-red-400" : "text-red-600"} mb-2`}>
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
              <div className={`text-center p-4 ${theme === "dark" ? "bg-green-900" : "bg-green-100"} rounded`}>
                <div className={`text-2xl font-bold ${theme === "dark" ? "text-green-300" : "text-green-700"}`}>26%</div>
                <div className={`text-sm ${textSecondary}`}>
                  Overall Conversion Rate
                </div>
              </div>
              <div className={`text-center p-4 ${theme === "dark" ? "bg-blue-900" : "bg-blue-100"} rounded`}>
                <div className={`text-2xl font-bold ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}>12.5</div>
                <div className={`text-sm ${textSecondary}`}>
                  Avg. Sales Cycle (Days)
                </div>
              </div>
              <div className={`text-center p-4 ${theme === "dark" ? "bg-purple-900" : "bg-purple-100"} rounded`}>
                <div className={`text-2xl font-bold ${theme === "dark" ? "text-purple-300" : "text-purple-700"}`}>
                  ₹18,500
                </div>
                <div className={`text-sm ${textSecondary}`}>Average Deal Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Analytics */}
      {selectedReport === "team" && (
        <>
          <Card className={`${cardBg} border ${cardBorder} shadow-none ${textColor}`}>
            <CardHeader>
              <CardTitle className={textColor}>
                Individual Performance Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className={tableHeaderBg}>
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
                    <tr className={theme === "dark" ? "hover:bg-[#232b45]" : "hover:bg-gray-50"}>
                      <td className="px-4 py-2">John Doe</td>
                      <td className="px-4 py-2">120</td>
                      <td className="px-4 py-2">32</td>
                      <td className="px-4 py-2">₹2,40,000</td>
                      <td className="px-4 py-2">26.7%</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-green-500">Excellent</Badge>
                      </td>
                    </tr>
                    <tr className={theme === "dark" ? "hover:bg-[#232b45]" : "hover:bg-gray-50"}>
                      <td className="px-4 py-2">Jane Smith</td>
                      <td className="px-4 py-2">100</td>
                      <td className="px-4 py-2">28</td>
                      <td className="px-4 py-2">₹2,00,000</td>
                      <td className="px-4 py-2">28%</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-blue-500">Good</Badge>
                      </td>
                    </tr>
                    {/* Additional table rows */}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Additional team-related cards */}
        </>
      )}

      {/* Report Actions */}
      <Card className={`${cardBg} border ${cardBorder} shadow-none ${textColor}`}>
        <CardHeader>
          <CardTitle className={textColor}>Report Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className={`h-20 flex flex-col items-center justify-center border-orange-500 text-orange-400 ${theme === "dark" ? "bg-[#232b45]" : "bg-gray-50"} hover:bg-orange-500/10`}
              onClick={handleGenerateCustomReport}
            >
              <FileText className="h-6 w-6 mb-2" />
              <span>Generate Custom Report</span>
            </Button>
            <Button
              variant="outline"
              className={`h-20 flex flex-col items-center justify-center border-orange-500 text-orange-400 ${theme === "dark" ? "bg-[#232b45]" : "bg-gray-50"} hover:bg-orange-500/10`}
              onClick={handleScheduleReports}
            >
              <Calendar className="h-6 w-6 mb-2" />
              <span>Schedule Reports</span>
            </Button>
            <Button
              variant="outline"
              className={`h-20 flex flex-col items-center justify-center border-orange-500 text-orange-400 ${theme === "dark" ? "bg-[#232b45]" : "bg-gray-50"} hover:bg-orange-500/10`}
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
        <DialogContent className={`${dialogBg} border ${dialogBorderColor} ${dialogText}`}>
          <DialogHeader>
            <DialogTitle className={dialogText}>
              Generate Custom Report
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Report Type
              </label>
              <select className={`w-full p-2 rounded ${selectBg}`}>
                <option value="sales">Sales Performance</option>
                <option value="revenue">Revenue Analysis</option>
                <option value="team">Team Performance</option>
                <option value="conversion">Conversion Funnel</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Date Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className={`w-full p-2 rounded ${selectBg}`}
                  placeholder="From"
                />
                <input
                  type="date"
                  className={`w-full p-2 rounded ${selectBg}`}
                  placeholder="To"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Format
              </label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className={`flex-1 ${buttonOutline}`}
                >
                  PDF
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 ${buttonOutline}`}
                >
                  Excel
                </Button>
              </div>
            </div>
            <Button
              className={`w-full ${buttonAccent}`}
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
        <DialogContent className={`${dialogBg} border ${dialogBorderColor} ${dialogText}`}>
          <DialogHeader>
            <DialogTitle className={dialogText}>Schedule Reports</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Report Type
              </label>
              <select className={`w-full p-2 rounded ${selectBg}`}>
                <option value="sales">Sales Performance</option>
                <option value="revenue">Revenue Analysis</option>
                <option value="team">Team Performance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Frequency
              </label>
              <select className={`w-full p-2 rounded ${selectBg}`}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Recipients
              </label>
              <input
                type="text"
                className={`w-full p-2 rounded ${selectBg}`}
                placeholder="Email addresses (comma separated)"
              />
            </div>
            <Button
              className={`w-full ${buttonAccent}`}
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
