export type PublicWord = {
  uuid: string;
  question: string;
  answer: string;
  pos?: string[];
  review?: boolean;
};

export const fetchPublicWords = async (
  wordbookUuid: string
): Promise<PublicWord[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public_wordbooks/${wordbookUuid}/words`
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      data?.error || "単語の取得に失敗しました"
    );
  }

  const data = await res.json();
  return data;
};
