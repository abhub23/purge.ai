'use client';

import { useState, useEffect, FC } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ToggleTheme: FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme == 'light' ? 'dark' : 'light');
  };

  return (
    <span
      className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-zinc-100 lg:h-9 lg:w-9 dark:text-white dark:hover:bg-zinc-800'
      onClick={toggleTheme}
    >
      <SafeRender>
        {theme == 'light' ? <Moon className='h-4.5 w-4.5' /> : <Sun className='h-4.5 w-4.5' />}
      </SafeRender>
    </span>
  );
};

type Child = {
  children: React.ReactNode;
};

const SafeRender: FC<Child> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or return a placeholder/spinner

  return <>{children}</>;
};
