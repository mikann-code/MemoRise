// 単語帳の取得と作成
import { authFetch } from "@/src/lib/auth";

export type Wordbook = {
  id: number;
  uuid: string;
  title: string;
  description: string | null;
  words_count: number;
  last_studied: string | null;
};

export const fetchWordbooks = async (): Promise<Wordbook[]> => {
  const res = await authFetch(
    "http://localhost:3001/api/v1/wordbooks",
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.error || "単語帳の取得に失敗しました"
    );
  }

  return data;
};
