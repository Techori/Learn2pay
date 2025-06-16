import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/shared/DashboardHeader";

// Import parent dashboard components
import DashboardStats from "../../components/parent-dashboard/DashboardStats";
import EmiSchedule from "../../components/parent-dashboard/EmiSchedule";
import Payment from "../../components/parent-dashboard/Payment";
import ChildProfile from "../../components/parent-dashboard/ChildProfile";
import AttendanceTracker from "../../components/parent-dashboard/AttendanceTracker";
import Settings from "../../components/parent-dashboard/Settings";

const Parent = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const { toast } = useToast();
  // Mock data updated for EMI model - in real app, this would come from API
  const parentData = {
    name: "Mr. Rajesh Sharma",
    parentId: "PAR2024001",
    school: "ABC Academy",
    contactInfo: {
      email: "rajesh.sharma@email.com",
      phone: "+91 9876543210",
    },
  };

  const childInfo = {
    name: "Aarav Sharma",
    studentId: "ABC2024001",
    class: "10th A",
    rollNumber: "15",
    admissionDate: "April 1, 2024",
    email: "aarav.sharma@email.com",
    phone: "9876543210",
    address: "123 Main Street, Mumbai, Maharashtra - 400001",
    attendance: 95,
    currentGrade: "A+",
    subjects: 8,
    status: "Active",
    school: "ABC Academy",
  };

  // Updated for EMI-based model
  const emiData = {
    nextEmiDue: 2500,
    dueDate: "June 15, 2025",
    totalPaid: 25000,
    pendingAmount: 15000,
    attendanceRate: 95,
    emiStatus: "Current",
  };

  // Learn2Pay plan information
  const learn2payInfo = {
    planType: "Education EMI Plan",
    totalAmount: 40000,
    emiAmount: 2500,
    tenure: "16 months",
    interestRate: 12.5,
  };

  // Updated EMI schedule with school fee coverage
  const emiSchedule = [
    {
      month: "January 2025",
      amount: 2500,
      status: "paid" as const,
      dueDate: "Jan 15",
      paidDate: "Jan 12",
      schoolFeeCovered: 2300,
    },
    {
      month: "February 2025",
      amount: 2500,
      status: "paid" as const,
      dueDate: "Feb 15",
      paidDate: "Feb 13",
      schoolFeeCovered: 2300,
    },
    {
      month: "March 2025",
      amount: 2500,
      status: "paid" as const,
      dueDate: "Mar 15",
      paidDate: "Mar 14",
      schoolFeeCovered: 2300,
    },
    {
      month: "April 2025",
      amount: 2500,
      status: "paid" as const,
      dueDate: "Apr 15",
      paidDate: "Apr 12",
      schoolFeeCovered: 2300,
    },
    {
      month: "May 2025",
      amount: 2500,
      status: "paid" as const,
      dueDate: "May 15",
      paidDate: "May 13",
      schoolFeeCovered: 2300,
    },
    {
      month: "June 2025",
      amount: 2500,
      status: "due" as const,
      dueDate: "Jun 15",
      paidDate: null,
      schoolFeeCovered: 2300,
    },
    {
      month: "July 2025",
      amount: 2500,
      status: "upcoming" as const,
      dueDate: "Jul 15",
      paidDate: null,
      schoolFeeCovered: 2300,
    },
    {
      month: "August 2025",
      amount: 2500,
      status: "upcoming" as const,
      dueDate: "Aug 15",
      paidDate: null,
      schoolFeeCovered: 2300,
    },
  ];
  // Updated transaction history for EMI payments to Learn2Pay
  // const transactionHistory = [
  //   {
  //     id: "TXN001",
  //     date: "2025-05-13",
  //     type: "emi" as const,
  //     amount: 2500,
  //     method: "Auto-Debit",
  //     status: "Paid" as const,
  //     transactionId: "L2P123456789",
  //     schoolFeeCovered: 2300,
  //   },
  //   {
  //     id: "TXN002",
  //     date: "2025-04-12",
  //     type: "emi" as const,
  //     amount: 2500,
  //     method: "UPI",
  //     status: "Paid" as const,
  //     transactionId: "L2P987654321",
  //     schoolFeeCovered: 2300,
  //   },
  //   {
  //     id: "TXN003",
  //     date: "2025-03-14",
  //     type: "emi" as const,
  //     amount: 2500,
  //     method: "Net Banking",
  //     status: "Paid" as const,
  //     transactionId: "L2P456789123",
  //     schoolFeeCovered: 2300,
  //   },
  //   {
  //     id: "TXN004",
  //     date: "2025-06-15",
  //     type: "emi" as const,
  //     amount: 2500,
  //     method: "Auto-Debit",
  //     status: "Due" as const,
  //     transactionId: null,
  //     schoolFeeCovered: 2300,
  //   },
  // ];
  const attendanceData = [
    { month: "May 2025", present: 22, total: 23, percentage: 95.7 },
    { month: "April 2025", present: 20, total: 21, percentage: 95.2 },
    { month: "March 2025", present: 21, total: 22, percentage: 95.5 },
    { month: "February 2025", present: 19, total: 20, percentage: 95.0 },
  ];

  // Updated notifications for EMI model
  const notifications = [
    {
      id: 1,
      title: "EMI Payment Due",
      message: "Your EMI of ₹2,500 to Learn2Pay is due on June 15, 2025",
      type: "warning" as const,
      time: "6 days remaining",
      read: false,
    },
    {
      id: 2,
      title: "School Fee Covered",
      message: "Learn2Pay has successfully paid ₹2,300 school fee for May 2025",
      type: "success" as const,
      time: "1 week ago",
      read: false,
    },
    {
      id: 3,
      title: "Auto-Debit Setup Successful",
      message: "Your auto-debit for EMI payments has been activated",
      type: "success" as const,
      time: "2 weeks ago",
      read: true,
    },
    {
      id: 4,
      title: "Attendance Alert",
      message: "Your child was absent on June 5, 2025",
      type: "info" as const,
      time: "4 days ago",
      read: true,
    },
  ];

  const mockUser = {
    name: parentData.name,
    email: parentData.contactInfo.email,
    phone: parentData.contactInfo.phone,
    role: "Parent",
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

  const parentBadges = [
    { text: childInfo.class },
    { text: childInfo.school, isPrimary: true },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <DashboardStats emiData={emiData} />;
      case "childProfile":
        return (
          <ChildProfile
            childInfo={childInfo}
            parentData={parentData}
            learn2payInfo={learn2payInfo}
          />
        );
      case "emiSchedule":
        return <EmiSchedule emiSchedule={emiSchedule} emiData={emiData} />;
      case "payments":
        return <Payment />;
      case "attendance":
        return <AttendanceTracker attendanceData={attendanceData} />;
      case "notifications":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 mb-3 border ${
                  notification.read ? "border-gray-700" : "border-orange-500"
                } rounded-lg bg-slate-800/50`}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-sm text-gray-400">
                    {notification.time}
                  </span>
                </div>
                <p className="text-gray-300 mt-1">{notification.message}</p>
              </div>
            ))}
          </div>
        );
      case "settings":
        return <Settings parentData={parentData} />;
      default:
        return <DashboardStats emiData={emiData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardHeader
        dashboardName="Parent"
        badges={parentBadges}
        user={mockUser}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* School Info */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">
                  {parentData.school}
                </h1>
                <p className="text-gray-400">
                  Parent ID: {parentData.parentId}
                </p>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg text-white text-sm transition-colors">
                <svg
                  className="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Contact School
              </Button>
            </div>
          </div>
        </motion.div>
        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-500/30 rounded-lg p-6">
              <div className="flex items-center">
                <div className="text-pink-400 mr-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>{" "}
                <div>
                  <h3 className="text-white font-medium">Contact School</h3>
                  <p className="text-gray-300 text-sm">
                    Send message to teacher
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-500/30 rounded-lg p-6">
              <div className="flex items-center">
                <div className="text-teal-400 mr-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">
                    Pay EMI to Learn2Pay
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Make your monthly EMI payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Navigation Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex space-x-1 bg-slate-800/30 p-1 rounded-lg">
            {" "}
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "childProfile", label: "Child Profile" },
              { id: "emiSchedule", label: "EMI Schedule" },
              { id: "payments", label: "Payment History" },
              { id: "attendance", label: "Attendance" },
              { id: "notifications", label: "Notifications" },
              { id: "settings", label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTab === tab.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Parent;
