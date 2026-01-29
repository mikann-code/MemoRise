"use client";

import React from "react";
import { useParams } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaListUl } from "react-icons/fa6";
import { Button } from "@/src/components/common/ui/Button";
import { WordCard } from "@/src/components/common/card/WordCard";
import styles from "./page.module.css";
import { usePublicWords } from "@/src/hooks/usePublicWords";

export default function WordListPage() {
  // parentId = 親単語帳 uuid（戻る用）
  // childrenId = 子単語帳 uuid（単語取得に使用）
  const { parentId, childrenId } = useParams<{
    parentId: string;
    childrenId: string;
  }>();

  // ✅ 子単語帳に紐づく単語を取得
  const { words, loading, error } = usePublicWords(childrenId);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>単語の取得に失敗しました</div>;

  return (
    <>
      <SectionTitle
        icon={FaListUl}
        subTitle="Words List"
        title="単語一覧"
      />

      <div className={styles.listButtonContainer}>
        <Button href={`/basicWord/${parentId}`}>教材トップに戻る</Button>
        <Button href={`/basicWord/${parentId}/${childrenId}/test`}>
          今すぐはじめる
        </Button>
      </div>

      <div className={styles.listContainer}>
        {words.map((word) => (
          <WordCard
            key={word.uuid}
            question={word.question}
            answer={word.answer}
            pos={[]}       // 品詞を使わないので空配列
            opened={true}
            onToggle={() => {}}
            onNext={() => {}}
          />
        ))}
      </div>
    </>
  );
}
