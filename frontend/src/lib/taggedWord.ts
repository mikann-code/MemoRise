import { authFetch } from "@/src/lib/auth";

export type TaggedWord = {
  id: number;
  word_id: number;
  question: string;
  answer: string;
  word_uuid: string;
  tag: string;
};

/**
 * 復習タグが付いている単語一覧を取得
 */
export const fetchTaggedWords = async (): Promise<TaggedWord[]> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_word_tags`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("タグ付き単語の取得に失敗しました");
  }

  const data = await res.json();
  return data;
};

/**
 * 単語に「復習」タグを付ける
 */
export const addTaggedWord = async (wordUuid: string): Promise<TaggedWord> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_word_tags`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word_uuid: wordUuid }),
    }
  );

  if (!res.ok) {
    throw new Error("タグの追加に失敗しました");
  }

  const data = await res.json();
  return data;
};

/**
 * 単語から「復習」タグを外す
 */
export const removeTaggedWord = async (wordUuid: string): Promise<void> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_word_tags`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word_uuid: wordUuid }),
    }
  );

  if (!res.ok) {
    throw new Error("タグの削除に失敗しました");
  }
};
