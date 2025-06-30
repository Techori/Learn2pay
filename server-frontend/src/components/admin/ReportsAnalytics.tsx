import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { BarChart3, Download, Calendar, FileText, TrendingUp, Users, DollarSign, Filter, Search, Edit, Pause } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/Dialog";

// Define interfaces for TypeScript
interface ReportType {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  formats: string[];
  lastGenerated: string;
  downloads: number;
}

interface ScheduledReport {
  id: number;
  name: string;
  frequency: string;
  nextRun: string;
  recipients: string;
  status: string;
}

interface QuickStat {
  label: string;
  value: string;
  change: string;
  color: string;
}

const ReportsAnalytics: React.FC = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<string>('last-30-days');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showScheduleDialog, setShowScheduleDialog] = useState<boolean>(false);
  const [newReport, setNewReport] = useState<{
    name: string;
    frequency: string;
    recipients: string;
    status: string;
  }>({
    name: '',
    frequency: 'Daily',
    recipients: '',
    status: 'Active'
  });

  const reportTypes: ReportType[] = [
    {
      id: 1,
      name: "Revenue Report",
      description: "Detailed revenue breakdown by franchise, vendor, and service",
      icon: DollarSign,
      formats: ["Excel", "PDF"],
      lastGenerated: "2024-01-15 10:30",
      downloads: 234
    },
    {
      id: 2,
      name: "User Analytics",
      description: "User registration, activity, and engagement metrics",
      icon: Users,
      formats: ["Excel", "PDF"],
      lastGenerated: "2024-01-15 09:15",
      downloads: 156
    },
    {
      id: 3,
      name: "Vendor Performance",
      description: "Vendor KPIs, earnings, and subscription status",
      icon: TrendingUp,
      formats: ["Excel", "PDF", "CSV"],
      lastGenerated: "2024-01-15 08:45",
      downloads: 89
    },
    {
      id: 4,
      name: "Franchise Analytics",
      description: "Franchise performance, commissions, and target achievement",
      icon: BarChart3,
      formats: ["Excel", "PDF"],
      lastGenerated: "2024-01-14 18:20",
      downloads: 67
    }
  ];

  const scheduledReports: ScheduledReport[] = [
    {
      id: 1,
      name: "Daily Revenue Summary",
      frequency: "Daily",
      nextRun: "2024-01-16 06:00",
      recipients: "admin@company.com, finance@company.com",
      status: "Active"
    },
    {
      id: 2,
      name: "Weekly Vendor Report",
      frequency: "Weekly",
      nextRun: "2024-01-21 09:00",
      recipients: "operations@company.com",
      status: "Active"
    },
    {
      id: 3,
      name: "Monthly Business Review",
      frequency: "Monthly",
      nextRun: "2024-02-01 10:00",
      recipients: "management@company.com",
      status: "Active"
    }
  ];

  const quickStats: QuickStat[] = [
    { label: "Reports Generated", value: "1,234", change: "+15%", color: "text-secondary" },
    { label: "Downloads This Month", value: "567", change: "+22%", color: "text-success" },
    { label: "Scheduled Reports", value: "23", change: "+3%", color: "text-primary" },
    { label: "Data Sources", value: "8", change: "0%", color: "text-warning" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-white';
      case 'Paused': return 'bg-warning text-white';
      case 'Failed': return 'bg-danger text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  // Handle report generation
  const handleGenerateReport = (report: ReportType) => {
    toast({
      title: "Report Generated",
      description: `${report.name} has been generated in ${report.formats[0]} format.`
    });
  };

  // Handle schedule report
  const handleScheduleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.name || !newReport.recipients) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    const nextRun = new Date();
    nextRun.setDate(nextRun.getDate() + (newReport.frequency === 'Daily' ? 1 : newReport.frequency === 'Weekly' ? 7 : 30));
    const scheduledReport: ScheduledReport = {
      id: scheduledReports.length > 0 ? Math.max(...scheduledReports.map(r => r.id)) + 1 : 1,
      name: newReport.name,
      frequency: newReport.frequency,
      nextRun: nextRun.toISOString().slice(0, 16).replace('T', ' '),
      recipients: newReport.recipients,
      status: newReport.status
    };
    // In a real app, you'd add this to a state or API
    toast({
      title: "Report Scheduled",
      description: `${newReport.name} has been scheduled successfully.`
    });
    setShowScheduleDialog(false);
    setNewReport({ name: '', frequency: 'Daily', recipients: '', status: 'Active' });
  };

  // Handle quick export
  const handleQuickExport = (label: string) => {
    toast({
      title: "Export Started",
      description: `${label} export has been initiated.`
    });
  };

  return (
    <div className="space-y-6 bg-background-color p-6 text-text-color min-h-screen">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-card-bg border-card-border">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-text-color">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
              <div className={`text-xs ${stat.color}`}>{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-text-color">
                <FileText className="h-5 w-5 mr-2 text-secondary" />
                Reports & Analytics
              </CardTitle>
              <CardDescription className="text-text-secondary">Generate and download comprehensive business reports</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <select
                  className="pl-8 pr-4 py-2 rounded bg-input-bg border-input-border text-input-text cursor-pointer"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
                <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
              </div>
              {dateRange === 'custom' && (
                <div className="flex space-x-2">
                  <Input
                    type="date"
                    className="bg-input-bg border-input-border text-input-text"
                    placeholder="Start Date"
                  />
                  <Input
                    type="date"
                    className="bg-input-bg border-input-border text-input-text"
                    placeholder="End Date"
                  />
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] mb-6">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              placeholder="Search reports..."
              className="pl-10 bg-input-bg border-input-border text-input-text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Report Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {reportTypes
              .filter(report => 
                report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((report) => {
                const IconComponent = report.icon;
                return (
                  <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow bg-surface-color border-border-color">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-secondary/20 rounded">
                            <IconComponent className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text-color">{report.name}</h3>
                            <p className="text-sm text-text-secondary mb-2">{report.description}</p>
                            <div className="flex space-x-2">
                              {report.formats.map((format) => (
                                <Badge key={format} variant="outline" className="text-text-secondary border-border-color">{format}</Badge>
                              ))}
                            </div>
                            <div className="text-xs text-text-secondary/70 mt-2">
                              Last generated: {report.lastGenerated} • {report.downloads} downloads
                            </div>
                          </div>
                        </div>
                        <Button className="bg-secondary hover:bg-secondary text-white" onClick={() => handleGenerateReport(report)}>
                          <Download className="h-4 w-4 mr-2 text-white" />
                          Generate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-text-color">Scheduled Reports</CardTitle>
            <Button className="bg-secondary hover:bg-secondary text-white" onClick={() => setShowScheduleDialog(true)}>
              <Calendar className="h-4 w-4 mr-2 text-white" />
              Schedule New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-surface-color rounded border border-border-color">
                <div>
                  <div className="font-medium text-text-color">{report.name}</div>
                  <div className="text-sm text-text-secondary">
                    <span className="mr-4">Frequency: {report.frequency}</span>
                    <span className="mr-4">Next run: {report.nextRun}</span>
                  </div>
                  <div className="text-sm text-text-secondary/70">Recipients: {report.recipients}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                  <Button variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white">
                    <Edit className="h-3 w-3 text-secondary" />
                  </Button>
                  <Button variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white">
                    <Pause className="h-3 w-3 text-secondary" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <CardTitle className="text-text-color">Quick Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center bg-surface-color border-border-color hover:bg-surface-hover text-text-color" onClick={() => handleQuickExport("All Users")}>
              <Users className="h-6 w-6 mb-2 text-secondary" />
              <span>All Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center bg-surface-color border-border-color hover:bg-surface-hover text-text-color" onClick={() => handleQuickExport("Active Vendors")}>
              <TrendingUp className="h-6 w-6 mb-2 text-success" />
              <span>Active Vendors</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center bg-surface-color border-border-color hover:bg-surface-hover text-text-color" onClick={() => handleQuickExport("Today's Revenue")}>
              <DollarSign className="h-6 w-6 mb-2 text-primary" />
              <span>Today's Revenue</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center bg-surface-color border-border-color hover:bg-surface-hover text-text-color" onClick={() => handleQuickExport("Performance Data")}>
              <BarChart3 className="h-6 w-6 mb-2 text-warning" />
              <span>Performance Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Report Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="bg-card-bg border-border-color text-text-color max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule New Report</DialogTitle>
            <DialogDescription className="text-text-secondary">
              Set up a new scheduled report for automated generation.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleReport} className="space-y-4 py-4">
            <Input
              placeholder="Report Name"
              required
              value={newReport.name}
              onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
              className="bg-input-bg border-input-border text-input-text"
            />
            <select
              className="w-full pl-10 pr-4 py-2 rounded bg-input-bg border-input-border text-input-text cursor-pointer"
              value={newReport.frequency}
              onChange={(e) => setNewReport({ ...newReport, frequency: e.target.value })}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <Input
              placeholder="Recipients (comma-separated emails)"
              required
              value={newReport.recipients}
              onChange={(e) => setNewReport({ ...newReport, recipients: e.target.value })}
              className="bg-input-bg border-input-border text-input-text"
            />
            <select
              className="w-full pl-10 pr-4 py-2 rounded bg-input-bg border-input-border text-input-text cursor-pointer"
              value={newReport.status}
              onChange={(e) => setNewReport({ ...newReport, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
            <DialogFooter>
              <Button variant="outline" className="border-border-color text-text-color hover:bg-surface-color" onClick={() => setShowScheduleDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-secondary hover:bg-secondary text-white">
                Schedule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsAnalytics;