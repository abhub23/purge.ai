'use client'

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme == 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className="lg:h-[36px] h-[36px] lg:w-[36px] w-[36px] flex items-center dark:text-white justify-center  rounded-[12px] hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
      onClick={toggleTheme}
    >
      <SafeRender>
        {theme == 'light' ? (
          <Moon className="h-[18px] w-[18px]" />
        ) : (
          <Sun className="h-[18px] w-[18px]" />
        )}
      </SafeRender>
    </button>
  );
};

type Child = {
  children: React.ReactNode;
};

const SafeRender: React.FC<Child> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or return a placeholder/spinner

  return <>{children}</>;
};