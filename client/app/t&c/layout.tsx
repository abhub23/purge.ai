import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Purge AI',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
