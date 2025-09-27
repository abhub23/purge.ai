import type { Metadata } from 'next';
import { Bricolage } from '@/utils/fonts';
import { ThemeProvider } from 'next-themes';
import { QueryProvider } from '@/utils/QueryProvider';
import './globals.css';
import { FRONTEND_URL } from '@/config/config';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(FRONTEND_URL as string),
  title: 'PurgeAI ● AI assistant for github PRs',
  icons: {
    icon: '/purgeailogo.webp',
  },
  description:
    'PurgeAI is a battle tested AI assistant designed and developed to help devs manage and review their PRs efficiently',

  keywords: [
    'AI Product',
    'Github AI',
    'AI SAAS',
    'Github AI Reviewer',
    'Github Agent',
    'Abdullah Technology',
    'Abdullah Developer',
    'Abdullah Fullstack Engineer',
    'Software Engineer',
    'Software Developer',
    'Fullstack Engineer',
    'Fullstack Developer',
    'Portfolio Website',
    'Javascript',
    'Typescript',
    'React js',
    'Node js',
    'Next js',
  ],
  authors: [
    { url: 'https://github.com/abhub23', name: 'Abdullah Mukri' },
    { url: FRONTEND_URL, name: 'Abdullah Mukri' },
    { url: 'https://abdullahtech.dev', name: 'Abdullah Mukri' },
  ],

  publisher: 'Abdullah Mukri',

  openGraph: {
    title: 'PurgeAI',
    description:
      'PurgeAI is a battle tested AI assistant designed and developed to help devs manage and review their PRs efficiently',
    url: FRONTEND_URL,
    siteName: 'PurgeAI',

    images: [
      {
        url: `${FRONTEND_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },

  twitter: {
    site: FRONTEND_URL,
    creator: '@abdullah_twt23',
    title: 'PurgeAI',
    description:
      'PurgeAI is a battle tested AI assistant designed and developed to help devs manage and review their PRs efficiently',
    images: {
      url: `${FRONTEND_URL}/og-image.png`,
      type: 'image/png',
    },
  },

  appLinks: {
    web: {
      url: new URL(FRONTEND_URL as string),
    },
  },
  category: 'AI Product',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(Bricolage)}>
        <script src='https://checkout.razorpay.com/v1/checkout.js' async></script>
        <ThemeProvider attribute={'class'}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
