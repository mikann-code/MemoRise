// 基本ユーザー情報
export type User = {
  id: number;
  name: string;
  email: string;
  
  // 連続ログイン日数
  streak: number;
  
  // 登録単語合計数
  // totalWords:number;
};

// ログイン用パラメータとレスポンス
export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type AdminLoginParams = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  token: string;
  admin: {
    id: number;
    email: string;
    role: string;
  };
};