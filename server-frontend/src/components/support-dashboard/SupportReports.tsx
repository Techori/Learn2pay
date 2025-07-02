import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import {
  CalendarDays,
  Download,
  Clock,
  CheckCircle,
  Smile,
  PhoneCall,
  TrendingUp,
  ArrowDown,
  BarChart2,
  FileText,
  MessageSquare,
  Activity,
  Circle,
  Wallet,
  Landmark,
  Hourglass,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

// Assuming recharts or a similar library is used based on shadcn/ui examples
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SupportReports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const collectionMetrics = [
    {
      title: "Today's Collection",
      value: "₹1,20,500",
      icon: <Wallet className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "This Week's Collection",
      value: "₹8,50,000",
      icon: <CalendarDays className="h-6 w-6 text-green-400" />,
    },
    {
      title: "This Month's Collection",
      value: "₹34,75,000",
      icon: <Landmark className="h-6 w-6 text-purple-400" />,
    },
    {
      title: "Pending Collections",
      value: "₹5,60,000",
      icon: <Hourglass className="h-6 w-6 text-orange-400" />,
    },
  ];

  const quickReports = [
    {
      title: "Daily Summary Report",
      icon: <FileText className="h-6 w-6 text-orange-400" />,
    },
    {
      title: "Performance Report",
      icon: <Activity className="h-6 w-6 text-green-400" />,
    },
    {
      title: "Satisfaction Report",
      icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
    },
  ];

  // Static chart data based on images
  const ticketVolumeData = [
    { name: "Jan", Opened: 45, Resolved: 40, Pending: 5 },
    { name: "Feb", Opened: 52, Resolved: 48, Pending: 4 },
    { name: "Mar", Opened: 38, Resolved: 35, Pending: 3 },
    { name: "Apr", Opened: 61, Resolved: 58, Pending: 3 },
    { name: "May", Opened: 49, Resolved: 46, Pending: 3 },
    { name: "Jun", Opened: 23, Resolved: 21, Pending: 2 },
  ];

  const priorityDistributionData = [
    { name: "Low", value: 400, color: "#10B981" }, // green-500
    { name: "Medium", value: 450, color: "#F59E0B" }, // yellow-500
    { name: "High", value: 150, color: "#EF4444" }, // red-500
  ];

  const categoryBreakdownData = [
    { name: "Payment Issues", value: 35 },
    { name: "Technical Issues", value: 25 },
    { name: "Account Issues", value: 20 },
    { name: "Integration", value: 15 },
    { name: "Others", value: 5 },
  ];

  const responseTimeData = [
    { name: "Mon", avgTime: 2.4, target: 2 },
    { name: "Tue", avgTime: 1.8, target: 2 },
    { name: "Wed", avgTime: 2.2, target: 2 },
    { name: "Thu", avgTime: 1.9, target: 2 },
    { name: "Fri", avgTime: 2.1, target: 2 },
    { name: "Sat", avgTime: 3.2, target: 2 },
    { name: "Sun", avgTime: 2.8, target: 2 },
  ];

  const satisfactionData = [
    { name: "Jan", rating: 4.5 },
    { name: "Feb", rating: 4.6 },
    { name: "Mar", rating: 4.4 },
    { name: "Apr", rating: 4.7 },
    { name: "May", rating: 4.6 },
    { name: "Jun", rating: 4.8 },
  ];

  const institutes = [
    {
      id: "INST-001",
      name: "ABC International School",
      location: "Mumbai, Maharashtra",
      students: 1250,
      joinedDate: "2024-01-15",
      phone: "+91 9876543210",
      email: "admin@abcschool.com",
      monthlyRevenue: "₹1,25,000",
      status: "Active",
      plan: "Premium",
      payment: "Paid",
      teachers: 85,
      totalTickets: 5,
      openTickets: 2,
    },
    {
      id: "INST-002",
      name: "XYZ Academy",
      location: "Delhi, India",
      students: 800,
      joinedDate: "2024-02-20",
      phone: "+91 9876543210",
      email: "info@xyzacademy.com",
      monthlyRevenue: "₹80,000",
      status: "Active",
      plan: "Standard",
      payment: "Pending",
      teachers: 45,
      totalTickets: 3,
      openTickets: 1,
    },
    {
      id: "INST-003",
      name: "Success Coaching Institute",
      location: "Bangalore, Karnataka",
      students: 350,
      joinedDate: "2024-03-10",
      phone: "+91 9876543210",
      email: "contact@successinstitute.com",
      monthlyRevenue: "₹35,000",
      status: "Inactive",
      plan: "Basic",
      payment: "Overdue",
      teachers: 20,
      totalTickets: 8,
      openTickets: 0,
    },
  ];

  const [selectedInstituteId, setSelectedInstituteId] = useState<string>(institutes[0].id);
  const selectedInstitute = institutes.find(inst => inst.id === selectedInstituteId);

  const handleExportReport = () => {
    // Example: Exporting Ticket Volume Data to CSV
    const headers = ["Month", "Opened", "Resolved", "Pending"];
    const csvData = ticketVolumeData.map((row) => [
      row.name,
      row.Opened,
      row.Resolved,
      row.Pending,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `support_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Report Exported",
      description: "The report has been successfully exported as a CSV file.",
    });
  };

  const handleDownloadInstitutePDF = () => {
    if (!selectedInstitute) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Institute Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${selectedInstitute.name}`, 14, 35);
    doc.text(`ID: ${selectedInstitute.id}`, 14, 45);
    doc.text(`Location: ${selectedInstitute.location}`, 14, 55);
    doc.text(`Students: ${selectedInstitute.students}`, 14, 65);
    doc.text(`Teachers: ${selectedInstitute.teachers}`, 14, 75);
    doc.text(`Joined: ${selectedInstitute.joinedDate}`, 14, 85);
    doc.text(`Phone: ${selectedInstitute.phone}`, 14, 95);
    doc.text(`Email: ${selectedInstitute.email}`, 14, 105);
    doc.text(`Monthly Revenue: ${selectedInstitute.monthlyRevenue}`, 14, 115);
    doc.text(`Status: ${selectedInstitute.status}`, 14, 125);
    doc.text(`Plan: ${selectedInstitute.plan}`, 14, 135);
    doc.text(`Payment: ${selectedInstitute.payment}`, 14, 145);
    doc.text(`Total Tickets: ${selectedInstitute.totalTickets}`, 14, 155);
    doc.text(`Open Tickets: ${selectedInstitute.openTickets}`, 14, 165);
    doc.save(`${selectedInstitute.name.replace(/\s+/g, "_")}_Report.pdf`);
  };

  return (
    <div className="space-y-6 bg-background-color text-text-color min-h-screen">
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-text-color">
                Support Reports & Analytics
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Comprehensive analytics and reports for support operations
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center border-border-color text-text-color hover:bg-surface-color"
                  >
                    <CalendarDays className="mr-2 h-4 w-4 text-text-secondary" />
                    {date ? format(date, "PPP") : "Select Date Range"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card-bg border-border-color">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button
                className="bg-warning hover:bg-warning text-white flex items-center"
                onClick={handleExportReport}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Institute PDF Download Section */}
          <div className="mb-8 p-4 bg-surface-color rounded-lg flex flex-col md:flex-row items-center gap-4">
            <label htmlFor="institute-select" className="text-text-color font-medium mr-2">Download Institute Report:</label>
            <select
              id="institute-select"
              className="bg-input-bg border border-input-border text-input-text rounded px-3 py-2 focus:outline-none focus:border-warning"
              value={selectedInstituteId}
              onChange={e => setSelectedInstituteId(e.target.value)}
            >
              {institutes.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.name}</option>
              ))}
            </select>
            <Button
              className="bg-warning hover:bg-warning text-white flex items-center"
              onClick={handleDownloadInstitutePDF}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>

          {/* Collection Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {collectionMetrics.map((metric, index) => (
              <Card key={index} className="bg-surface-color border-border-color">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-text-color">
                    {metric.title}
                  </CardTitle>
                  {metric.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-text-color">
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs for different report types */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-card-bg p-1 rounded-md">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="tickets"
                className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
              >
                Ticket Analysis
              </TabsTrigger>
              <TabsTrigger
                value="performance"
                className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
              >
                Performance
              </TabsTrigger>
              <TabsTrigger
                value="satisfaction"
                className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
              >
                Satisfaction
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ticket Volume Chart */}
                <Card className="bg-slate-800/30 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Ticket Volume</CardTitle>
                    <CardDescription className="text-gray-400">
                      Monthly ticket volume trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={ticketVolumeData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              borderColor: "#374151",
                              color: "#F9FAFB",
                            }}
                          />
                          <Legend />
                          <Bar dataKey="Opened" fill="#F97316" />
                          <Bar dataKey="Resolved" fill="#10B981" />
                          <Bar dataKey="Pending" fill="#F59E0B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Priority Distribution Pie Chart */}
                <Card className="bg-slate-800/30 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Priority Distribution
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Distribution of tickets by priority level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={priorityDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {priorityDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              borderColor: "#374151",
                              color: "#F9FAFB",
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Reports Section */}
              <Card className="bg-slate-800/30 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Reports</CardTitle>
                  <CardDescription className="text-gray-400">
                    Access frequently used reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickReports.map((report, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center space-y-2 border-gray-700 text-gray-200 hover:bg-gray-700"
                      >
                        {report.icon}
                        <span>{report.title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Additional tabs content would go here */}
            <TabsContent value="tickets" className="space-y-6">
              {/* Ticket Analysis content */}
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Performance content */}
            </TabsContent>

            <TabsContent value="satisfaction" className="space-y-6">
              {/* Satisfaction content */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportReports;
