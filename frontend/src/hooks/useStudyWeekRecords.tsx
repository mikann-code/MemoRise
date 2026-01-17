"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStudyWeekRecords, StudyRecord } from "@/src/lib/studyRecords";

export function useStudyWeekRecords(startDate: string) {
  return useQuery<StudyRecord[]>({
    queryKey: ["studyWeekRecords", startDate],
    queryFn: () => fetchStudyWeekRecords(startDate),
    staleTime: 1000 * 60, 
    retry: false,
  });
}
