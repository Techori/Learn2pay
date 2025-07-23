import { useState,useEffect } from "react";
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
  Shield,
  AlertCircle,
    IndianRupee,

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
import { authAPI } from "@/utils/api";

const Institute = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [studentSubTab, setStudentSubTab] = useState("all-students");
  const [kycStatus, setKycStatus] = useState<string>("not started");
  const [showKycAlert, setShowKycAlert] = useState(false);

  useEffect(() => {
    checkKycStatus();
  }, []);

  const checkKycStatus = async () => {
    try {
      const response = await authAPI.getKycStatus();
      if (response.kycStatus) {
        setKycStatus(response.kycStatus);
        setShowKycAlert(response.kycStatus !== 'verified' && response.kycStatus !== 'approved');
      }
    } catch (error) {
      console.error("Failed to check KYC status:", error);
      setShowKycAlert(true);
    }
  };

  const handleQuickActionRedirect = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleStudentAction = (action: string) => {
    setStudentSubTab(action);
  };

  const getKycButtonText = () => {
    switch (kycStatus) {
      case 'verified':
      case 'approved':
        return 'KYC Verified';
      case 'pending':
        return 'KYC Pending';
      case 'rejected':
        return 'KYC Rejected - Retry';
      default:
        return 'Complete KYC';
    }
  };

  const getKycButtonVariant = () => {
    switch (kycStatus) {
      case 'verified':
      case 'approved':
        return 'outline';
      case 'rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-white"
    >
      <DashboardHeader dashboardName="Institute" kycStatus={kycStatus} />

      {showKycAlert && (
        <div className="bg-orange-100 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 mx-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  KYC Verification Required
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Complete your KYC verification to access all features. Status: {kycStatus}
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/kyc')}
              variant={getKycButtonVariant() as any}
              size="sm"
              className="ml-4"
            >
              <Shield className="h-4 w-4 mr-2" />
              {getKycButtonText()}
            </Button>
          </div>
        </div>
      )}

      <div className="p-6 overflow-y-hidden">

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6 "
        >
          <TabsList className="flex bg-gray-300  dark:bg-gray-800 p-1 rounded-md overflow-x-auto overflow-y-hidden whitespace-nowrap">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300 
"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            {/* <TabsTrigger
              value="multi-institute"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
            >
              <Building2 className="h-4 w-4" />
              <span>Multi-Institute</span>
            </TabsTrigger> */}
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300
"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger
              value="fee-management"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300
"
            >
              <Wallet className="h-4 w-4" />
              <span>Fee Management</span>
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300 
"
            >
              <IndianRupee className="h-4 w-4" />
              <span>Payments</span>
            </TabsTrigger>
            <TabsTrigger
              value="payment-links"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300 
"
            >
              <Link className="h-4 w-4" />
              <span>Payment Links</span>
            </TabsTrigger>
            <TabsTrigger
              value="qr-transaction"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300 
"
            >
              <QrCode className="h-4 w-4" />
              <span>QR Transaction</span>
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300 
"
            >
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger
              value="manage-users"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300 
"
            >
              <Users className="h-4 w-4" />
              <span>Manage Users</span>
            </TabsTrigger>
            
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md text-gray-800 dark:text-gray-300 
"
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
          {/* <TabsContent value="multi-institute">
            <MultiInstituteManagement />
          </TabsContent> */}
          <TabsContent value="students">
            <StudentManagement
              initialSubTab={studentSubTab}
              onSubTabChange={setStudentSubTab}
            />
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
          
          <TabsContent value="settings">
            <InstituteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Institute;
