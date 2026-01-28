"use client";

import React from "react";
import styles from "./BasicWord.module.css";
import { HiOutlineClipboardList } from "react-icons/hi";
import { SectionTitle } from "../common/ui/SectionTitle";
import { AiOutlineBook } from "react-icons/ai";
import Link from "next/link";
import { usePublicWordbooks } from "@/src/hooks/usePublicWordbooks";

export const BasicWord = () => {
  const { wordbooks, loading, error } = usePublicWordbooks();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>取得に失敗しました</p>;
  if (wordbooks.length === 0) return <p>単語帳がありません</p>;

  return (
    <section className={styles.basicSection}>
      <SectionTitle
        icon={HiOutlineClipboardList}
        subTitle="Vocabulary & Practice"
        title="おすすめの単語・問題集"
      />

      <div className={styles.basicWordsBoxContainer}>
        {wordbooks.map((item) => (
          <Link
            key={item.uuid}
            href={`/basicWord/${item.uuid}`}
            className={styles.basicWordsBoxLink}
          >
            <AiOutlineBook className={styles.basicWordsBox} />

            <p className={styles.basicWordsBoxLabel}>
              {item.title}
            </p>
            
          </Link>
        ))}
      </div>
    </section>
  );
};
