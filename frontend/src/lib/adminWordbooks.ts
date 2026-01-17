import { authFetch } from "@/src/lib/auth";

export type AdminWordbook = {
  uuid: string;
  title: string;
  description: string | null;
  level: string;
  label: string;
  published: boolean;
};

export type CreateAdminWordbookParams = {
  title: string;
  description?: string;
  level: string;
  label: string;
};

export const fetchAdminWordbooks = async (): Promise<AdminWordbook[]> => {
  const res = await authFetch("http://localhost:3001/api/admin/wordbooks", { cache: "no-store" });

  const data = await res.json();

  if (!res.ok) throw new Error("admin 単語帳の取得に失敗しました");

  return data;
};

export const createAdminWordbook = async (
  params: CreateAdminWordbookParams
): Promise<AdminWordbook> => {
  const res = await authFetch("http://localhost:3001/api/admin/wordbooks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wordbook: params }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.errors?.join(", ") || "admin 単語帳の作成に失敗しました");
  }

  return data;
};
