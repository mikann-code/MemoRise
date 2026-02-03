"use client";
import React from "react";
import { useParams } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaListUl } from "react-icons/fa6";
import { Button } from "@/src/components/common/ui/Button";
import { ButtonSecondary } from "@/src/components/common/ui/ButtonSecondary";
import { WordCard } from "@/src/components/common/card/WordCard";
import styles from "./page.module.css";
import { usePublicWords } from "@/src/hooks/usePublicWords";
import { usePublicWordbook } from "@/src/hooks/usePublicWordbooks";
import { useTaggedWords } from "@/src/hooks/useTaggedWords"; 

export default function WordListPage() {
  const { parentId, childrenId } = useParams<{
    parentId: string;
    childrenId: string;
  }>();

  const { wordbook, loading: wordbookLoading } = usePublicWordbook(childrenId);
  const { words, loading, error } = usePublicWords(childrenId);
  const { taggedWords, addTaggedWord, removeTaggedWord } = useTaggedWords(); 

  if (loading || wordbookLoading) return <div>読み込み中...</div>;
  if (error) return <div>単語の取得に失敗しました</div>;
  if (!wordbook) return <div>単語帳が見つかりません</div>;

  const isTagged = (wordUuid: string) => {
    return taggedWords.some((t) => t.word_uuid === wordUuid);
  };

  return (
    <>
      <SectionTitle
        icon={FaListUl}
        subTitle="Words List"
        title={`${wordbook.title} ${wordbook.part}`}
      />

      <div className={styles.description}>
        <p>{wordbook.description}</p>
        <p>登録単語数：{words.length}</p>
      </div>

      <div className={styles.listButtonContainer}>
        <Button href={`/basicWord/${parentId}`}>教材トップに戻る</Button>
        <ButtonSecondary href={`/basicWord/${parentId}/${childrenId}/test`}>
          今すぐはじめる
        </ButtonSecondary>
      </div>

      {words.map((word) => {
        const tagged = isTagged(word.uuid);

        return (
          <WordCard
            key={word.uuid}
            question={word.question}
            answer={word.answer}
            opened={true}
            review={tagged} 
            onTagToggle={async () => {
              if (tagged) {
                if (!confirm("この単語を復習リストから外しますか？")) return;
                await removeTaggedWord(word.uuid);
              } else {
                await addTaggedWord(word.uuid);
              }
            }}
            onDelete={() => {}}
            deletable={false}
          />
        );
      })}
    </>
  );
}
