// src/components/ThemeToggle.tsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
       <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
     <div className='dark:bg-yellow-400'>hello</div>
    </>
 
  );
}