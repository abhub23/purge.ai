import type { Metadata } from 'next';
import { Bricolage } from '@/utils/fonts';
import { ThemeProvider } from 'next-themes';
import { QueryProvider } from '@/utils/QueryProvider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'PurgeAI',
  icons: {
    icon: '/purgeailogo.webp',
  },
  description:
    'PurgeAI is a battle tested Ai assistant designed and deeloped to help devs manage and review there PRs efficiently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${Bricolage}`}>
        <ThemeProvider attribute={'class'}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
