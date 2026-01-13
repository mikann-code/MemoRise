// ログイン済みであることを証明するトークンを添えて、安全にAPI通信をするための共通関数
// 一度、JWTで取得したトークンを身分証として提示している
export const authFetch = async (
  input: RequestInfo,
  init: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  const res = await fetch(input, {
    ...init,
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

