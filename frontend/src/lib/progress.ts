import { authFetch } from "@/src/lib/auth";

export type WordbookProgress = {
  wordbook_id: number;
  completed: boolean;
};

// GET
export const fetchWordbookProgress = async (): Promise<WordbookProgress[]> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_wordbook_progresses`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("進捗の取得に失敗しました");
  }

  const data = await res.json();
  return data;
};

// post (completed == true)
export const completeWordbook = async (wordbookId: string | number) => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_wordbook_progresses/complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordbook_id: wordbookId,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("進捗の更新に失敗しました");
  }

  const data = await res.json();
  return data;
};
