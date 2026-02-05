import Cookies from "js-cookie";

// ログイン済みであることを証明するトークンを添えて、安全にAPI通信をするための共通関数
// 一度、JWTで取得したトークンを身分証として提示している

// user 用の authFetch
export const authFetch = async (
  input: RequestInfo,
  init: RequestInit = {}
) => {
  const token = Cookies.get("user_token");

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  const res = await fetch(input, {
    ...init,
    credentials: "include",
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  return res;
};

// admin 用の authFetch
export const adminAuthFetch = async (
  input: RequestInfo,
  init: RequestInit = {}
) => {
  const token = Cookies.get("admin_token");

  if (!token) {
    throw new Error("NO_ADMIN_TOKEN");
  }

  const res = await fetch(input, {
    ...init,
    credentials: "include",
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    throw new Error("ADMIN_UNAUTHORIZED");
  }

  return res;
};

