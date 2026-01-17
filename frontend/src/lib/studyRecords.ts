import { authFetch } from "@/src/lib/auth";

export type StudyRecord = {
  id: number;
  study_date: string;
  study_count: number;
  memo: string;
};

// index action
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

// week action
export async function fetchStudyWeekRecords(
  startDate: string
): Promise<StudyRecord[]> {

  const res = await authFetch(
    `http://localhost:3001/api/v1/study_records/week?start_date=${startDate}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch weekly study records");
  }

  return data;
}

// recent action (最近30件)
export async function fetchStudyRecentRecords(): Promise<StudyRecord[]> {
  const res = await authFetch(
    "http://localhost:3001/api/v1/study_records/recent",
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch recent study records");
  }

  return data;
}

// create action
export async function createStudyRecord(study_date: string) {
  const res = await authFetch("http://localhost:3001/api/v1/study_records", {
    method: "POST",
    body: JSON.stringify({
      study_date,
      study_count: 0
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to create study record");
  }

  return data;
}

