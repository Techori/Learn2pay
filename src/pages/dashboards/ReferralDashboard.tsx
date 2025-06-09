import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import ReferralSidebar from '@/components/ReferralSidebar';
import ReferralTabContent from '@/components/referral/ReferralTabContent';
import UserProfile from '@/components/shared/UserProfile';
import NotificationCenter from '@/components/shared/NotificationCenter';
import QuickActions from '@/components/shared/QuickActions';
import { useToast } from '@/hooks/use-toast';

const ReferralDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  const mockUser = {
    name: 'Referral Partner',
    email: 'referral@edutech.com',
    phone: '+91 9876543210',
    role: 'Referral Partner',
    avatar: '',
    address: 'Mumbai, Maharashtra'
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
    <div className="min-h-screen bg-gray-50 flex">
      <ReferralSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Referral Partner Dashboard</h1>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">This Month</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Nov 2024</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <NotificationCenter />
              <UserProfile user={mockUser} onUpdate={handleUserUpdate} />
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 text-red-600 border-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <QuickActions role="referral" />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="add-referrals">Add Referrals</TabsTrigger>
              <TabsTrigger value="revenue-tracking">Revenue</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <ReferralTabContent />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;
