"use client";

import { use, useState, useEffect } from "react";
import { useWords } from "@/src/hooks/useWords";
import { useStudyWordbooks } from "@/src/hooks/useStudyWordbooks";
import { useQueryClient } from "@tanstack/react-query";
import { createStudyRecord } from "@/src/lib/studyRecords"; 
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaListUl } from "react-icons/fa6";
import styles from "./page.module.css";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { TbCircleLetterQFilled } from "react-icons/tb";
import { TbCircleLetterAFilled } from "react-icons/tb";
import { Button } from "@/src/components/common/ui/Button";
import { TestCard } from "@/src/components/common/card/TestCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function WordbookDetailPage({ params }: Props) {
  const { id: wordbookUuid } = use(params);

  const { words, loading, error, addWord } = useWords(wordbookUuid);

  // 学習データの更新
  const studyMutation = useStudyWordbooks(wordbookUuid);
  const queryClient = useQueryClient();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    console.log("📚 Wordbook opened:", wordbookUuid);

    studyMutation.mutate(undefined, {
      onSuccess: async () => {
        console.log("✨ study API success!");

        queryClient.invalidateQueries({ queryKey: ["wordbooks"] });

        const today = new Date().toISOString().slice(0, 10);
        console.log("📝 createStudyRecord for:", today);

        await createStudyRecord(today);

        console.log("✅ studyRecord created!");
        queryClient.invalidateQueries({ queryKey: ["studyRecords"] });
      },
      onError: (err) => {
        console.error("❌ study API error:", err);
      }
    });
  }, [wordbookUuid]);

  // localstorageに保存して最も最近開いていた単語帳を開けるようにできる
  useEffect(() => {
    localStorage.setItem("lastWordbookUuid", wordbookUuid);
  }, [wordbookUuid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addWord({ question, answer });

    setQuestion("");
    setAnswer("");
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>単語の取得に失敗しました</p>;

  return (
    <>
      <SectionTitle
        icon={FaListUl}
        subTitle="My Vocabulary Archive"
        title="単語一覧"
      />

      <form onSubmit={handleSubmit} className={styles.wordCreateForm}>
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
          <button type="submit" className={styles.wordSubmitButton}>単語を登録</button>
        </Button>

      </form>

      <ul>
        {words.map((word) => (
          <li key={word.uuid}>
            <TestCard 
            key={word.uuid}
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
