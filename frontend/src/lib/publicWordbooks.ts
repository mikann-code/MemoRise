// 公開単語帳（公式テンプレ）の取得
export type PublicWordbook = {
  uuid: string;
  title: string;
  description: string | null;
  words_count: number;
  level: string | null;
  label: string | null;
  part: string | null;
};

export type PublicWordbookChild = {
  uuid: string;
  title: string;
  part: string;
};

// 公開単語帳一覧を取得（認証なし）
export const fetchPublicWordbooks = async (): Promise<PublicWordbook[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public_wordbooks`
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      data?.error || "公開単語帳の取得に失敗しました"
    );
  }

  const data = await res.json();
  return data;
};

export const fetchPublicWordbookChildren = async (
  parentUuid: string
): Promise<PublicWordbookChild[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public_wordbooks/${parentUuid}/children`
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      data?.error || "子単語帳の取得に失敗しました"
    );
  }

  const data = await res.json();
  return data;
};

export const fetchPublicWordbook = async (
  uuid: string
): Promise<PublicWordbook> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public_wordbooks/${uuid}`
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      data?.error || "公開単語帳の取得に失敗しました"
    );
  }

  const data = await res.json();
  return data;
};
