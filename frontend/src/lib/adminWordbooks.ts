import { adminAuthFetch } from "@/src/lib/auth";

/* ======================
   型定義
====================== */

export type AdminWordbook = {
  uuid: string;
  title: string;
  description: string | null;
  level: string;
  label: string;
  part: string;          
  published: boolean;
};

export type CreateAdminWordbookParams = {
  title: string;
  description: string | null;
  level: string;
  label: string;
  part: string;          
};

export type AdminWordbookChild = {
  uuid: string;
  title: string;
  description: string | null;
  level: string;
  label: string;
  part: string;          
  published: boolean;
};

/* ======================
   単語帳一覧取得
====================== */

export const fetchAdminWordbooks = async (): Promise<AdminWordbook[]> => {
  const res = await adminAuthFetch(
    "http://localhost:3001/api/admin/wordbooks",
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("admin 単語帳の取得に失敗しました");
  }

  return data;
};

/* ======================
   単語帳作成
====================== */

export const createAdminWordbook = async (
  params: CreateAdminWordbookParams
): Promise<AdminWordbook> => {
  const res = await adminAuthFetch(
    "http://localhost:3001/api/admin/wordbooks",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordbook: params }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.errors?.join(", ") ||
        "admin 単語帳の作成に失敗しました"
    );
  }

  return data;
};

// part(子 単語帳の取得)
export const fetchAdminWordbookChildren = async (
  uuid: string
): Promise<AdminWordbookChild[]> => {
  const res = await adminAuthFetch(
    `http://localhost:3001/api/admin/wordbooks/${uuid}/children`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("admin 単語帳の 子一覧の取得に失敗しました");
  }

  return data;
};