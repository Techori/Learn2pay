import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs";
import { Button } from "../../components/ui/Button";
import { LogOut } from "lucide-react";
import ReferralTabContent from "../../components/referral/ReferralTabContent";
import UserProfile from "../../components/shared/UserProfile";
import NotificationCenter from "../../components/shared/NotificationCenter";
import QuickActions from "../../components/shared/QuickActions";
import { useToast } from "../../hooks/use-toast";
import { motion } from "framer-motion";

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

  const handleUserUpdate = () => {
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
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-white">
              <span className="text-orange-500">LEARN</span>
              <span className="text-white">2PAY</span> | Referral Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">
                This Month
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                Nov 2024
              </span>
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
          <QuickActions role="referral" />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-7 bg-gray-800 p-1 rounded-md">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="add-referrals"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Add Referrals
            </TabsTrigger>
            <TabsTrigger
              value="revenue-tracking"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger
              value="payouts"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Payouts
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
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
