import { WordbookDetail } from "@/src/types/word";

export async function fetchWordbooks() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3001/api/v1/wordbooks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("failed to fetch wordbooks");
  return res.json() as Promise<WordbookDetail[]>;
}
