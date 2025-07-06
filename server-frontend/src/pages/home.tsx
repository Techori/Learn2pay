import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const dashboards = [
    { label: "Super Admin", path: "/superAdmin-dashboard" },
    { label: "Referral", path: "/referral-dashboard" },
    { label: "Support", path: "/support-dashboard" },
    { label: "Sales", path: "/login" }, // i m currenlty redirecting it to login for Sales
  ];

  // Define theme-specific styles
  const bgGradient = theme === 'dark' 
    ? "bg-gradient-to-b from-primary-dark to-dark-gray" 
    : "bg-gradient-to-b from-orange-50 via-white to-blue-50";

  const textColor = theme === 'dark' ? "text-white" : "text-gray-800";
  const subTextColor = theme === 'dark' ? "text-gray-300" : "text-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative min-h-screen ${bgGradient} flex flex-col items-center justify-center p-6 overflow-hidden`}
    >
      {/* Background lighting effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: theme === 'dark' ? 0.4 : 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-10 left-1/4 w-64 h-64 -z-10 pointer-events-none"
      >
        <div className={`w-full h-full ${theme === 'dark' ? 'bg-orange-500' : 'bg-orange-300'} rounded-full filter blur-3xl`} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: theme === 'dark' ? 0.3 : 0.15 }}
        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 right-1/3 w-80 h-80 -z-10 pointer-events-none"
      >
        <div className={`w-full h-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'} rounded-full filter blur-2xl`} />
      </motion.div>

      {/* Additional light theme decorations */}
      {theme === 'light' && (
        <>
          <div className="absolute top-20 right-1/4 w-32 h-32 bg-orange-100 rounded-full filter blur-xl opacity-40 -z-10 pointer-events-none"></div>
          <div className="absolute bottom-1/4 left-1/5 w-24 h-24 bg-blue-100 rounded-full filter blur-xl opacity-50 -z-10 pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/5 w-16 h-16 bg-pink-100 rounded-full filter blur-lg opacity-30 -z-10 pointer-events-none"></div>
        </>
      )}

      {/* Logo or branding element */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className={`mb-6 px-6 py-3 rounded-xl ${theme === 'dark' ? 'bg-black/20' : 'bg-white/70 shadow-lg'}`}
      >
        <span className="text-orange-500 text-2xl font-bold">Larn</span>
        <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>2Pay</span>
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`text-4xl md:text-5xl font-extrabold ${textColor} mb-4 text-center`}
      >
        Welcome to Dashboard
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-lg ${subTextColor} mb-10 text-center max-w-lg`}
      >
        Choose a dashboard below to Work.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl">
        {dashboards.map((dash, index) => (
          <motion.button
            key={dash.path}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            onClick={() => navigate(dash.path)}
            className={`w-full py-4 px-5 rounded-lg border-2 border-orange-500 
              ${theme === 'dark' 
                ? "text-orange-500 bg-black/30 hover:bg-orange-500 hover:text-white" 
                : "text-orange-600 bg-white/90 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white"} 
              font-semibold text-center transition-all duration-300
              ${theme === 'light' ? 'shadow-[0_5px_15px_rgba(249,115,22,0.15)]' : 'shadow-md'}`}
          >
            {dash.label} Dashboard
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;