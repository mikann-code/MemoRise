"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStudyRecords, StudyRecord } from "@/src/lib/studyRecords";

export function useStudyRecords(year: number, month: number) {
  return useQuery<StudyRecord[]>({
    queryKey: ["studyRecords", year, month], 
    queryFn: () => fetchStudyRecords(year, month),
    staleTime: 1000 * 60,
    retry: false, 
  });
}