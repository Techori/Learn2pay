import  { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import AdminStats from '../components/admin/AdminStats';
import AdminTabContent from '../components/admin/AdminTabContent';
import QuickActions from '../components/shared/QuickActions';
import { useToast } from '../hooks/use-toast';
import DashboardHeader from '../components/shared/DashboardHeader';

interface GlobalFilter {
  section: string;
  timeframe: string;
  status: string;
}

const SuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalFilters, setGlobalFilters] = useState<GlobalFilter>({
    section: 'all',
    timeframe: 'all',
    status: 'all'
  });
  const { toast } = useToast();

  const mockUser = {
    name: 'Admin User',
    email: 'admin@edutech.com',
    phone: '+91 9876543210',
    role: 'Super Admin',
    avatar: '',
    address: 'Corporate Office, Mumbai'
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

  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('admin-tab-change', handleTabChange as EventListener);
    
    return () => {
      window.removeEventListener('admin-tab-change', handleTabChange as EventListener);
    };
  }, []);

  // Effect to handle search term changes
  useEffect(() => {
    if (searchTerm.length > 2) {
      // Apply global search across the dashboard
      // This would typically trigger an API call or filter data client-side
      console.log(`Searching across dashboard for: ${searchTerm}`);
    }
  }, [searchTerm]);

  // Effect to handle filter changes
  useEffect(() => {
    // Apply global filters across the dashboard
    // This would typically trigger an API call or filter data client-side
    console.log('Global filters changed:', globalFilters);
  }, [globalFilters]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  
  const handleFilterChange = (section: string, timeframe: string, status: string) => {
    setGlobalFilters({
      section,
      timeframe,
      status
    });
    
    toast({
      title: "Global Filters Applied",
      description: `Filters: ${section}, ${timeframe}, ${status}`,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] flex flex-col">
      <DashboardHeader
        dashboardName="Super Admin"
        badges={[]}
        user={mockUser}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />

      <div className="flex-1 overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <QuickActions role="admin" />
          </div>
          
          <AdminStats filters={globalFilters} />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-9 gap-x-2 bg-gray-200 dark:bg-slate-800 rounded-lg mb-4">
              <TabsTrigger 
                value="dashboard"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="institutes"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Institutes & Franchise
              </TabsTrigger>
              <TabsTrigger 
                value="users"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="kyc-approvals"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                KYC Approvals
              </TabsTrigger>
              <TabsTrigger 
                value="transactions"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Transactions
              </TabsTrigger>
              <TabsTrigger 
                value="reports"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Reports & Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="notifications"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Notifications & Broadcast
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <AdminTabContent 
              globalSearch={searchTerm}
              globalFilters={globalFilters}
              activeTab={activeTab}
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
