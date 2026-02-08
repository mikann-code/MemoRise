"use client";

import { useState } from "react";
import styles from "./DailyWord.module.css";
import { IoBulbOutline } from "react-icons/io5";
import { SectionTitle } from "../common/ui/SectionTitle";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useTaggedWords } from "@/src/hooks/useTaggedWords";
import { useTodayWord } from "@/src/hooks/useTodayWord";
import { fallbackWords } from "@/src/constants/fallbackWords";

export const DailyWord = () => {
  const { taggedWords } = useTaggedWords();
  const { todayWord, loading } = useTodayWord();

  const [fallback] = useState(
    () => fallbackWords[Math.floor(Math.random() * fallbackWords.length)]
  );

  const word = todayWord ?? fallback;

  return (
    <section className={styles.dairySection}>
      <div className={styles.headerRow}>
        <SectionTitle
          icon={IoBulbOutline}
          subTitle="Today’s Vocab"
          title="今日の一問"
        />
        <Link href="/wordbooks/review" className={styles.reviewButton}>
          <FaStar /> 復習単語 ( {taggedWords.length} )
        </Link>
      </div>

      <div className={styles.dairyWordContainer}>
        {loading ? (
          <div className={styles.dairyWord}>読み込み中...</div>
        ) : (
          <>
            <div className={styles.dairyWord}>{word.question}</div>
            <div className={styles.dairyAnswer}>{word.answer}</div>
          </>
        )}
      </div>
    </section>
  );
};
