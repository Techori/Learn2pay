import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type MobileMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  currentPath: string;
};

const MobileMenu = ({ isOpen, toggleMenu, currentPath }: MobileMenuProps) => {
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
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
