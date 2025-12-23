"use client";

import { useEffect, useState } from "react";

type Wordbook = {
  id: number;
  uuid: string;
  title: string;
  description: string;
};

export default function WordbooksPage() {
  const [wordbooks, setWordbooks] = useState<Wordbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("ログイン情報がありません");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/api/v1/wordbooks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("取得に失敗しました");
        return res.json();
      })
      .then((data) => {
        setWordbooks(data);
      })
      .catch(() => {
        setError("単語帳の取得中にエラーが発生しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>単語帳一覧</h1>

      {wordbooks.length === 0 && <p>単語帳がまだありません</p>}

      <ul>
        {wordbooks.map((wb) => (
          <li key={wb.uuid}>
            <strong>{wb.title}</strong>
            <p>{wb.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
