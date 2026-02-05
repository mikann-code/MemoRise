"use client";

import Link from "next/link";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked } from "react-icons/lu";
import { AiOutlineBook } from "react-icons/ai";
import styles from "./page.module.css";
import { usePublicWordbooks } from "@/src/hooks/usePublicWordbooks";
import { WORDBOOK_LABELS } from "@/src/constants/wordbookLabels";

export default function BasicWordsPage() {
  const { wordbooks, loading, error } = usePublicWordbooks();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>取得に失敗しました</p>;

  return (
    <div className={styles.container}>
      <SectionTitle
        icon={LuBookMarked}
        title="公式単語集"
        subTitle="Basic Words"
      />

      {WORDBOOK_LABELS.map((label) => {
        if (label.value === "none") return null;

        const items = wordbooks.filter((wb) => wb.label === label.value);

        return (
          <section key={label.value} className={styles.labelSection}>
            <h3 className={styles.labelTitle}>
              <span className={styles.bar} />
              {label.label}
              <span className={styles.count}>({items.length})</span>
            </h3>

            {items.length === 0 ? (
              <p className={styles.empty}>
                このカテゴリの公式単語集は準備中です。
              </p>
            ) : (
              <div className={styles.basicWordsBoxContainer}>
                {items.map((item) => (
                  <Link
                    key={item.uuid}
                    href={`/basicWord/${item.uuid}`}
                    className={styles.basicWordsBoxLink}
                  >
                    <AiOutlineBook className={styles.basicWordsBox} />

                    <p className={styles.basicWordsBoxLabel}>{item.title}</p>
                    <p className={styles.basicWordsBoxLevel}>{item.level}</p>
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
