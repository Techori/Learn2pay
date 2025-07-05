import React, { useState, useEffect } from 'react';
import { TabsContent } from "../../components/ui/Tabs";
import DashboardOverview from './DashboardOverview';
import UserAccessControl from '../../components/admin/UserAccessControl';
import BulkNotificationSystem from '../../components/admin/BulkNotificationSystem';
import LiveMonitoringPanel from '../../components/admin/LiveMonitoringPanel';
import RoleManagement from '../../components/admin/RoleManagement';
import SecurityAuditLogs from '../../components/admin/SecurityAuditLogs';
import FraudDetectionSystem from '../../components/admin/FraudDetectionSystem';
import AdminSettings from '../../components/admin/AdminSettings';
import InstituteManagement from '../../components/admin/InstituteManagement';
import UserManagement from '../../components/admin/UserManagement';
import TransactionManagement from '../../components/admin/TransactionManagement';

import ReportsAnalytics from '../../components/admin/ReportsAnalytics';
import NotificationManagement from '../../components/admin/NotificationManagement';
import KycApprovalManagement from '../../components/admin/KycApprovalManagement';

import { useToast } from "../../hooks/use-toast";

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

const AdminTabContent = ({ globalSearch = '', globalFilters = { section: 'all', timeframe: 'all', status: 'all' }, activeTab = 'dashboard' }: AdminTabContentProps) => {
  const { toast } = useToast();
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Set the initial "last updated" time and update periodically
    updateTimestamp();
    const interval = setInterval(updateTimestamp, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const updateTimestamp = () => {
    const now = new Date();
    setLastUpdate(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsRefreshing(false);
      updateTimestamp();
      toast({
        title: "Dashboard Refreshed",
        description: "Latest data has been loaded.",
      });
    }, 1500);
  };

  return (
    <>
      {/* <TabsContent value="overview" className="space-y-6">
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
            >
              <Download className="h-4 w-4 mr-2" />
              Export Summary
            </Button>
          </div>

          <DashboardOverview />
        </div>
      </TabsContent> */}

      <TabsContent value="dashboard">
        <DashboardOverview />
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

      {/* <TabsContent value="vendors">
        <VendorControlCenter />
      </TabsContent> */}
{/* 
      <TabsContent value="franchise">
        <FranchiseManagement />
      </TabsContent> */}

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

      {/* <TabsContent value="broadcast">
        <BroadcastCenter />
      </TabsContent> */}

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