// ログイン処理
import { LoginParams, LoginResponse, AdminLoginParams, AdminLoginResponse } from "@/src/types/user";


export const login = async (
  params: LoginParams
): Promise<LoginResponse> => {
  const res = await fetch("http://localhost:3001/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.error ||
      "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
    );
  }
  return data;
};

export const adminLogin = async (
  params: AdminLoginParams
): Promise<AdminLoginResponse> => {
  const res = await fetch("http://localhost:3001/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      password: params.password,
    }),
  });

  console.log("adminLogin params", params);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.error || "管理者ログインに失敗しました。メールアドレスとパスワードを確認してください。"
    );
  }

  return data;
};
