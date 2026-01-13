import { authFetch } from "@/src/lib/auth";

export type StudyRecord = {
  id: number;
  study_date: string;
  study_count: number;
  memo: string;
};

export async function fetchStudyRecords(
  year: number,
  month: number
): Promise<StudyRecord[]> {

  const res = await authFetch(
    `http://localhost:3001/api/v1/study_records?year=${year}&month=${month}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch study records");
  }

  return data;
}
