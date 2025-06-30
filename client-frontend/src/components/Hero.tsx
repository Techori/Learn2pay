import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Hero = () => {
  const { isAuthenticated, institute,parent, isLoading } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black to-[#130900] flex items-center justify-center pt-24 pb-16">
      <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5"></div>

      <motion.div
        className="container mx-auto text-center px-4 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-orange-500 inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-sm mb-6"
          variants={itemVariants}
        >
          Educational Payment Solution
        </motion.h2>

        <motion.h1
          className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          Focus on Studies,{" "}
          <span className="text-orange-500">We Handle the Fees</span>
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10"
          variants={itemVariants}
        >
          Join 15,000+ educational institutions that have revolutionized their
          payment processes and achieved 95% collection efficiency with
          Learn2Pay
        </motion.p>

        <motion.div
          className="flex flex-row sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          {isLoading ? (
            // Loading state
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
            </div>
          ) : isAuthenticated ? (
            // Authenticated state - show dashboard and welcome message
            <div className="flex-1 max-w-xs mx-auto sm:mx-0 flex flex-col sm:flex-col gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 max-w-xs mx-auto sm:mx-0"
              >
                <Link
                  to="/dashboard"
                  className="bg-orange-500 hover:bg-orange-600 w-full text-white flex items-center justify-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>
                  Go to Dashboard
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 max-w-xs mx-auto sm:mx-0"
              >
                <Link
                  to="/demo"
                  className="border border-orange-200 hover:border-orange-500 w-full text-orange-200 hover:text-orange-500 flex items-center justify-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-300"
                >
                  <span>Schedule a Demo</span>
                </Link>
              </motion.div>

              <motion.div
                className="text-gray-300 mt-6"
                variants={itemVariants}
              >
                Welcome,{" "}
                <span className="text-orange-400">{institute?.name || parent.parentName}</span>!
              </motion.div>
            </div>
          ) : (
            // Not authenticated - show get started and demo buttons
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 max-w-xs mx-auto sm:mx-0"
              >
                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 w-full text-white flex items-center justify-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-300"
                >
                  Get Started Free
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 max-w-xs mx-auto sm:mx-0"
              >
                <Link
                  to="/demo"
                  className="border border-orange-200 hover:border-orange-500 w-full text-orange-200 hover:text-orange-500 flex items-center justify-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-300"
                >
                  <span>Schedule a Demo</span>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={itemVariants}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Setup in 24 hours</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <span>Bank-grade security</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
            <span>24/7 dedicated support</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
