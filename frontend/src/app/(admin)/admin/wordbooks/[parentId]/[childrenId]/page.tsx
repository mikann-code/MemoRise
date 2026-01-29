"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked } from "react-icons/lu";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { TbCircleLetterQFilled, TbCircleLetterAFilled } from "react-icons/tb";
import { Button } from "@/src/components/common/ui/Button";
import { TestCard } from "@/src/components/common/card/TestCard";

import { useAdminWordbookChildren } from "@/src/hooks/useAdminWordbookChildren";
import { useAdminWords } from "@/src/hooks/useAdminWords";

export default function AdminWordbookChildPage() {
  const { parentId, childrenId } = useParams<{
    parentId: string;
    childrenId: string;
  }>();

  // 親に紐づく子（Part）一覧を取得
  const {
    children,
    loading: childrenLoading,
    error: childrenError,
  } = useAdminWordbookChildren(parentId);

  console.log("parentId:", parentId);
  console.log("childrenId:", childrenId);

  // URLの childrenId に一致する Part を特定
  const childWordbook = useMemo(() => {
    return children.find((child) => child.uuid === childrenId);
  }, [children, childrenId]);

  // ⭐ admin 用 hook を使う
  const { words, loading, error, addWord } = useAdminWords(childrenId);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addWord({ question, answer });
    setQuestion("");
    setAnswer("");
  };

  const handleCsvUpload = async (file: File | null) => {
  if (!file) return;

  const text = await file.text();
  const lines = text.split("\n");

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].replace("\r", "").trim();
    if (!line) continue;

    const [question, answer] = line.split(",");
    if (!question || !answer) continue;

    await addWord({
      question: question.trim(),
      answer: answer.trim(),
    });
  }
};

  if (childrenLoading) return <p>読み込み中...</p>;
  if (childrenError) return <p>Part の取得に失敗しました</p>;
  if (!childWordbook) return <p>この Part は存在しません</p>;

  if (loading) return <p>単語を読み込み中...</p>;
  if (error) return <p>単語の取得に失敗しました</p>;

  return (
    <>
      <SectionTitle
        icon={LuBookMarked}
        subTitle="Admin Wordbook Part"
        title={childWordbook.part}
      />

      {/* 単語登録フォーム */}
      <form onSubmit={handleSubmit}>
        <FloatingInput
          id="question"
          type="text"
          label="単語"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          icon={<TbCircleLetterQFilled />}
        />

        <FloatingInput
          id="answer"
          type="text"
          label="意味"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          icon={<TbCircleLetterAFilled />}
        />

        <Button>
          <button type="submit">単語を登録</button>
        </Button>

        <label htmlFor="csvFile">CSVファイル</label>
        <input
          id="csvFile"
          type="file"
          accept=".csv"
          onChange={(e) => handleCsvUpload(e.target.files?.[0] || null)}
        />
      </form>

      {/* 単語一覧 */}
      <ul>
        {words.length === 0 && <p>この Part にはまだ単語がありません</p>}

        {words.map((word) => (
          <li key={word.uuid}>
            <TestCard
              question={word.question}
              answer={word.answer}
              opened={true}
              onToggle={() => {}}
              onNext={() => {}}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
