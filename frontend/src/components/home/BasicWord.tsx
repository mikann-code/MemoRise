"use client";

import React from "react";
import styles from "./BasicWord.module.css";
import { HiOutlineClipboardList } from "react-icons/hi";
import { SectionTitle } from "../common/ui/SectionTitle";
import { AiOutlineBook } from "react-icons/ai";
import Link from "next/link";
import { usePublicWordbooks } from "@/src/hooks/usePublicWordbooks";
import { FaListUl } from "react-icons/fa";

export const BasicWord = () => {
  const { wordbooks, loading, error } = usePublicWordbooks();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>取得に失敗しました</p>;
  if (wordbooks.length === 0) return <p>単語帳がありません</p>;

  return (
    <section className={styles.basicSection}>
      <div className={styles.basicHeaderRow}>
        <SectionTitle
          icon={HiOutlineClipboardList}
          subTitle="Vocabulary & Practice"
          title="公式単語帳"
        />
        <Link href="/basicWordList" className={styles.archiveButton}>
          <FaListUl /> 一覧を見る
        </Link>
      </div>

      <div className={styles.basicWordsBoxContainer}>
        {wordbooks.map((item) => (
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
    </section>
  );
};
