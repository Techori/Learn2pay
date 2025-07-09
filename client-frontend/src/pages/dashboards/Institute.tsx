import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
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
  Settings,
} from "lucide-react";
import InstituteDashboardOverview from "@/components/institute-dashboard/dashboard/InstituteDashboardOverview";
import MultiInstituteManagement from "@/components/institute-dashboard/multi-institute/MultiInstituteManagement";
import FeeManagement from "@/components/institute-dashboard/finance/FeeManagement";
import PaymentManagement from "@/components/institute-dashboard/finance/PaymentManagement";
import PaymentLinksManagement from "@/components/institute-dashboard/finance/PaymentLinksManagement";
import QRTransactionManagement from "@/components/institute-dashboard/finance/QRTransactionManagement";
import ReportsAndAnalytics from "@/components/institute-dashboard/reports/ReportsAndAnalytics";
import UserManagement from "@/components/institute-dashboard/users/UserManagement";
import StudentManagement from "@/components/institute-dashboard/students/StudentManagement";
import InstituteSettings from "@/components/institute-dashboard/settings/InstituteSettings";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { useToast } from "@/hooks/use-toast";
import {authAPI } from "@/utils/api";

const Institute = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [studentSubTab, setStudentSubTab] = useState("all-students");

  // useEffect(() => {
  //   const checkKycStatus = async () => {
  //     try {
  //       const response = await authAPI.getKycStatus();
  //       if (response.kycStatus !== 'verified') {
  //         navigate('/kyc');
  //       }
  //     } catch (error) {
  //       toast({
  //         title: "Error",
  //         description: "Failed to check KYC status",
  //         variant: "destructive",
  //       });
  //       navigate('/kyc');
  //     }
  //   };
  //   checkKycStatus();
  // }, [navigate, toast]);

  const handleQuickActionRedirect = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleStudentAction = (action: string) => {
    setStudentSubTab(action);
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-white"
    >
      <DashboardHeader dashboardName="Institute" />

      <div className="p-6 overflow-y-hidden">

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-md overflow-x-auto overflow-y-hidden whitespace-nowrap">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Overview</span>
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
              value="settings"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <InstituteDashboardOverview
              onQuickActionClick={handleQuickActionRedirect}
              onStudentAction={handleStudentAction}
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
            <StudentManagement
              initialSubTab={studentSubTab}
              onSubTabChange={setStudentSubTab}
            />
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