import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/Button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-9 border border-primary bg-background text-text-color hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
