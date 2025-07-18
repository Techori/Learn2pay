import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import ReferralTabContent from "../components/referral-dashboard/ReferralTabContent";
import QuickActions from "../components/shared/QuickActions";
import { useToast } from "../hooks/use-toast";
import { motion } from "framer-motion";
import DashboardHeader from "../components/shared/DashboardHeader";

const ReferralDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const mockUser = {
    name: "Referral Partner",
    email: "referral@edutech.com",
    phone: "+91 9876543210",
    role: "Referral Partner",
    avatar: "",
    address: "Mumbai, Maharashtra",
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background-color text-text-color"
    >
      <DashboardHeader
        dashboardName="Referral"
        badges={[]}
        user={mockUser}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />

      <div className="p-6 overflow-y-auto">
        <div className="mb-6">
          <QuickActions role="referral" />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-7 bg-gray-200 dark:bg-slate-800 rounded-md">
            <TabsTrigger
              value="dashboard"
              className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="add-referrals"
              className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Add Referrals
            </TabsTrigger>
            <TabsTrigger
              value="revenue-tracking"
              className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger
              value="payouts"
              className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Payouts
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <ReferralTabContent />
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ReferralDashboard;
