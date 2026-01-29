import { adminAuthFetch } from "@/src/lib/auth";

export type AdminWord = {
  uuid: string;
  question: string;
  answer: string;
};

type CreateAdminWordParams = {
  question: string;
  answer: string;
};

// 単語一覧取得（admin用）
export const fetchAdminWords = async (
  wordbookUuid: string
): Promise<AdminWord[]> => {
  const res = await adminAuthFetch(
    `http://localhost:3001/api/admin/wordbooks/${wordbookUuid}/words`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("GET admin words error:", res.status, text);
    throw new Error("Failed to fetch admin words");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

// 単語作成（admin用）
export const createAdminWord = async (
  wordbookUuid: string,
  params: CreateAdminWordParams
): Promise<AdminWord> => {
  const res = await adminAuthFetch(
    `http://localhost:3001/api/admin/wordbooks/${wordbookUuid}/words`,
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
    console.error("POST admin word error:", res.status, text);
    throw new Error(text);
  }

  return res.json();
};

// 単語削除（admin用）
export const deleteAdminWord = async (
  wordbookUuid: string,
  wordUuid: string
): Promise<void> => {
  const res = await adminAuthFetch(
    `http://localhost:3001/api/admin/wordbooks/${wordbookUuid}/words/${wordUuid}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("DELETE admin word error:", res.status, text);
    throw new Error("Failed to delete admin word");
  }
};