import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import SupportTabContent from "@/components/support-dashboard/SupportTabContent";
import QuickActions from "@/components/shared/QuickActions";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import DashboardHeader from "@/components/shared/DashboardHeader";

const SupportDashboard = ({ role = "lead" }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const mockUser = {
    name: role === "lead" ? "Support Team Lead" : "Support Team Member",
    email: role === "lead" ? "support@edutech.com" : "member@edutech.com",
    phone: "+91 9876543210",
    role: role === "lead" ? "Support Team" : "Support Team Member",
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
      className="min-h-screen bg-background text-text"
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
          <TabsList className="grid w-full grid-cols-7 bg-card-bg p-1 rounded-md">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="institutes">Institutes</TabsTrigger>
            {role === "lead" && (
              <TabsTrigger value="users">Users</TabsTrigger>
            )}
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="emi-reminders">EMI Reminders</TabsTrigger>
          </TabsList>

          <SupportTabContent role={role} user={mockUser} />
        </Tabs>
      </div>
    </motion.div>
  );
};

export default SupportDashboard;
