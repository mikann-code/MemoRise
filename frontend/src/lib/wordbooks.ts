// 単語帳の取得と作成
import { authFetch } from "@/src/lib/auth";

export type Wordbook = {
  // id: number;
  uuid: string;
  title: string;
  description: string | null;
  words_count: number;
  last_studied: string | null;
  studied_today: boolean;
};

// 単語帳一覧を取得
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

// 単語帳を学習したことにする
export const fetchStudyWordbooks = async (
  uuid: string
): Promise<{
  ok: boolean;
  streak: number;
  last_study_date: string;
}> => {
  const res = await authFetch(
    `http://localhost:3001/api/v1/wordbooks/${uuid}/study`,
    {
      method: "POST",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data?.error || "学習処理に失敗しました"
    );
  }

  return data;
};
