"use client";
import styles from "./DailyWord.module.css";
import { IoBulbOutline } from "react-icons/io5";
import { SectionTitle } from "../common/ui/SectionTitle";

export const DailyWord = () => {
  // 仮のwords
  const words = [{ question: "open", answer: "開く" }];
  const dairy = words[0];

  return (
    <section className={styles.dairySection}>
      <SectionTitle
        icon={IoBulbOutline}
        subTitle="Today’s Vocab"
        title="今日の一問"
      />

      <div className={styles.dairyWordContainer}>
        <div className={styles.dairyWord}>{dairy.question}</div>

      </div>
    </section>
  );
}
