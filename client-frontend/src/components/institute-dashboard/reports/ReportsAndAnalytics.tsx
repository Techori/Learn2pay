import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { jsPDF } from "jspdf";
import {
  FileText,
  IndianRupee,
  BarChart2,
  Calendar,
  Download,
  Play,
  Clock,
  Users,
  TrendingUp,
  ClipboardList,
  Upload,
} from "lucide-react";

interface ReportCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  frequency: string;
  lastGenerated: string;
  lastGeneratedTime: string;
}

const ReportsAndAnalytics = () => {
  const reportSummary = [
    {
      icon: FileText,
      title: "Reports Generated",
      value: "45",
      description: "This month",
      color: "text-blue-400",
    },
    {
      icon: IndianRupee,
      title: "Revenue Tracked",
      value: "₹25.6L",
      description: "Last 30 days",
      color: "text-green-400",
    },
    {
      icon: BarChart2,
      title: "Collection Rate",
      value: "89%",
      description: "Current quarter",
      color: "text-purple-400",
    },
    {
      icon: Calendar,
      title: "Scheduled Reports",
      value: "12",
      description: "Auto-generated",
      color: "text-orange-400",
    },
  ];

  const recentReportsData = [
    {
      title: "Monthly Fee Collection - January 2024",
      date: "Today, 10:30 AM",
      size: "2.3 MB",
      type: "PDF",
    },
    {
      title: "Student Enrollment Analytics",
      date: "Yesterday, 5:00 PM",
      size: "1.8 MB",
      type: "Excel",
    },
    {
      title: "Outstanding Dues Report",
      date: "2 days ago",
      size: "890 KB",
      type: "PDF",
    },
    {
      title: "Payment Methods Analysis",
      date: "3 days ago",
      size: "1.2 MB",
      type: "PDF",
    },
  ];

  const generateReportPdf = (reportTitle: string, content: string) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(reportTitle, 10, 20);
    doc.setFontSize(12);
    doc.text(content, 10, 30);
    doc.save(`${reportTitle.replace(/[^a-zA-Z0-9]/g, "")}.pdf`);
  };

  const handleGenerateReportClick = (title: string, description: string) => {
    const content = `This is a generated report for: ${description}.\n\n${title} data will be placed here.`;
    generateReportPdf(title, content);
  };

  const handleDownloadRecentReportClick = (report: any) => {
    if (report.type === "PDF") {
      const content = `This is the content for the \"${report.title}\" report.\n\nGenerated on: ${report.date}.`;
      generateReportPdf(report.title, content);
    } else {
      alert(`Downloading ${report.type} for: ${report.title}`);
      console.log(`Simulating download of ${report.type} for: ${report.title}`);
      // In a real app, you would fetch and download the actual Excel file
    }
  };

  const handleExportAllDataClick = () => {
    const content = `This is a comprehensive export of all data from the Institute Dashboard.\n\nThis report includes fee collection, student analytics, payment trends, and outstanding dues.`;
    generateReportPdf("All Institute Data Export", content);
  };

  const ReportCard = ({
    icon: Icon,
    title,
    description,
    frequency,
    lastGenerated,
    lastGeneratedTime,
  }: ReportCardProps) => (
    <Card className="bg-gray-800/50 border-gray-700 shadow-md">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 text-orange-500" />
          <CardTitle className="text-lg text-white">{title}</CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Frequency:</span>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {frequency}
          </Badge>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Last Generated:</span>
          <span className="text-white">
            {lastGenerated} {lastGeneratedTime}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white flex-grow flex items-center justify-center space-x-2"
            onClick={() => handleGenerateReportClick(title, description)}
          >
            <Play className="h-4 w-4" />
            <span>Generate</span>
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
            onClick={() =>
              handleDownloadRecentReportClick({
                title: title,
                type: "PDF",
                date: lastGenerated,
                size: "N/A",
              })
            }
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
            onClick={() => console.log("Schedule Report clicked for:", title)}
          >
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Reports & Analytics Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
          <p className="text-gray-400">
            Generate comprehensive reports for fee management and analytics
          </p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
          onClick={handleExportAllDataClick}
        >
          <Upload className="h-5 w-5" />
          <span>Export All Data</span>
        </Button>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {reportSummary.map((item, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700 shadow-md"
          >
            <CardContent className="p-5 flex items-center space-x-4">
              <div
                className={`p-3 rounded-lg ${item.color.replace(
                  "text",
                  "bg"
                )}/20`}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Generation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportCard
          icon={IndianRupee}
          title="Fee Collection Report"
          description="Detailed analysis of fee collections across all classes"
          frequency="Daily/Monthly/Yearly"
          lastGenerated="Today,"
          lastGeneratedTime="10:30 AM"
        />
        <ReportCard
          icon={Users}
          title="Student Analytics"
          description="Student enrollment, attendance, and performance metrics"
          frequency="Weekly/Monthly"
          lastGenerated="Yesterday,"
          lastGeneratedTime="5:00 PM"
        />
        <ReportCard
          icon={TrendingUp}
          title="Payment Trends"
          description="Payment methods, success rates, and transaction analytics"
          frequency="Monthly/Quarterly"
          lastGenerated="2 days ago"
          lastGeneratedTime=""
        />
        <ReportCard
          icon={ClipboardList}
          title="Outstanding Dues"
          description="Pending payments and overdue amounts by class/student"
          frequency="Daily/Weekly"
          lastGenerated="Today,"
          lastGeneratedTime="9:00 AM"
        />
      </div>

      {/* Recent Reports Section */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-white">Recent Reports</CardTitle>
          <CardDescription className="text-gray-400">
            Your recently generated reports and analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800">
            {recentReportsData.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-800/70"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-white">
                      {report.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {report.date} • {report.size} • {report.type}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-orange-500"
                  onClick={() => handleDownloadRecentReportClick(report)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAndAnalytics;
