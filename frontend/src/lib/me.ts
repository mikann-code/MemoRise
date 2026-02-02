import { authFetch } from "@/src/lib/auth";

type MeResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    streak: number;
    role: string;
  };
};

export const fetchMe = async (): Promise<MeResponse> => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/me`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.error || "ユーザー情報の取得に失敗しました"
    );
  }

  return data;
};
