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
  BarChart3,
  Download,
  Calendar,
  Users,
  DollarSign,
  Target,
  Eye,
} from "lucide-react";
import { jsPDF } from "jspdf";

const ReferralReports = () => {
  const reportTypes = [
    {
      title: "Monthly Performance Report",
      description: "Comprehensive overview of monthly referral activities",
      lastGenerated: "Jan 20, 2024",
      frequency: "Monthly",
      status: "Available",
      icon: BarChart3,
    },
    {
      title: "Revenue Analysis Report",
      description: "Detailed revenue breakdown and commission tracking",
      lastGenerated: "Jan 15, 2024",
      frequency: "Bi-weekly",
      status: "Available",
      icon: DollarSign,
    },
    {
      title: "Conversion Funnel Report",
      description: "Track referral conversion rates and pipeline analysis",
      lastGenerated: "Jan 10, 2024",
      frequency: "Weekly",
      status: "Available",
      icon: Target,
    },
    {
      title: "Institute Engagement Report",
      description: "Analyze engagement levels and communication effectiveness",
      lastGenerated: "Jan 18, 2024",
      frequency: "Monthly",
      status: "Processing",
      icon: Users,
    },
  ];

  const quickMetrics = [
    {
      label: "Total Referrals",
      value: "89",
      period: "All Time",
      trend: "+12%",
    },
    {
      label: "Conversion Rate",
      value: "26%",
      period: "This Month",
      trend: "+3%",
    },
    {
      label: "Revenue Generated",
      value: "₹4,56,000",
      period: "YTD",
      trend: "+18%",
    },
    {
      label: "Active Institutes",
      value: "23",
      period: "Current",
      trend: "+5%",
    },
  ];

  const performanceData = [
    { metric: "Lead Generation", thisMonth: 35, lastMonth: 28, change: "+25%" },
    {
      metric: "Successful Onboarding",
      thisMonth: 8,
      lastMonth: 6,
      change: "+33%",
    },
    {
      metric: "Revenue per Referral",
      thisMonth: "₹19,826",
      lastMonth: "₹18,200",
      change: "+9%",
    },
    {
      metric: "Follow-up Response Rate",
      thisMonth: "78%",
      lastMonth: "71%",
      change: "+7%",
    },
  ];

  const topPerformers = [
    { category: "Schools", count: 12, revenue: "₹1,80,000", conversion: "32%" },
    { category: "Colleges", count: 8, revenue: "₹1,40,000", conversion: "28%" },
    {
      category: "Coaching Centers",
      count: 6,
      revenue: "₹90,000",
      conversion: "24%",
    },
    {
      category: "Universities",
      count: 3,
      revenue: "₹75,000",
      conversion: "30%",
    },
  ];

  // Add state for custom report builder selections
  const [customReportType, setCustomReportType] = useState(
    "Performance Summary"
  );
  const [customDateRange, setCustomDateRange] = useState("Last 30 days");
  const [customFormat, setCustomFormat] = useState("PDF");

  // Function to handle viewing a report
  const onViewReport = (reportTitle: string) => {
    console.log(`Attempting to view report: ${reportTitle}`);
    // TODO: Implement actual report viewing logic (e.g., open in modal, navigate to a new page, fetch report data)
    // Example: openReportModal(reportTitle);
  };

  // Function to handle downloading a report
  const onDownloadReport = (reportTitle: string) => {
    console.log(`Attempting to download report: ${reportTitle}`);
    // TODO: Implement actual report download logic (e.g., trigger file download via API)
    // Example: triggerReportDownload(reportTitle);

    // Frontend PDF generation using jspdf
    const doc = new jsPDF();

    doc.text(`Report: ${reportTitle}`, 10, 10);
    let yPos = 20;

    const selectedReport = reportTypes.find(
      (report) => report.title === reportTitle
    );

    if (selectedReport) {
      doc.text(`Description: ${selectedReport.description}`, 10, yPos);
      yPos += 10;
      doc.text(`Last Generated: ${selectedReport.lastGenerated}`, 10, yPos);
      yPos += 10;
      doc.text(`Frequency: ${selectedReport.frequency}`, 10, yPos);
      yPos += 10;
      doc.text(`Status: ${selectedReport.status}`, 10, yPos);
      yPos += 10;
    }

    // Add some more data if available, e.g., a simplified list of all reports
    if (reportTitle === "Monthly Performance Report") {
      // Example: add a list for this specific report
      yPos += 10;
      doc.text("Available Reports Overview:", 10, yPos);
      yPos += 10;
      reportTypes.forEach((report, index) => {
        doc.text(`- ${report.title} (${report.status})`, 15, yPos);
        yPos += 7;
      });
    }

    // Save the PDF
    doc.save(`${reportTitle.replace(/\s+/g, "-").toLowerCase()}-report.pdf`);

    alert(`Downloading report: ${reportTitle}. Check your downloads folder.`); // Basic feedback
  };

  // Function to handle generating a custom report
  const onGenerateCustomReport = () => {
    console.log("Generating Custom Report with:", {
      type: customReportType,
      dateRange: customDateRange,
      format: customFormat,
    });
    // TODO: Implement actual custom report generation logic (e.g., make API call with selected criteria)
    // Example: generateReportAPI(customReportType, customDateRange, customFormat);
  };

  return (
    <div className="space-y-6">
      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickMetrics.map((metric, index) => (
          <Card
            key={index}
            className="shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-green-600 font-medium">
                    {metric.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Reports */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="h-5 w-5 mr-2" />
            Available Reports
          </CardTitle>
          <CardDescription>
            Generate and download detailed reports
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-4">
            {reportTypes.map((report, index) => {
              const IconComponent = report.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {report.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          Last: {report.lastGenerated}
                        </span>
                        <Badge variant="outline" className="text-gray-700">
                          {report.frequency}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={`text-xs ${
                        report.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {report.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={report.status !== "Available"}
                      className="border-gray-300 hover:bg-gray-100"
                      onClick={() => onDownloadReport(report.title)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-100"
                      onClick={() => onViewReport(report.title)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Performance Comparison</CardTitle>
          <CardDescription>
            Month-over-month performance analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {performanceData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="font-medium text-gray-900">{item.metric}</div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">This Month</div>
                    <div className="font-bold text-gray-900">
                      {item.thisMonth}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Last Month</div>
                    <div className="font-bold text-gray-900">
                      {item.lastMonth}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Change</div>
                    <div className="font-bold text-green-600">
                      {item.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers & Custom Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Categories</CardTitle>
            <CardDescription>Best converting institute types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">
                      {performer.category}
                    </h4>
                    <Badge variant="outline" className="text-gray-700">
                      {performer.count} institutes
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium ml-2 text-green-600">
                        {performer.revenue}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Conversion:</span>
                      <span className="font-medium ml-2 text-blue-600">
                        {performer.conversion}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Custom Report Builder</CardTitle>
            <CardDescription>Create personalized reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Report Type
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring focus:ring-blue-200 focus:border-blue-500"
                  value={customReportType}
                  onChange={(e) => setCustomReportType(e.target.value)}
                >
                  <option>Performance Summary</option>
                  <option>Revenue Analysis</option>
                  <option>Conversion Tracking</option>
                  <option>Institute Engagement</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring focus:ring-blue-200 focus:border-blue-500"
                  value={customDateRange}
                  onChange={(e) => setCustomDateRange(e.target.value)}
                >
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                  <option>Custom range</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Format
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring focus:ring-blue-200 focus:border-blue-500"
                  value={customFormat}
                  onChange={(e) => setCustomFormat(e.target.value)}
                >
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onGenerateCustomReport}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Report Schedule */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <Calendar className="h-5 w-5 mr-2" />
            Scheduled Reports
          </CardTitle>
          <CardDescription>Automatically generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Weekly Performance Summary</div>
                <div className="text-sm text-gray-600">
                  Every Monday at 9:00 AM
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Monthly Revenue Report</div>
                <div className="text-sm text-gray-600">1st of every month</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>

            <Button variant="outline" className="w-full">
              Configure Report Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralReports;
