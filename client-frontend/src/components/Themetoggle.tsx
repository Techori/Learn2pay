import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded transition bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
