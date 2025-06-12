import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
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
  Circle
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Assuming recharts or a similar library is used based on shadcn/ui examples
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SupportReports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  // Static data based on images
  const keyMetrics = [
    {
      title: "Average Response Time",
      value: "2.3 hours",
      status: "needs improvement",
      change: "-15%",
      changeDirection: "down", // Use 'up' or 'down' for arrow direction
      target: "< 2 hours",
      icon: <Clock className="h-4 w-4" />
    },
    {
      title: "Resolution Rate",
      value: "94%",
      status: "good",
      change: "+2%",
      changeDirection: "up",
      target: "> 90%",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      title: "Customer Satisfaction",
      value: "4.4/5",
      status: "excellent",
      change: "+0.2",
      changeDirection: "up",
      target: "> 4.0",
      icon: <Smile className="h-4 w-4" />
    },
    {
      title: "First Contact Resolution",
      value: "78%",
      status: "good",
      change: "+5%",
      changeDirection: "up",
      target: "> 75%",
      icon: <PhoneCall className="h-4 w-4" />
    },
  ];

  const quickReports = [
    {
      title: "Daily Summary Report",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Performance Report",
      icon: <Activity className="h-6 w-6" /> // Using Activity icon as placeholder
    },
    {
      title: "Satisfaction Report",
      icon: <MessageSquare className="h-6 w-6" /> // Using MessageSquare as placeholder
    },
  ];

  // Static chart data based on images
  const ticketVolumeData = [
    { name: 'Jan', Opened: 45, Resolved: 40, Pending: 5 },
    { name: 'Feb', Opened: 52, Resolved: 48, Pending: 4 },
    { name: 'Mar', Opened: 38, Resolved: 35, Pending: 3 },
    { name: 'Apr', Opened: 61, Resolved: 58, Pending: 3 },
    { name: 'May', Opened: 49, Resolved: 46, Pending: 3 },
    { name: 'Jun', Opened: 23, Resolved: 21, Pending: 2 },
  ];

  const priorityDistributionData = [
    { name: 'Low', value: 400, color: '#10B981' },    // green-500
    { name: 'Medium', value: 450, color: '#F59E0B' }, // yellow-500
    { name: 'High', value: 150, color: '#EF4444' },  // red-500
  ];

  const categoryBreakdownData = [
    { name: 'Payment Issues', value: 35 },
    { name: 'Technical Issues', value: 25 },
    { name: 'Account Issues', value: 20 },
    { name: 'Integration', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const responseTimeData = [
    { name: 'Mon', avgTime: 2.4, target: 2 },
    { name: 'Tue', avgTime: 1.8, target: 2 },
    { name: 'Wed', avgTime: 2.2, target: 2 },
    { name: 'Thu', avgTime: 1.9, target: 2 },
    { name: 'Fri', avgTime: 2.1, target: 2 },
    { name: 'Sat', avgTime: 3.2, target: 2 },
    { name: 'Sun', avgTime: 2.8, target: 2 },
  ];

  const satisfactionData = [
     { name: 'Jan', rating: 4.5 },
     { name: 'Feb', rating: 4.6 },
     { name: 'Mar', rating: 4.4 },
     { name: 'Apr', rating: 4.7 },
     { name: 'May', rating: 4.6 },
     { name: 'Jun', rating: 4.8 },
  ];


  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'excellent': return 'bg-blue-500';
      case 'needs improvement': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const handleExportReport = () => {
    // Example: Exporting Ticket Volume Data to CSV
    const headers = ['Month', 'Opened', 'Resolved', 'Pending'];
    const csvData = ticketVolumeData.map(row => [
      row.name,
      row.Opened,
      row.Resolved,
      row.Pending
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `support_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Report Exported",
      description: "The report has been successfully exported as a CSV file.",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Support Reports & Analytics</CardTitle>
          <CardDescription>Comprehensive analytics and reports for support operations</CardDescription>
        </div>
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select Date Range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Badge className={`${getStatusBadgeColor(metric.status)} text-white`}>{metric.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold flex items-center space-x-2">
                 <span>{metric.value}</span>
                 {metric.changeDirection === 'up' && <TrendingUp className="h-5 w-5 text-green-500"/>}
                 {metric.changeDirection === 'down' && <ArrowDown className="h-5 w-5 text-red-500"/>}
                 <span className={`text-sm font-medium ${metric.changeDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>{metric.change}</span>
              </div>
              <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for Trends, Distribution, Performance, Satisfaction */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
        </TabsList>
        <TabsContent value="trends" className="space-y-6">
          {/* Ticket Volume Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                 <BarChart2 className="h-5 w-5"/>
                <span>Ticket Volume Trends</span>
              </CardTitle>
              <CardDescription>Monthly ticket creation and resolution trends</CardDescription>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={300}>
                 <BarChart data={ticketVolumeData}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <Tooltip />
                   <Legend />
                   <Bar dataKey="Opened" fill="#3B82F6" />
                   <Bar dataKey="Resolved" fill="#10B981" />
                   <Bar dataKey="Pending" fill="#F59E0B" />
                 </BarChart>
               </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution" className="space-y-6">
          {/* Priority Distribution and Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Priority Distribution Pie Chart */}
            <Card>
              <CardHeader>
                 <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5"/> {/* Using PieChart icon from lucide-react */}
                   <span>Priority Distribution</span>
                 </CardTitle>
                <CardDescription>Distribution of tickets by priority level</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                 <ResponsiveContainer width="100%" height={300}>
                   <PieChart>
                     <Pie
                       data={priorityDistributionData}
                       cx="50%"
                       cy="50%"
                       outerRadius={100}
                       fill="#8884d8"
                       dataKey="value"
                       label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                     >
                       {priorityDistributionData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                      <Tooltip />
                      <Legend />
                   </PieChart>
                 </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                 <CardTitle className="flex items-center space-x-2">
                     <BarChart2 className="h-5 w-5"/>
                    <span>Category Breakdown</span>
                 </CardTitle>
                <CardDescription>Support tickets by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryBreakdownData.map((category, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{category.name}</span>
                      <span>{category.value} tickets</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(category.value / categoryBreakdownData.reduce((sum, cat) => sum + cat.value, 0)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-6">
           {/* Response Time Performance Line Chart */}
          <Card>
            <CardHeader>
               <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5"/>
                 <span>Response Time Performance</span>
               </CardTitle>
              <CardDescription>Average response time vs target by day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgTime" stroke="#3B82F6" name="Average Response Time" />
                   <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="satisfaction" className="space-y-6">
           {/* Customer Satisfaction Trend Line Chart */}
      <Card>
        <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                   <Smile className="h-5 w-5"/>
                  <span>Customer Satisfaction Trend</span>
                </CardTitle>
              <CardDescription>Monthly customer satisfaction ratings</CardDescription>
        </CardHeader>
        <CardContent>
               <ResponsiveContainer width="100%" height={300}>
                 <LineChart data={satisfactionData}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="name" />
                   <YAxis label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} domain={[0, 5]}/>
                   <Tooltip />
                   <Legend />
                    <Line type="monotone" dataKey="rating" stroke="#10B981" name="Satisfaction Rating" />
                 </LineChart>
               </ResponsiveContainer>
        </CardContent>
      </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Reports */}
      <div className="space-y-4">
         <h3 className="text-lg font-semibold">Quick Reports</h3>
         <CardDescription>Generate specific reports for different stakeholders</CardDescription>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickReports.map((report, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 justify-center items-center"
              onClick={() => toast({
                title: `Generating ${report.title}`,
                description: `Initiating report generation for ${report.title}.`,
              })}
            >
              {report.icon}
              <span>{report.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportReports;
