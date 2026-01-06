import { authFetch } from "@/src/lib/auth";
import { User } from "@/src/types/user";

export type MeResponse = {
  user: User;
};

export const fetchMe = async (): Promise<MeResponse> => {
  const res = await authFetch(
    "http://localhost:3001/api/v1/me",
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
