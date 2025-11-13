import { useQuery } from "@tanstack/react-query";
import { fetchCMSData } from "@/services/cms";
import type { CMSData } from "@/types/cms";

/**
 * Custom hook to fetch and cache CMS data from Google Sheets
 * Uses React Query for automatic caching and refetching
 */
export function useCMSData() {
  return useQuery<CMSData, Error>({
    queryKey: ['cmsData'],
    queryFn: fetchCMSData,
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes (increased)
    gcTime: 60 * 60 * 1000, // Cache data for 60 minutes
    retry: 1, // Only retry once (reduced from 2)
    retryDelay: 1000, // Wait 1 second before retrying
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch on reconnect
    // Use cached data while fetching in background
    placeholderData: (previousData) => previousData,
  });
}
