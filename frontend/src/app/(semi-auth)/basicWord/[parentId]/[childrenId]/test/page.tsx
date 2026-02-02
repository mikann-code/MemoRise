"use client";

import React, { useEffect, useState, startTransition } from "react";
import { useParams } from "next/navigation";
import { usePublicWords } from "@/src/hooks/usePublicWords";
import TestBody from "@/src/components/feature/Test";

type PublicWord = {
  uuid: string;
  question: string;
  answer: string;
  pos?: string[];
};

type TestWord = PublicWord & { review: boolean };

export default function BasicWordTestPage() {
  const { parentId, childrenId } = useParams<{
    parentId: string;
    childrenId: string;
  }>();

  const { words: fetchedWords, loading, error } = usePublicWords(childrenId);

  const [shuffledWords, setShuffledWords] = useState<TestWord[]>([]);

  useEffect(() => {
    if (!fetchedWords || fetchedWords.length === 0) return;

    const copy = [...fetchedWords];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    const withReview = copy.map((w) => ({
      ...w,
      review: false,
    }));

    // ✅ React公式の非同期更新
    startTransition(() => {
      setShuffledWords(withReview);
    });
  }, [fetchedWords]);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>単語の取得に失敗しました</div>;
  if (shuffledWords.length === 0) return <div>単語がありません</div>;

  return (
    <TestBody
      key={childrenId}
      parentId={parentId}
      childrenId={childrenId}
      words={shuffledWords}
    />
  );
}
