import { authFetch } from "@/src/lib/auth";

export type Word = {
  uuid: string;
  question: string;
  answer: string;
};

type CreateWordParams = {
  question: string;
  answer: string;
};

// 単語一覧取得
export const fetchWords = async (
  wordbookUuid: string
): Promise<Word[]> => {
  const res = await authFetch(
    `http://localhost:3001/api/v1/wordbooks/${wordbookUuid}/words`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch words");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

// 単語作成
export const createWord = async (
  wordbookUuid: string,
  params: CreateWordParams
): Promise<Word> => {
  const res = await authFetch(
    `http://localhost:3001/api/v1/wordbooks/${wordbookUuid}/words`,
    {
      method: "POST",
      body: JSON.stringify({
        word: {
          question: params.question,
          answer: params.answer,
        },
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("POST error response:", res.status, text);
    throw new Error(text);
  }

  return res.json();
};
