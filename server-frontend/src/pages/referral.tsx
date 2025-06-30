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

  const referralBadges = [
    { text: "This Month" },
    { text: "Nov 2024", isPrimary: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background-color text-text-color"
    >
      <DashboardHeader
        dashboardName="Referral"
        badges={referralBadges}
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
          <TabsList className="grid w-full grid-cols-7 bg-card-bg p-1 rounded-md border-border-color">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="add-referrals"
              className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
            >
              Add Referrals
            </TabsTrigger>
            <TabsTrigger
              value="revenue-tracking"
              className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger
              value="payouts"
              className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
            >
              Payouts
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-warning data-[state=active]:text-white text-text-color"
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
