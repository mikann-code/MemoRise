import { authFetch } from "@/src/lib/auth";

export type TodayWord = {
  uuid: string;
  question: string;
  answer: string;
};

export const fetchTodayWord = async (): Promise<TodayWord> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/today_word`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "今日の一問の取得に失敗しました");
  }

  return data;
};
