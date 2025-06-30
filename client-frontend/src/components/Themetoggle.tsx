import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Themetoggle = () => {
  const [theme, setTheme] = useState<"bright" | "dark">("bright");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "bright" | "dark";
    const currentTheme = savedTheme || "bright";
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "bright" ? "dark" : "bright";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-6 bg-gray-700/50 hover:bg-gray-600/50 rounded-full border border-gray-600/30 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "bright" ? "dark" : "bright"} mode`}
    >
      {/* Toggle Track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-700" />

      {/* Toggle Ball */}
      <motion.div
        className={`absolute w-5 h-5 rounded-full shadow-lg flex items-center justify-center ${
          theme === "bright"
            ? "bg-gradient-to-br from-orange-400 to-orange-500"
            : "bg-gradient-to-br from-blue-400 to-blue-500"
        }`}
        animate={{
          x: theme === "bright" ? -10 : 10,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon inside the toggle ball */}
        <motion.div
          initial={false}
          animate={{
            scale: 1,
            rotate: theme === "bright" ? 0 : 180,
          }}
          transition={{ duration: 0.3 }}
          className="w-3 h-3 flex items-center justify-center"
        >
          {theme === "bright" ? (
            // Sun icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-white"
            >
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
          ) : (
            // Moon icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-white"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </motion.div>
      </motion.div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-30"
        animate={{
          boxShadow:
            theme === "bright"
              ? "0 0 10px rgba(251, 146, 60, 0.3)"
              : "0 0 10px rgba(96, 165, 250, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default Themetoggle;
