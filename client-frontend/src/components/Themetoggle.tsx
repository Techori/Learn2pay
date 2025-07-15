import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      title={theme == 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme == 'dark' ? (
        <Moon className="w-6 h-6 text-gray-500" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
