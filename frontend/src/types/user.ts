// 基本ユーザー情報
export type User = {
  id: number;
  name: string;
  email: string;
  
  // 連続ログイン日数
  streakCount: number;
};

// ログイン用パラメータとレスポンス
export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};