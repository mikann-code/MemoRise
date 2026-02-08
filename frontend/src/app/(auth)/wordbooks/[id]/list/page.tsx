"use client";

import { use, useState, useEffect } from "react";
import { useWords } from "@/src/hooks/useWords";
import { useStudyWordbooks } from "@/src/hooks/useStudyWordbooks";
import { useWordbook } from "@/src/hooks/useWordbooks";
import { useQueryClient } from "@tanstack/react-query";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaListUl, FaPen } from "react-icons/fa6";
import styles from "./page.module.css";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { TbCircleLetterQFilled, TbCircleLetterAFilled } from "react-icons/tb";
import { Button } from "@/src/components/common/ui/Button";
import { WordCard } from "@/src/components/common/card/WordCard";
import { WordbookListLayout } from "@/src/components/layout/WordbookListLayout";
import { useTaggedWords } from "@/src/hooks/useTaggedWords";
import Link from "next/link";
import { ButtonSecondary } from "@/src/components/common/ui/ButtonSecondary";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function WordbookDetailPage({ params }: Props) {
  const { id: wordbookUuid } = use(params);

  const { wordbook, loading: wordbookLoading } = useWordbook(wordbookUuid);
  const { words, loading, error, addWord, deleteWord } = useWords(wordbookUuid);

  const studyMutation = useStudyWordbooks(wordbookUuid);
  const queryClient = useQueryClient();

  const { taggedWords, addTaggedWord, removeTaggedWord } = useTaggedWords();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // 🔥 追加：入力エラー
  const [errors, setErrors] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    studyMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wordbooks"] });
      },
    });
  }, [wordbookUuid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      question: "",
      answer: "",
    });

    let hasError = false;

    if (!question.trim()) {
      setErrors((prev) => ({
        ...prev,
        question: "単語を入力してください",
      }));
      hasError = true;
    }

    if (!answer.trim()) {
      setErrors((prev) => ({
        ...prev,
        answer: "意味を入力してください",
      }));
      hasError = true;
    }

    if (hasError) return;

    try {
      await addWord({ question, answer });
      setQuestion("");
      setAnswer("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "登録に失敗しました";

      setErrors((prev) => ({
        ...prev,
        answer: message,
      }));
    }
  };

  const isTagged = (wordUuid: string) => {
    return taggedWords.some((t) => t.word_uuid === wordUuid);
  };

  if (loading || wordbookLoading) return <p>読み込み中...</p>;
  if (error) return <p>単語の取得に失敗しました</p>;

  return (
    <WordbookListLayout
      header={
        <div className={styles.headerRow}>
          <SectionTitle
            icon={FaListUl}
            subTitle="My Vocabulary Archive"
            title={wordbook?.title ?? "単語一覧"}
          />
          <Link
            href={`/wordbooks/${wordbookUuid}/edit`}
            className={styles.editWordbookButton}
          >
            <FaPen />
            編集
          </Link>
        </div>
      }
      description={
        wordbook?.description && (
          <div className={styles.wordbookDescription}>
            <p>{wordbook.description}</p>
            <p>登録単語数：{words.length}</p>
          </div>
        )
      }
      form={
        <form onSubmit={handleSubmit} className={styles.wordCreateForm}>
          <FloatingInput
            id="question"
            type="text"
            label="単語"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            icon={<TbCircleLetterQFilled />}
            error={errors.question} // 🔥
          />

          <FloatingInput
            id="answer"
            type="text"
            label="意味"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            icon={<TbCircleLetterAFilled />}
            error={errors.answer} // 🔥
          />

          <div className={styles.actionButtons}>
            <Button type="submit">単語を登録</Button>
            <ButtonSecondary href={`/wordbooks/${wordbookUuid}/test`}>
              今すぐはじめる
            </ButtonSecondary>
          </div>
        </form>
      }
      list={
        <ul className={styles.wordList}>
          {words.map((word) => {
            const tagged = isTagged(word.uuid);

            return (
              <li key={word.uuid}>
                <WordCard
                  question={word.question}
                  answer={word.answer}
                  review={tagged}
                  opened={true}
                  deletable={true}
                  onTagToggle={async () => {
                    if (tagged) {
                      if (
                        !confirm("この単語を復習リストの登録から外しますか？")
                      )
                        return;
                      await removeTaggedWord(word.uuid);
                    } else {
                      await addTaggedWord(word.uuid);
                    }
                  }}
                  onDelete={() => deleteWord(word.uuid)}
                />
              </li>
            );
          })}
        </ul>
      }
    />
  );
}
