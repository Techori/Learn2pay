import React, { useState, useEffect } from 'react';
import { TabsContent } from "../../components/ui/Tabs";
import DashboardCharts from '../../components/DashboardCharts';
import DashboardMetrics from '../../components/DashboardMetrics';
import UserAccessControl from '../../components/admin/UserAccessControl';
import BulkNotificationSystem from '../../components/admin/BulkNotificationSystem';
import LiveMonitoringPanel from '../../components/admin/LiveMonitoringPanel';
import RoleManagement from '../../components/admin/RoleManagement';
import SecurityAuditLogs from '../../components/admin/SecurityAuditLogs';
import FraudDetectionSystem from '../../components/admin/FraudDetectionSystem';
import BroadcastCenter from '../../components/admin/BroadcastCenter';
import AdminSettings from '../../components/admin/AdminSettings';
import InstituteManagement from '../../components/admin/InstituteManagement';
import UserManagement from '../../components/admin/UserManagement';
import TransactionManagement from '../../components/admin/TransactionManagement';
import VendorControlCenter from '../../components/admin/VendorControlCenter';
import FranchiseManagement from '../../components/admin/FranchiseManagement';
import ReportsAnalytics from '../../components/admin/ReportsAnalytics';
import NotificationManagement from '../../components/admin/NotificationManagement';
import KycApprovalManagement from '../../components/admin/KycApprovalManagement';
import AdminActivities from './AdminActivities';
import SearchAndFilter from '../shared/SearchAndFilter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Download, RefreshCw, Calendar, Filter } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import DataTable from '../shared/DataTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SummaryData {
  key: string;
  value: string;
  change: string;
  direction: 'up' | 'down' | 'neutral';
}

// Define the filter option type to match what SearchAndFilter expects
interface FilterOption {
  key: string;
  label: string;
  type: "select" | "date" | "text";
  options?: { value: string; label: string }[];
}

interface GlobalFilter {
  section: string;
  timeframe: string;
  status: string;
}

interface AdminTabContentProps {
  globalSearch?: string;
  globalFilters?: GlobalFilter;
  activeTab?: string;
}

