"use client";

import { use, useState, useEffect } from "react";
import { useWords } from "@/src/hooks/useWords";
import { useStudyWordbooks } from "@/src/hooks/useStudyWordbooks";
import { useQueryClient } from "@tanstack/react-query";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaListUl } from "react-icons/fa6";
import styles from "./page.module.css";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { TbCircleLetterQFilled, TbCircleLetterAFilled } from "react-icons/tb";
import { Button } from "@/src/components/common/ui/Button";
import { WordCard } from "@/src/components/common/card/WordCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function WordbookDetailPage({ params }: Props) {
  const { id: wordbookUuid } = use(params);

  const { words, loading, error, addWord, deleteWord } = useWords(wordbookUuid);

  const studyMutation = useStudyWordbooks(wordbookUuid);
  const queryClient = useQueryClient();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    studyMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wordbooks"] });
      },
    });
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
          <button type="submit" className={styles.wordSubmitButton}>
            単語を登録
          </button>
        </Button>
      </form>

      <ul>
        {words.map((word) => (
          <li key={word.uuid}>
            <WordCard
              question={word.question}
              answer={word.answer}
              review={false}
              opened={true}
              deletable={true}
              onTagToggle={() => {}}
              onDelete={() => deleteWord(word.uuid)} // ⭐ ここが削除
            />
          </li>
        ))}
      </ul>
    </>
  );
}
