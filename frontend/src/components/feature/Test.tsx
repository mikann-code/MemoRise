"use client";

import React, { useRef, useState, useEffect } from "react";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { PiNotePencilDuotone } from "react-icons/pi";
import styles from "./Test.module.css";
import { JudgeButtons } from "@/src/components/common/ui/JudgeButtons";
import { Button } from "@/src/components/common/ui/Button";
import { WordCard } from "@/src/components/common/card/WordCard";
import { usePostStudyRecord } from "@/src/hooks/usePostStudyRecord";

type PublicWord = {
  uuid: string;
  question: string;
  answer: string;
  pos?: string[];
};

type TestWord = PublicWord & { review: boolean };

type Props = {
  parentId: string;
  childrenId: string;
  words: TestWord[];
};

export default function TestBody({ parentId, childrenId, words }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<TestWord[]>([]);

  const { mutate: postStudyRecord } = usePostStudyRecord();
  const hasPostedRef = useRef(false);

  const total = words.length;
  const currentNumber = currentIndex + 1;
  const rate =
    currentNumber > 0 ? Math.round((correctCount / currentNumber) * 100) : 0;

  useEffect(() => {
    if (currentIndex >= total && total > 0 && !hasPostedRef.current) {
      hasPostedRef.current = true;

      const today = new Date().toISOString().slice(0, 10);

      postStudyRecord({
        study_date: today,
        total_count: total,
        title: `basicWord ${childrenId}`,
        rate,
        count: total,
        children_id: childrenId,
      });
    }
  }, [currentIndex, total, correctCount, childrenId, postStudyRecord, rate]);

  const currentWord = words[currentIndex];

  const next = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setOpened(false);
    } else {
      setCurrentIndex(total);
    }
  };

  // ★ 最後の問題では分子を増やさない
  const handleCorrect = () => {
    if (currentIndex >= total - 1) {
      next();
      return;
    }

    setCorrectCount((prev) => prev + 1);
    next();
  };

  const handleWrong = () => {
    if (currentIndex >= total - 1) {
      next();
      return;
    }

    setWrongQuestions((prev) => [...prev, currentWord]);
    next();
  };

  const handleToggleAnswer = () => {
    setOpened((prev) => !prev);
  };

  // ===== 終了画面 =====
  if (currentIndex >= total) {
    return (
      <>
        <SectionTitle
          icon={PiNotePencilDuotone}
          subTitle="Result"
          title="テスト結果"
        />

        <div className={styles.resultCard}>
          <div className={styles.progressWrapper}>
            <div className={styles.progressInfo}>
              <span>
                {currentNumber} / {total} 問目
              </span>
              <span>正答率 {rate}%</span>
            </div>

            <progress
              className={styles.progressBar}
              value={total}
              max={total}
            />
          </div>

          <div className={styles.wrongList}>
            {wrongQuestions.map((w, idx) => (
              <WordCard
                key={idx}
                question={w.question}
                answer={w.answer}
                review={w.review}
                opened={true}
                onTagToggle={() => {}}
                onDelete={() => {}}
                deletable={false}
              />
            ))}
          </div>

          <div className={styles.resultActions}>
            <JudgeButtons onCorrect={handleCorrect} onWrong={handleWrong} />
          </div>
        </div>
      </>
    );
  }

  // ===== テスト中画面 =====
  return (
    <>
      <SectionTitle
        icon={PiNotePencilDuotone}
        subTitle="Words Test"
        title="単語テスト"
      />

      <div className={styles.progressWrapper}>
        <div className={styles.progressInfo}>
          <span>
            {currentNumber} / {total} 問目
          </span>
          <span>正答率 {rate}%</span>
        </div>

        <progress
          className={styles.progressBar}
          value={currentIndex}
          max={total}
        />
      </div>

      <WordCard
        question={currentWord.question}
        answer={currentWord.answer}
        review={currentWord.review}
        opened={opened}
        onTagToggle={() => {}}
        onDelete={() => {}}
        deletable={false}
      />

      <div className={styles.actions}>
        <Button onClick={handleToggleAnswer}>
          {opened ? "答えを隠す" : "答えを見る"}
        </Button>

        <div className={styles.judgeButtons}>
          <JudgeButtons onCorrect={handleCorrect} onWrong={handleWrong} />
        </div>
      </div>
    </>
  );
}
