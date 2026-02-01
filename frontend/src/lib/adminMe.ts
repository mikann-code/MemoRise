import { adminAuthFetch } from "@/src/lib/auth";

type AdminMeResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    streak: number;
    role: string;
  };
};

export const fetchAdminMe = async (): Promise<AdminMeResponse> => {
  const res = await adminAuthFetch(
    "http://localhost:3001/api/admin/me",
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.error || "管理者情報の取得に失敗しました"
    );
  }

  return data;
};