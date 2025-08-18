import type { Metadata } from 'next';
import { Bricolage } from '@/utils/fonts';
import { ThemeProvider } from 'next-themes';
import { QueryProvider } from '@/utils/QueryProvider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  metadataBase: new URL('https://purgeai.abdullahtech.dev'),
  title: 'PurgeAI',
  icons: {
    icon: '/purgeailogo.webp',
  },
  description:
    'PurgeAI is a battle tested Ai assistant designed and deeloped to help devs manage and review there PRs efficiently',

  keywords: [
    'AI Product',
    'Github AI',
    'AI SAAS',
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

    { url: 'https://purgeai.abdullahtech.dev', name: 'Abdullah Mukri' },

    { url: 'https://abdullahtech.dev', name: 'Abdullah Mukri' },
  ],

  publisher: 'Abdullah Mukri',

  openGraph: {
    title: 'abdullahtech.dev',
    description: '',
    url: 'https://purgeai.abdullahtech.dev',
    siteName: 'https://purgeai.abdullahtech.dev',
    images: [
      {
        url: 'https://abdullahtech.dev/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@abdullah_twt23',
    creator: '@abdullah_twt23',
    title: 'PurgeAI',
    description: 'abdullahtech.dev',
    images: {
      url: 'https://purgeai.abdullahtech.dev/og-image.png',
      type: 'image/png',
    },
  },

  appLinks: {
    web: {
      url: new URL('https://purgeai.abdullahtech.dev'),
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${Bricolage}`}>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
        <ThemeProvider attribute={'class'}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
