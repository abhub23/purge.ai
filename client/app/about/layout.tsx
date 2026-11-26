import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Purge AI',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
