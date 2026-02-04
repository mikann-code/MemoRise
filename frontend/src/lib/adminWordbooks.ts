import { adminAuthFetch } from "@/src/lib/auth";

export type AdminWordbook = {
  uuid: string;
  title: string;
  description: string | null;
  level: string | null;
  label: string | null;
  part: string | null;
  published: boolean;
  parent_uuid: string | null;
};

/* =========================
   親単語帳用
========================= */

export type CreateParentWordbookParams = {
  title: string;
  description: string | null;
  level: string;
  label: string;
};

export const createParentWordbook = async (
  params: CreateParentWordbookParams
): Promise<AdminWordbook> => {
  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/wordbooks`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordbook: params }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.errors?.join(", ") || "親単語帳の作成に失敗しました"
    );
  }

  return data;
};

export type UpdateParentWordbookParams = {
  uuid: string;
  title: string;
  description: string | null;
  level: string;
  label: string;
};

export const updateParentWordbook = async (
  params: UpdateParentWordbookParams
): Promise<AdminWordbook> => {
  const { uuid, ...body } = params;

  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/wordbooks/${uuid}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordbook: body }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.errors?.join(", ") || "親単語帳の更新に失敗しました"
    );
  }

  return data;
};

/* =========================
   子単語帳用
========================= */

export type CreateChildWordbookParams = {
  parent_uuid: string;
  part: string;
};

export const createChildWordbook = async (
  params: CreateChildWordbookParams
): Promise<AdminWordbook> => {
  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/wordbooks`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordbook: params }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.errors?.join(", ") || "子単語帳の作成に失敗しました"
    );
  }

  return data;
};

export type UpdateChildWordbookParams = {
  uuid: string;
  part: string;
};

export const updateChildWordbook = async (
  params: UpdateChildWordbookParams
): Promise<AdminWordbook> => {
  const { uuid, ...body } = params;

  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/wordbooks/${uuid}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordbook: body }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.errors?.join(", ") || "子単語帳の更新に失敗しました"
    );
  }

  return data;
};

/* =========================
   取得系
========================= */

export const fetchAdminWordbooks = async (): Promise<AdminWordbook[]> => {
  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/wordbooks`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("admin 単語帳の取得に失敗しました");
  }

  return data;
};

export const fetchAdminWordbookChildren = async (
  uuid: string
): Promise<AdminWordbook[]> => {
  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/wordbooks/${uuid}/children`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("admin 単語帳の 子一覧の取得に失敗しました");
  }

  return data;
};

/* =========================
   削除（親・子 共通）
========================= */

export const deleteParentWordbook = async (uuid: string): Promise<void> => {
  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/wordbooks/${uuid}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("単語帳の削除に失敗しました");
  }
};

export const deleteChildWordbook = async (uuid: string): Promise<void> => {
  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/wordbooks/${uuid}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Part の削除に失敗しました");
  }
};

