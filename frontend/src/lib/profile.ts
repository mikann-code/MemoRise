import { authFetch } from "@/src/lib/auth";

export type UpdateProfileParams = {
  name: string;
  password?: string;
  password_confirmation?: string;
};

export type UpdateProfileResponse = {
  id: number;
  name: string;
  email: string;
  streak: number;
};

export async function updateProfile(
  params: UpdateProfileParams
): Promise<UpdateProfileResponse> {
  const res = await authFetch("http://localhost:3001/api/v1/me", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error("プロフィール更新に失敗しました");
  }

  const data: UpdateProfileResponse = await res.json();
  return data;
}
