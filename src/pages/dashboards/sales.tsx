import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs";
import { Button } from "../../components/ui/Button";
import { LogOut } from 'lucide-react';
// import SalesSidebar from '@/components/SalesSidebar';
import SalesTabContent from '../../components/sales/SalesTabContent';
import UserProfile from '@/components/shared/UserProfile';
import NotificationCenter from '@/components/shared/NotificationCenter';
import QuickActions from '@/components/shared/QuickActions';
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from '@/components/shared/DashboardHeader';

const Sales = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  const mockUser = {
    name: 'Sales Manager',
    email: 'sales@edutech.com',
    phone: '+91 9876543210',
    role: 'Sales Team Lead',
    avatar: '',
    address: 'Sales Office, Mumbai'
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleUserUpdate = (updatedUser: any) => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-[#101624] flex flex-col">
      <DashboardHeader
        dashboardName="Sales"
        badges={[{ text: 'This Month' }, { text: 'Nov 2024', isPrimary: true }]}
        user={mockUser}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />
      
      <div className="flex-1 overflow-hidden">

        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <QuickActions role="sales" />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-[#232b45] border border-[#232b45] rounded-lg mb-4">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300">Dashboard</TabsTrigger>
              <TabsTrigger value="leads" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300">Leads</TabsTrigger>
              <TabsTrigger value="onboarding" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300">Onboarding</TabsTrigger>
              <TabsTrigger value="targets" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300">Targets</TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300">Reports</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300">Settings</TabsTrigger>
            </TabsList>

            <SalesTabContent />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Sales;
