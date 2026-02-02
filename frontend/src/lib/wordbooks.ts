// 単語帳の取得と作成
import { authFetch } from "@/src/lib/auth";

export type Wordbook = {
  uuid: string;
  title: string;
  description: string | null;
  words_count: number;
  last_studied: string | null;
  studied_today: boolean;
  label?: string;
};

// #index
export const fetchWordbooks = async (): Promise<Wordbook[]> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wordbooks`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "単語帳の取得に失敗しました");
  }

  return data;
};

// #show
export const fetchWordbook = async (uuid: string): Promise<Wordbook> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wordbooks/${uuid}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "単語帳の取得に失敗しました");
  }

  return data;
};

// #create
export const createWordbook = async (
  params: { title: string; description?: string | null; label?: string | null }
): Promise<Wordbook> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wordbooks`,
    {
      method: "POST",
      body: JSON.stringify({
        wordbook: {
          title: params.title,
          description: params.description ?? null,
          label: params.label,
        },
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "単語帳の作成に失敗しました");
  }

  return data;
};

// #destroy
export const deleteWordbook = async (uuid: string): Promise<void> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wordbooks/${uuid}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.error || "単語帳の削除に失敗しました");
  }
};

// #update
export const updateWordbook = async (
  uuid: string,
  params: { title: string; description?: string | null; label?: string | null }
): Promise<Wordbook> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wordbooks/${uuid}`,
    {
      method: "PUT",
      body: JSON.stringify({
        wordbook: {
          title: params.title,
          description: params.description ?? null,
          label: params.label,
        },
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "単語帳の更新に失敗しました");
  }

  return data;
};

// study
// 単語帳を学習したことにする
export const fetchStudyWordbooks = async (
  uuid: string
): Promise<{
  ok: boolean;
  streak: number;
  last_study_date: string;
}> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wordbooks/${uuid}/study`,
    {
      method: "POST",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "学習処理に失敗しました");
  }

  return data;
};
