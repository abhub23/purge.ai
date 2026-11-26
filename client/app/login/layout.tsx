import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Purge AI',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
