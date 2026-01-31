"use client";
import styles from "./DailyWord.module.css";
import { IoBulbOutline } from "react-icons/io5";
import { SectionTitle } from "../common/ui/SectionTitle";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useTaggedWords } from "@/src/hooks/useTaggedWords";

export const DailyWord = () => {
  const { taggedWords, addTaggedWord, removeTaggedWord } = useTaggedWords();

  const words = [{ question: "open", answer: "開く" }];
  const dairy = words[0];

  return (
    <section className={styles.dairySection}>
      <div className={styles.headerRow}>
        <SectionTitle
          icon={IoBulbOutline}
          subTitle="Today’s Vocab"
          title="今日の一問"
        />
        <Link href="/wordbooks/review" className={styles.reviewButton}>
           <FaStar /> 復習単語 {taggedWords.length + 1}
        </Link>
      </div>

      <div className={styles.dairyWordContainer}>
        <div className={styles.dairyWord}>{dairy.question}</div>
      </div>
    </section>
  );
};
