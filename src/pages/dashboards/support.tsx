import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import SupportTabContent from "@/components/support-dashboard/SupportTabContent";
import QuickActions from "@/components/shared/QuickActions";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import DashboardHeader from "@/components/shared/DashboardHeader";

const SupportDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const mockUser = {
    name: "Support Team Lead",
    email: "support@edutech.com",
    phone: "+91 9876543210",
    role: "Support Team",
    avatar: "",
    address: "Support Center, Mumbai",
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

  const supportBadges = [
    { text: "Active" },
    { text: "Support Center", isPrimary: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <DashboardHeader
        dashboardName="Support"
        badges={supportBadges}
        user={mockUser}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />

      <div className="p-6 overflow-y-auto">
        <div className="mb-6">
          <QuickActions role="support" />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 bg-gray-800 p-1 rounded-md">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Tickets
            </TabsTrigger>
            <TabsTrigger
              value="institutes"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Institutes
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <SupportTabContent />
        </Tabs>
      </div>
    </motion.div>
  );
};

export default SupportDashboard;
