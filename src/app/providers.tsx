'use client';


import { CategoryFilterProvider } from "@/contexts/CategoryFilterContext";
import { SportProvider } from "@/contexts/SportContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type WithChildrenProps = {
    children: React.ReactNode;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 // 60.000 milliseconds = 60 seconds = 1 minute
    },
  },
})

export function Providers({ children }: WithChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SportProvider>
        <CategoryFilterProvider>
          {children}
        </CategoryFilterProvider>
      </SportProvider>
    </QueryClientProvider>
  );
}