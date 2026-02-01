"use client";

import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { WordCard } from "@/src/components/common/card/WordCard";
import { ErrorCard } from "@/src/components/common/card/ErrorCard";
import { useTaggedWords } from "@/src/hooks/useTaggedWords";
import { WordbookListLayout } from "@/src/components/layout/WordbookListLayout";
import styles from "./page.module.css";
import { VscTag } from "react-icons/vsc";

export default function ReviewPage() {
  const { taggedWords, removeTaggedWord, isLoading, isError } =
    useTaggedWords();

  if (isLoading) return <p>読み込み中...</p>;
  if (isError) return <p>復習単語の取得に失敗しました</p>;

  return (
    <WordbookListLayout
      header={
        <SectionTitle
          icon={VscTag}
          title="復習単語"
          subTitle="Tagged Words for Review"
        />
      }
      description={
        <div className={styles.description}>
          <p>タグを付けた単語をまとめて復習できます。</p>
          <p>登録単語数：{taggedWords.length}語</p>
        </div>
      }
      list={
        taggedWords.length === 0 ? (
          <ErrorCard
            text={
              <>
                まだ復習単語がありません。
                <br />
                単語一覧から <VscTag className={styles.tagIcon}/>{" "}
                を押して追加してください。
              </>
            }
            buttonLabel="単語帳を見る"
            href="/"
          />
        ) : (
          <ul className={styles.wordList}>
            {taggedWords.map((t) => (
              <li key={t.id}>
                <WordCard
                  question={t.question}
                  answer={t.answer}
                  review={true}
                  opened={true}
                  deletable={false}
                  onTagToggle={async () => {
                    await removeTaggedWord(t.word_uuid);
                  }}
                  onDelete={() => {}}
                />
              </li>
            ))}
          </ul>
        )
      }
    />
  );
}
