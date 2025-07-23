import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Bell, Settings, User, ChevronDown, Sun, Moon,Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link,useNavigate } from "react-router-dom";
import ThemeToggle from "../Themetoggle";
interface DashboardHeaderProps {
  dashboardName?: string;
  kycStatus?: string;
  onLogout?: () => void;
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dashboardName,
  kycStatus = "not started",
  onLogout,
  className = "",
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { institute, parent, userType, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentUser = institute || parent;
  const userName = institute?.name || parent?.parentName || "User";
  const userEmail = institute?.email || parent?.parentEmail || "";
  const userRole = userType === "institute" ? "Institute" : "Parent";
  const defaultDashboardName =
    userType === "institute" ? "Institute" : "Parent";

  const handleLogout = async () => {
    await (onLogout || logout)();
    setIsProfileMenuOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Mock notifications - in real app, these would come from API
  const notifications = [
    {
      id: 1,
      title: "Payment Due",
      message: "EMI payment due in 3 days",
      time: "2 hours ago",
      type: "warning",
      unread: true,
    },
    {
      id: 2,
      title: "Profile Updated",
      message: "Your profile information has been updated",
      time: "1 day ago",
      type: "success",
      unread: true,
    },
    {
      id: 3,
      title: "Welcome!",
      message: "Welcome to Larn2Pay dashboard",
      time: "3 days ago",
      type: "info",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gradient-to-r dark:from-black/95 dark:to-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800/50 shadow-lg ${className}`}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Dashboard Title */}
          <div className="flex items-center space-x-4">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-gray-900 dark:text-white flex items-center"
            >
              <Link to="/" className="flex items-center">
                <motion.div
                  className="text-xl sm:text-2xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-orange-500">LARN</span>
                  <span className="text-gray-900 dark:text-white">2PAY</span>
                </motion.div>
              </Link>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-gray-700 dark:text-gray-200">
                {dashboardName || defaultDashboardName} Dashboard
              </span>
            </motion.h1>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2"
            >
              <span className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-200 dark:border-green-500/30">
                ● Active
              </span>
              {userType === "parent" && (
                <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-500/30">
                  Student Parent
                </span>
              )}
            </motion.div>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-3">
            {/* KYC Status Button - Only show for institutes */}
            {userType === "institute" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/kyc')}
                className={`flex items-center space-x-2 p-2 transition-colors duration-200 rounded-lg
                  ${kycStatus === "verified"
                    ? "text-green-400 bg-green-800/30 hover:text-white hover:bg-green-700/60"
                    : "text-gray-400 bg-gray-800/50 hover:text-white hover:bg-gray-700/60"
                  }`}
                title="KYC Status"
              >
                <Shield size={20} />
                <span className="hidden sm:inline text-sm">
                  {kycStatus === "verified" ? "KYC Verified" : "KYC Not Verified"}
                </span>
              </motion.button>
            )}

            {/* Dark Mode Toggle */}
<ThemeToggle />

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 rounded-lg"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700/50 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700/50">
                      <h3 className="text-gray-900 dark:text-white font-semibold">
                        Notifications
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        You have {unreadCount} unread notifications
                      </p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{
                            backgroundColor: "rgba(75, 85, 99, 0.1)",
                          }}
                          className={`px-4 py-3 border-b border-gray-200 dark:border-gray-700/30 last:border-b-0 cursor-pointer ${
                            notification.unread ? "bg-orange-50 dark:bg-orange-500/5" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === "warning"
                                  ? "bg-yellow-500 dark:bg-yellow-400"
                                  : notification.type === "success"
                                  ? "bg-green-500 dark:bg-green-400"
                                  : "bg-blue-500 dark:bg-blue-400"
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-gray-900 dark:text-white text-sm font-medium">
                                {notification.title}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-xs">
                                {notification.message}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700/50">
                      <button className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 text-sm font-medium">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 backdrop-blur-sm rounded-xl px-3 py-2 transition-all duration-300 border border-gray-200 dark:border-gray-700/30"
              >
                {/* User Avatar */}
                <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {getUserInitials(userName)}
                </div>

                {/* User Info */}
                <div className="text-left hidden sm:block">
                  <div className="text-gray-900 dark:text-white text-sm font-medium truncate max-w-[120px]">
                    {userName}
                  </div>
                  <div className="text-orange-600 dark:text-orange-400 text-xs">{userRole}</div>
                </div>

                {/* Dropdown Arrow */}
                <motion.div
                  animate={{ rotate: isProfileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </motion.button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700/50 py-2 z-50"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {getUserInitials(userName)}
                        </div>
                        <div>
                          <div className="text-gray-900 dark:text-white font-semibold">
                            {userName}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">
                            {userEmail}
                          </div>
                          <div className="text-orange-600 dark:text-orange-400 text-xs font-medium">
                            {userRole}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-colors duration-200">
                        <User className="w-4 h-4 mr-3" />
                        Profile Settings
                      </button>

                      <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-colors duration-200">
                        <Settings className="w-4 h-4 mr-3" />
                        Account Settings
                      </button>

                      {userType === "parent" && (
                        <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-colors duration-200">
                          <User className="w-4 h-4 mr-3" />
                          Student Information
                        </button>
                      )}

                      <hr className="my-2 border-gray-200 dark:border-gray-700/50" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;