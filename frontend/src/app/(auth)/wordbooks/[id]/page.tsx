"use client";

import { use, useState } from "react";
import { useWords } from "@/src/hooks/useWords";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function WordbookDetailPage({ params }: Props) {

  const { id: wordbookUuid } = use(params);

  const { words, loading, error, addWord } = useWords(wordbookUuid);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addWord({ question, answer });

    setQuestion("");
    setAnswer("");
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>単語の取得に失敗しました</p>;

  return (
    <div>
      <h1>単語一覧</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="単語"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          placeholder="意味"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit">単語を登録</button>
      </form>

      <ul>
        {words.map((word) => (
          <li key={word.uuid}>
            <strong>{word.question}</strong> / {word.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}
