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
    <div className="min-h-screen bg-[#101624] flex">
      {/* <SalesSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      /> */}
      
      <div className="flex-1 overflow-hidden">
        <header className="bg-[#181f32] border-b border-[#232b45] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white">
                 <span className="text-orange-500">LEARN</span>
                 <span className="text-white">2PAY</span>
             </h1>
              <span className="text-white text-xl font-semibold">| Sales Dashboard</span>
              <div className="flex items-center space-x-2 ml-4">
                <span className="bg-[#232b45] text-gray-300 px-3 py-1 rounded text-sm">This Month</span>
                <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Nov 2024</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <NotificationCenter />
              <UserProfile user={mockUser} onUpdate={handleUserUpdate} />
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 text-orange-500 border-orange-500 hover:bg-orange-500/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

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
