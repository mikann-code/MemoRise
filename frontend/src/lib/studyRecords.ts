import { authFetch } from "@/src/lib/auth";

export type StudyDetail = {
  id: number;
  title: string;
  rate: number;
  count: number;
  children_id: string;
};

export type StudyRecord = {
  id: number;
  study_date: string;
  study_count: number;
  memo: string | null;
  study_details: StudyDetail[];
};

export type PostStudyRecordParams = {
  study_date: string;
  total_count: number;
  title: string;
  rate: number;
  count: number;
  children_id: string;
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

// 初回はcreate 二回以降はupdate
// post action
export async function postStudyRecord(params: PostStudyRecordParams) {
  const res = await authFetch("http://localhost:3001/api/v1/study_records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      study_date: params.study_date,
      total_count: params.total_count,
      title: params.title,
      rate: params.rate,
      count: params.count,
      children_id: params.children_id,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to post study record");
  }

  return data;
}



