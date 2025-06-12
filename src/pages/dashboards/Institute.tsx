import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { LogOut, LayoutDashboard, Building2, Wallet, DollarSign, Link, QrCode, FileText, Users, GraduationCap, Briefcase, MapPin, Settings } from 'lucide-react';
import UserProfile from '../../components/shared/UserProfile';
import NotificationCenter from '../../components/shared/NotificationCenter';
import InstituteDashboardOverview from '../../components/institute/dashboard/InstituteDashboardOverview';
import MultiInstituteManagement from '../../components/institute/multi-institute/MultiInstituteManagement';
import FeeManagement from '../../components/institute/finance/FeeManagement';
import PaymentManagement from '../../components/institute/finance/PaymentManagement';
import PaymentLinksManagement from '../../components/institute/finance/PaymentLinksManagement';
import QRTransactionManagement from '../../components/institute/finance/QRTransactionManagement';
import ReportsAndAnalytics from '../../components/institute/reports/ReportsAndAnalytics';
import UserManagement from '../../components/institute/users/UserManagement';
import StudentManagement from '../../components/institute/students/StudentManagement';
import StaffManagement from '../../components/institute/staff/StaffManagement';
import BranchManagement from '../../components/institute/branches/BranchManagement';
import InstituteSettings from '../../components/institute/settings/InstituteSettings';

const Institute = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const mockUser = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@institute.com',
    phone: '+91 9876543210',
    role: 'Institute Admin',
    avatar: '',
    address: 'Anup nagar',
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logged out");
  };

  const handleUserUpdate = () => {
    // Implement user update logic here
    console.log("User profile updated");
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
              <span className="text-white">2PAY</span> | Institute Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">
                AY 20-21
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                AY 21-22
              </span>
            </div>
            <Button variant="outline" size="sm" className="text-gray-300 border-gray-700 hover:bg-gray-800/10">
              Filters
            </Button>
            <div className="relative">
                <select className="bg-gray-800 text-white p-2 rounded-md appearance-none pr-8">
                    <option>National Public School - Main Campus</option>
                    <option>National Public School - Branch 2</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 text-orange-500 border-orange-500 hover:bg-orange-500/10">
                <Building2 className="h-4 w-4" />
                <span>Add Institute</span>
            </Button>
            <div className="relative">
                <NotificationCenter />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-12 bg-gray-800 p-1 rounded-md overflow-x-auto justify-start">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <LayoutDashboard className="h-4 w-4" />
                <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="multi-institute" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <Building2 className="h-4 w-4" />
                <span>Multi-Institute</span>
            </TabsTrigger>
            <TabsTrigger value="fee-management" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <Wallet className="h-4 w-4" />
                <span>Fee Management</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <DollarSign className="h-4 w-4" />
                <span>Payments</span>
            </TabsTrigger>
            <TabsTrigger value="payment-links" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <Link className="h-4 w-4" />
                <span>Payment Links</span>
            </TabsTrigger>
            <TabsTrigger value="qr-transaction" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <QrCode className="h-4 w-4" />
                <span>QR Transaction</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <FileText className="h-4 w-4" />
                <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="manage-users" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <Users className="h-4 w-4" />
                <span>Manage Users</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <GraduationCap className="h-4 w-4" />
                <span>Students</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <Briefcase className="h-4 w-4" />
                <span>Staff</span>
            </TabsTrigger>
            <TabsTrigger value="branches" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <MapPin className="h-4 w-4" />
                <span>Branches</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <InstituteDashboardOverview />
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
          <TabsContent value="branches">
            <BranchManagement />
          </TabsContent>
          <TabsContent value="settings">
            <InstituteSettings />
          </TabsContent>
          {/* Add other TabsContent components here for other sections */}
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Institute;
