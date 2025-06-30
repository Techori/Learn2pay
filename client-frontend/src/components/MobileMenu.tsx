import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type MobileMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  currentPath: string;
  isAuthenticated: boolean;
  institute: any;
  parent: any;
  userType: "institute" | "parent" | null;
  onLogout: () => void;
  isLoading: boolean;
};

const MobileMenu = ({
  isOpen,
  toggleMenu,
  currentPath,
  isAuthenticated,
  institute,
  parent,
  userType,
  onLogout,
  isLoading,
}: MobileMenuProps) => {
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: 1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className="flex justify-end p-6">
            <button onClick={toggleMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-[80vh]">
            <nav>
              <ul className="space-y-8 text-center">
                {navItems.map((item, index) => {
                  const isActive = item.path === currentPath;
                  return (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="text-2xl relative"
                    >
                      <Link
                        to={item.path}
                        onClick={toggleMenu}
                        className={`transition-colors ${
                          isActive
                            ? "text-orange-500"
                            : "text-white hover:text-orange-500"
                        }`}
                      >
                        {item.name}
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-orange-500"
                            layoutId="mobileActiveIndicator"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              variants={itemVariants}
              className="mt-12 space-y-4 w-full px-8"
            >
              {isLoading ? (
                // Loading state
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                </div>
              ) : isAuthenticated ? (
                // Authenticated state
                <>
                  <div className="text-center text-sm text-gray-300 mb-4">
                    Welcome,{" "}
                    <span className="text-orange-400">{institute?.name}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={toggleMenu}
                    className="w-full py-4 text-center bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                      />
                    </svg>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      toggleMenu();
                    }}
                    className="w-full py-4 text-center text-white border border-white rounded-md hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                // Not authenticated state
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="block w-full py-4 text-center text-white border border-white rounded-md hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMenu}
                    className="block w-full py-4 text-center bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
