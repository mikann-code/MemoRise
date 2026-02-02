import { authFetch } from "@/src/lib/auth";

export type TotalWordsResponse = {
  total_words: number;
};

export async function fetchTotalWords(): Promise<TotalWordsResponse> {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats/total_words`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch total words");
  }

  const data: TotalWordsResponse = await res.json();
  return data;
}
