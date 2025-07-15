'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
type TanstackQueryPropType = {
  children: React.ReactNode;
};

export const QueryProvider = ({ children }: TanstackQueryPropType) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
