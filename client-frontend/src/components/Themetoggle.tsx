import React, { useEffect, useState } from "react";
console.log(`Set data-theme to: ${document.documentElement.getAttribute("data-theme")}`);
const Themetoggle = () => {
  const [theme, setTheme] = useState<"bright" | "dark">("bright");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "bright" | "dark";
    const currentTheme = savedTheme || "bright";
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
    console.log(`Initial theme set to: ${currentTheme}`);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "bright" ? "dark" : "bright";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    console.log(`Theme toggled to: ${newTheme}`);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 px-4 rounded-full bg-white text-black hover:bg-gray-200 transition-all"
    >
      {theme === "bright" ? "Dark Mode" : "Bright Mode"}
    </button>
  );
};

export default Themetoggle;
