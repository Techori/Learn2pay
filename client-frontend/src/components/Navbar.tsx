import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center">
            <motion.div
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-orange-500">LEARN</span>
              <span className="text-white">2PAY</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            <NavLink to="/" isActive={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/about" isActive={location.pathname === "/about"}>
              About
            </NavLink>
            <NavLink
              to="/services"
              isActive={location.pathname === "/services"}
            >
              Services
            </NavLink>
            <NavLink to="/pricing" isActive={location.pathname === "/pricing"}>
              Pricing
            </NavLink>
            <NavLink to="/contact" isActive={location.pathname === "/contact"}>
              Contact
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="text-white hover:text-orange-400 transition-colors duration-300"
              >
                Login
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        currentPath={location.pathname}
      />
    </>
  );
};

// Custom NavLink component with animation and active state
const NavLink = ({
  to,
  children,
  isActive,
}: {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Link
        to={to}
        className={`transition-colors duration-300 relative ${
          isActive ? "text-orange-500" : "text-gray-300 hover:text-orange-500"
        }`}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Navbar;
