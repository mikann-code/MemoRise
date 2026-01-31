"use client";

import { use, useState, useEffect } from "react";
import { useWords } from "@/src/hooks/useWords";
import { useStudyWordbooks } from "@/src/hooks/useStudyWordbooks";
import { useWordbooks, useWordbook } from "@/src/hooks/useWordbooks"; // ⭐ 追加
import { useQueryClient } from "@tanstack/react-query";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaListUl, FaTrash } from "react-icons/fa6";
import styles from "./page.module.css";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { TbCircleLetterQFilled, TbCircleLetterAFilled } from "react-icons/tb";
import { Button } from "@/src/components/common/ui/Button";
import { WordCard } from "@/src/components/common/card/WordCard";
import { useRouter } from "next/navigation";
import { WordbookListLayout } from "@/src/components/layout/WordbookListLayout";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function WordbookDetailPage({ params }: Props) {
  const router = useRouter();
  const { id: wordbookUuid } = use(params);

  const { wordbook, loading: wordbookLoading } = useWordbook(wordbookUuid);

  const { words, loading, error, addWord, deleteWord } = useWords(wordbookUuid);
  const { deleteWordbook } = useWordbooks();

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

  const handleDeleteWordbook = async () => {
    const ok = confirm(
      "この単語帳を削除しますか？\n中の単語もすべて削除されます。",
    );
    if (!ok) return;

    await deleteWordbook(wordbookUuid);
    router.push("/wordbooks");
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

          <button
            className={styles.deleteWordbookButton}
            onClick={handleDeleteWordbook}
          >
            <FaTrash />
            単語帳を削除
          </button>
        </div>
      }
      description={
        wordbook?.description && (
          <div  className={styles.wordbookDescription}>
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
          />

          <FloatingInput
            id="answer"
            type="text"
            label="意味"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            icon={<TbCircleLetterAFilled />}
          />

          <Button type="submit">単語を登録</Button>
        </form>
      }
      list={
        <ul className={styles.wordList}>
          {words.map((word) => (
            <li key={word.uuid}>
              <WordCard
                question={word.question}
                answer={word.answer}
                review={false}
                opened={true}
                deletable={true}
                onTagToggle={() => {}}
                onDelete={() => deleteWord(word.uuid)}
              />
            </li>
          ))}
        </ul>
      }
    />
  );
}
