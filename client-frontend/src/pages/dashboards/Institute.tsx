import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/Tabs";
import { Button } from "../../components/ui/Button";
import {
  LayoutDashboard,
  Building2,
  Wallet,
  DollarSign,
  Link,
  QrCode,
  FileText,
  Users,
  GraduationCap,
  Briefcase,
  Settings,
} from "lucide-react";
import InstituteDashboardOverview from "../../components/institute-dashboard/dashboard/InstituteDashboardOverview";
import MultiInstituteManagement from "../../components/institute-dashboard/multi-institute/MultiInstituteManagement";
import FeeManagement from "../../components/institute-dashboard/finance/FeeManagement";
import PaymentManagement from "../../components/institute-dashboard/finance/PaymentManagement";
import PaymentLinksManagement from "../../components/institute-dashboard/finance/PaymentLinksManagement";
import QRTransactionManagement from "../../components/institute-dashboard/finance/QRTransactionManagement";
import ReportsAndAnalytics from "../../components/institute-dashboard/reports/ReportsAndAnalytics";
import UserManagement from "../../components/institute-dashboard/users/UserManagement";
import StudentManagement from "../../components/institute-dashboard/students/StudentManagement";
import StaffManagement from "../../components/institute-dashboard/staff/StaffManagement";
import InstituteSettings from "../../components/institute-dashboard/settings/InstituteSettings";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { useToast } from "@/hooks/use-toast";

const Institute = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("analytics");

  const handleQuickActionRedirect = (tabName: string) => {
    setActiveTab(tabName);
  };

  const mockUser = {
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@institute.com",
    phone: "+91 9876543210",
    role: "Institute Admin",
    avatar: "",
    address: "Anup nagar",
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

  const instituteBadges = [
    { text: "AY 20-21" },
    { text: "AY 21-22", isPrimary: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <DashboardHeader
        dashboardName="Institute"
        badges={instituteBadges}
        user={mockUser}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />

      <div className="p-6 overflow-y-auto">
        {/* Institute selector and add institute button */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <select className="bg-gray-800 text-white p-2 rounded-md appearance-none pr-8">
              <option>National Public School - Main Campus</option>
              <option>National Public School - Branch 2</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 text-orange-500 border-orange-500 hover:bg-orange-500/10"
            onClick={() => setActiveTab("multi-institute")}
          >
            <Building2 className="h-4 w-4" />
            <span>Add Institute</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-300 border-gray-700 hover:bg-gray-800/10"
          >
            Filters
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-11 bg-gray-800 p-1 rounded-md overflow-x-auto justify-start">
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger
              value="multi-institute"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <Building2 className="h-4 w-4" />
              <span>Multi-Institute</span>
            </TabsTrigger>
            <TabsTrigger
              value="fee-management"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <Wallet className="h-4 w-4" />
              <span>Fee Management</span>
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <DollarSign className="h-4 w-4" />
              <span>Payments</span>
            </TabsTrigger>
            <TabsTrigger
              value="payment-links"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <Link className="h-4 w-4" />
              <span>Payment Links</span>
            </TabsTrigger>
            <TabsTrigger
              value="qr-transaction"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <QrCode className="h-4 w-4" />
              <span>QR Transaction</span>
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger
              value="manage-users"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <Users className="h-4 w-4" />
              <span>Manage Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger
              value="staff"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <Briefcase className="h-4 w-4" />
              <span>Staff</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <InstituteDashboardOverview
              onQuickActionClick={handleQuickActionRedirect}
            />
          </TabsContent>
          <TabsContent value="multi-institute">
            <MultiInstituteManagement />
          </TabsContent>
          <TabsContent value="fee-management">
            <FeeManagement />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentManagement />
          </TabsContent>
          <TabsContent value="payment-links">
            <PaymentLinksManagement />
          </TabsContent>
          <TabsContent value="qr-transaction">
            <QRTransactionManagement />
          </TabsContent>
          <TabsContent value="reports">
            <ReportsAndAnalytics />
          </TabsContent>
          <TabsContent value="manage-users">
            <UserManagement />
          </TabsContent>
          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>
          <TabsContent value="staff">
            <StaffManagement />
          </TabsContent>
          <TabsContent value="settings">
            <InstituteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Institute;
