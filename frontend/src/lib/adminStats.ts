import { adminAuthFetch } from "@/src/lib/auth";

export type AdminStats = {
  users_count: number;
  public_wordbooks_count: number;
};

// 管理者ダッシュボード用の統計取得
export const fetchAdminStats = async (): Promise<AdminStats> => {
  const res = await adminAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("管理者統計の取得に失敗しました");
  }

  return data;
};