const AdminTabContent = ({ globalSearch = '', globalFilters = { section: 'all', timeframe: 'all', status: 'all' }, activeTab = 'overview' }: AdminTabContentProps) => {
  const { toast } = useToast();
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [summaryData, setSummaryData] = useState<SummaryData[]>([
    { key: 'Total Institutes', value: '1,247', change: '+5', direction: 'up' },
    { key: 'Total Users', value: '45,290', change: '+128', direction: 'up' },
    { key: 'Total Revenue', value: '₹1.25 Cr', change: '+8.5%', direction: 'up' },
    { key: 'Pending KYC', value: '89', change: '-12', direction: 'down' },
    { key: 'Open Support Tickets', value: '45', change: '-5', direction: 'down' },
    { key: 'Fraud Alerts', value: '12', change: '+2', direction: 'up' }
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState('today');
  const [localSearch, setLocalSearch] = useState('');
  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});

  // Update the local timeframe when global timeframe changes
  useEffect(() => {
    if (globalFilters.timeframe !== 'all') {
      setTimeframe(globalFilters.timeframe);
    }
  }, [globalFilters]);
  
  // Update local search when global search changes
  useEffect(() => {
    if (globalSearch) {
      setLocalSearch(globalSearch);
    }
  }, [globalSearch]);

  useEffect(() => {
    // Set the initial "last updated" time
    updateTimestamp();
  }, []);

  const updateTimestamp = () => {
    const now = new Date();
    setLastUpdate(now.toLocaleTimeString());
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      // Update random values in the summary data to simulate data changes
      const updatedData = summaryData.map(item => {
        const changeValue = Math.floor(Math.random() * 10) - 5;
        const direction = changeValue >= 0 ? 'up' : 'down';
        return {
          ...item,
          change: changeValue >= 0 ? `+${changeValue}` : `${changeValue}`,
          direction: direction as 'up' | 'down' | 'neutral'
        };
      });
      
      setSummaryData(updatedData);
      updateTimestamp();
      setIsRefreshing(false);
      toast({
        title: "Dashboard Refreshed",
        description: "Latest data has been loaded.",
      });
    }, 1500);
  };

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    toast({
      title: "Timeframe Changed",
      description: `Dashboard data updated to show ${tf} metrics.`,
    });
  };

  const handleExportSummary = () => {
    // Generate detailed PDF report for summary data
    const doc = new jsPDF();
    
    // Set title
    doc.setFontSize(16);
    doc.text("Learn2Pay SuperAdmin Dashboard Summary", 14, 22);
    
    // Add timestamp
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Report Period: ${timeframe.replace('_', ' ')}`, 14, 36);
    
    // Add summary metrics table
    doc.setFontSize(13);
    doc.text("Dashboard Key Metrics", 14, 45);
    
    // Create table for summary metrics
    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Value', 'Change']],
      body: summaryData.map(item => [
        item.key,
        item.value,
        `${item.direction === 'up' ? '↑' : item.direction === 'down' ? '↓' : '–'} ${item.change}`
      ]),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }
    });
    
    // Add recent signups section
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text("Recent Signups", 14, finalY);
    
    autoTable(doc, {
      startY: finalY + 5,
      head: [['ID', 'Name', 'Location', 'Type', 'Date']],
      body: recentSignups.map(signup => [
        signup.id,
        signup.name,
        signup.location,
        signup.type,
        signup.date
      ]),
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] }
    });
    
    doc.save(`learn2pay-dashboard-summary-${new Date().toISOString().slice(0, 10)}.pdf`);
    
    toast({
      title: "Summary Report Generated",
      description: "Dashboard summary report has been downloaded.",
    });
  };

  const filterOptions: FilterOption[] = [
    {
      key: 'region',
      label: 'Region',
      type: 'select',
      options: [
        { value: 'all', label: 'All Regions' },
        { value: 'north', label: 'North' },
        { value: 'south', label: 'South' },
        { value: 'east', label: 'East' },
        { value: 'west', label: 'West' },
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'suspended', label: 'Suspended' },
      ]
    },
    {
      key: 'date',
      label: 'Date Range',
      type: 'date'
    }
  ];

  // Recent signups table data
  const recentSignups = [
    { id: 'USR001', name: 'ABC International School', location: 'Mumbai', type: 'Institute', date: '2023-06-10' },
    { id: 'USR002', name: 'XYZ Academy', location: 'Delhi', type: 'Institute', date: '2023-06-09' },
    { id: 'USR003', name: 'Priya Sharma', location: 'Bangalore', type: 'Student', date: '2023-06-09' },
    { id: 'USR004', name: 'Rahul Kumar', location: 'Chennai', type: 'Parent', date: '2023-06-08' },
  ];

  const signupColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'type', label: 'Type', sortable: true, 
      render: (value: string) => (
        <Badge className={
          value === 'Institute' ? 'bg-blue-500' : 
          value === 'Student' ? 'bg-green-500' : 
          'bg-purple-500'
        }>
          {value}
        </Badge>
      )
    },
    { key: 'date', label: 'Date', sortable: true }
  ];

  return (
    <>
      <TabsContent value="overview" className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">SuperAdmin Dashboard</h2>
            <div className="flex space-x-2 items-center">
              <div className="text-sm text-gray-400">
                Last updated: {lastUpdate}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-200 hover:bg-gray-700"
              onClick={handleExportSummary}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Summary
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Dashboard Summary</CardTitle>
              <CardDescription className="text-gray-400">Overview of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {summaryData.map((item, index) => (
                  <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">{item.key}</div>
                    <div className="text-xl font-bold text-white">{item.value}</div>
                    <div className={`text-xs flex items-center mt-1 ${
                      item.direction === 'up' ? 'text-green-400' : 
                      item.direction === 'down' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {item.direction === 'up' ? '↑' : item.direction === 'down' ? '↓' : '–'}
                      <span className="ml-1">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <SearchAndFilter 
          searchPlaceholder="Search across dashboard..."
          filterOptions={filterOptions}
          onSearch={(query) => {
            setLocalSearch(query);
            toast({
              title: "Search Initiated",
              description: `Searching for: ${query}`,
            });
          }}
          onFilter={(filters) => {
            setLocalFilters(filters);
            toast({
              title: "Filters Applied",
              description: `Applied ${Object.keys(filters).length} filters`,
            });
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminActivities />
          <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Recent Signups</CardTitle>
              <CardDescription className="text-gray-400">Latest users and institutes</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={signupColumns}
                data={recentSignups}
                pagination={true}
                pageSize={4}
                searchable={false}
                title="Recent Signups"
                exportFileName="learn2pay-recent-signups"
              />
            </CardContent>
          </Card>
        </div>

        <DashboardMetrics />
        <DashboardCharts />
      </TabsContent>

      <TabsContent value="institutes">
        <InstituteManagement />
      </TabsContent>

      <TabsContent value="users">
        <UserManagement />
      </TabsContent>

      <TabsContent value="transactions">
        <TransactionManagement />
      </TabsContent>

      <TabsContent value="vendors">
        <VendorControlCenter />
      </TabsContent>

      <TabsContent value="franchise">
        <FranchiseManagement />
      </TabsContent>

      <TabsContent value="reports">
        <ReportsAnalytics />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationManagement />
      </TabsContent>

      <TabsContent value="kyc-approvals">
        <KycApprovalManagement />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SecurityAuditLogs />
          <FraudDetectionSystem />
        </div>
      </TabsContent>

      <TabsContent value="broadcast">
        <BroadcastCenter />
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <AdminSettings />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserAccessControl />
          <BulkNotificationSystem />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveMonitoringPanel />
          <RoleManagement />
        </div>
      </TabsContent>
    </>
  );
};

export default AdminTabContent;
