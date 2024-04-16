'use client';


import { CategoryFilterProvider } from "@/contexts/CategoryFilterContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type WithChildrenProps = {
    children: React.ReactNode;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000
    },
  },
})

export function Providers({ children }: WithChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CategoryFilterProvider>
        {children}
      </CategoryFilterProvider>
    </QueryClientProvider>
  );
}