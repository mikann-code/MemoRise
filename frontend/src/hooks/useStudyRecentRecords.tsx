"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStudyRecentRecords, StudyRecord } from "@/src/lib/studyRecords";

export function useStudyRecentRecords() {
  return useQuery<StudyRecord[]>({
    queryKey: ["studyRecentRecords"],
    queryFn: fetchStudyRecentRecords,
    staleTime: 1000 * 60, 
    retry: false,
  });
}
