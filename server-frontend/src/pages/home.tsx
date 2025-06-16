import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const dashboards = [
    { label: 'Super Admin', path: '/superAdmin-dashboard' },
    { label: 'Referral', path: '/referral-dashboard' },
    { label: 'Support', path: '/support-dashboard' },
    { label: 'Sales', path: '/sales-dashboard' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-gradient-to-b from-primary-dark to-dark-gray flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background lighting effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-10 left-1/4 w-64 h-64 -z-10 pointer-events-none"
      >
        <div className="w-full h-full bg-orange-500 rounded-full filter blur-3xl" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-10 right-1/3 w-80 h-80 -z-10 pointer-events-none"
      >
        <div className="w-full h-full bg-blue-500 rounded-full filter blur-2xl" />
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center"
      >
        Welcome to Learn2Pay Dashboard
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-gray-300 mb-10 text-center max-w-lg"
      >
        Choose a dashboard below to Work.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl">
        {dashboards.map((dash) => (
          <motion.button
            key={dash.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(dash.path)}
            className="w-full py-4 rounded-lg border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white font-semibold text-center"
          >
            {dash.label} Dashboard
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
