import { adminAuthFetch } from "@/src/lib/auth";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  streak: number;
  total_words: number;
};

// 管理者用：ユーザー一覧取得
export const fetchAdminUsers = async (): Promise<AdminUser[]> => {
  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch admin users");
  }

  const data = await res.json();
  return data;
};
