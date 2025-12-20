"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWords } from "@/src/features/api/fetchWords";

export default function WordbookPage({
  params,
}: {
  params: { id: string };
}) {
  const wordbookId = Number(params.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["words", wordbookId],
    queryFn: () => fetchWords(wordbookId),
  });

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;

  return (
    <div>
      <h1>単語一覧</h1>

      <ul>
        {data?.map((word) => (
          <li key={word.uuid}>
            <strong>{word.question}</strong>
            {" / "}
            {word.answer}
            <span>（{word.pos.join(", ")}）</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
