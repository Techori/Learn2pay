import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import SupportTabContent from '@/components/support/SupportTabContent';
import UserProfile from '@/components/shared/UserProfile';
import NotificationCenter from '@/components/shared/NotificationCenter';
import QuickActions from '@/components/shared/QuickActions';
import { useToast } from '@/hooks/use-toast';
import SupportSidebar from '@/components/SupportSidebar';

const SupportDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  const mockUser = {
    name: 'Support Team Lead',
    email: 'support@edutech.com',
    phone: '+91 9876543210',
    role: 'Support Team',
    avatar: '',
    address: 'Support Center, Mumbai'
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
      <SupportSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Support Dashboard</h1>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">Active</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Support Center</span>
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
            <QuickActions role="support" />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="institutes">Institutes</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <SupportTabContent />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
