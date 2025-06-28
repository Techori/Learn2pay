import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
<<<<<<< HEAD
import ThemeToggle from "./Themetoggle";
=======
import { useAuth } from "../contexts/AuthContext";

>>>>>>> 754b74ac3ed890d910f4df9aec9eef8b3d3f21ac
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, institute, logout, isLoading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
<<<<<<< HEAD
  <div className="container mx-auto flex items-center justify-between px-6 py-4">
    {/* Logo Section */}
    <Link to="/" className="flex items-center">
      <motion.div
        className="text-2xl font-bold"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-orange-500">LARN</span>
        <span className="text-white">2PAY</span>
      </motion.div>
    </Link>
=======
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
>>>>>>> 754b74ac3ed890d910f4df9aec9eef8b3d3f21ac

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center space-x-10">
      <NavLink to="/" isActive={location.pathname === "/"}>
        Home
      </NavLink>
      <NavLink to="/about" isActive={location.pathname === "/about"}>
        About
      </NavLink>
      <NavLink to="/services" isActive={location.pathname === "/services"}>
        Services
      </NavLink>
      <NavLink to="/pricing" isActive={location.pathname === "/pricing"}>
        Pricing
      </NavLink>
      <NavLink to="/contact" isActive={location.pathname === "/contact"}>
        Contact
      </NavLink>
    </div>

<<<<<<< HEAD
    {/* Theme Toggle */}
    <div className="flex items-center space-x-4">
      <ThemeToggle />
    </div>

    {/* Desktop Actions */}
    <div className="hidden md:flex items-center space-x-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/login"
          className="text-white hover:text-orange-400 transition-colors duration-300"
        >
          Login
        </Link>
      </motion.div>
=======
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              // Loading state
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
              </div>
            ) : isAuthenticated ? (
              // Authenticated state - show dashboard and logout
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/dashboard"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-300 flex items-center gap-2"
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
                </motion.div>

                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-300">
                    Welcome,{" "}
                    <span className="text-orange-400">{institute?.name}</span>
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1"
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
                  </motion.button>
                </div>
              </>
            ) : (
              // Not authenticated - show login and get started
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="text-white hover:text-orange-400 transition-colors duration-300"
                  >
                    Login
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>
>>>>>>> 754b74ac3ed890d910f4df9aec9eef8b3d3f21ac

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/register"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
        >
          Get Started
        </Link>
      </motion.div>
    </div>

<<<<<<< HEAD
    {/* Mobile Menu Button */}
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

  {/* Mobile Menu */}
  <MobileMenu
    isOpen={isMenuOpen}
    toggleMenu={toggleMenu}
    currentPath={location.pathname}
  />
</motion.header>
=======
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        currentPath={location.pathname}
        isAuthenticated={isAuthenticated}
        institute={institute}
        onLogout={handleLogout}
        isLoading={isLoading}
      />
>>>>>>> 754b74ac3ed890d910f4df9aec9eef8b3d3f21ac
    </>
  );
};

// Custom NavLink Component
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
