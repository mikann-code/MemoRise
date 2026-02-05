import { authFetch } from "@/src/lib/auth";

export type WordbookPartProgress = {
  wordbook_uuid: string;
  part: string;
  unlocked: boolean;
  completed: boolean;
};

// GET
export const fetchWordbookProgress = async (
  parentId: string
): Promise<WordbookPartProgress[]> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_wordbook_progresses?parent_id=${encodeURIComponent(
      parentId
    )}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("進捗の取得に失敗しました");
  }

  return res.json();
};

// POST（完了）
export const completeWordbook = async (wordbookUuid: string) => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_wordbook_progresses/complete`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wordbook_uuid: wordbookUuid,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("進捗の更新に失敗しました");
  }

  return res.json();
};
