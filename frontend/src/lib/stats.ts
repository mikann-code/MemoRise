import { authFetch } from "@/src/lib/auth";

export async function fetchTotalWords(): Promise<number> {
  const res = await authFetch("http://localhost:3001/api/v1/stats/total_words");
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch total words");
  }

  return data;
}
