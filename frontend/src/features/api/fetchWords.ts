import { WordItem } from "@/src/types/word";

export async function fetchWords(wordbookId: number) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:3001/api/v1/wordbooks/${wordbookId}/words`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch words");
  }

  return res.json() as Promise<WordItem[]>;
}
