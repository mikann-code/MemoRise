"use client";

import React, { useRef, useState, useEffect } from "react";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { PiNotePencilDuotone } from "react-icons/pi";
import styles from "./Test.module.css";
import { JudgeButtons } from "@/src/components/common/ui/JudgeButtons";
import { Button } from "@/src/components/common/ui/Button";
import { WordCard } from "@/src/components/common/card/WordCard";
import { usePostStudyRecord } from "@/src/hooks/usePostStudyRecord";
import { useTaggedWords } from "@/src/hooks/useTaggedWords";
import { useCompleteWordbook } from "@/src/hooks/useProgress";

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

  const { taggedWords, addTaggedWord, removeTaggedWord } = useTaggedWords();
  const { mutate: postStudyRecord } = usePostStudyRecord();
  const { mutate: completeWordbook } = useCompleteWordbook(parentId);
  const hasPostedRef = useRef(false);

  const total = words.length;
  const currentNumber = currentIndex + 1;
  const answeredCount = currentIndex;
  const rate =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const currentWord = words[currentIndex];
  const isTagged = taggedWords.some((tw) => tw.word_uuid === currentWord?.uuid);

  const handleTagToggle = async () => {
    if (!currentWord) return;

    if (isTagged) {
      await removeTaggedWord(currentWord.uuid);
    } else {
      await addTaggedWord(currentWord.uuid);
    }
  };

  useEffect(() => {
    if (currentIndex >= total && total > 0 && !hasPostedRef.current) {
      hasPostedRef.current = true;

      const today = new Date().toISOString().slice(0, 10);
      const finalRate =
        total > 0 ? Math.round((correctCount / total) * 100) : 0;

      postStudyRecord({
        study_date: today,
        rate: finalRate,
        count: total,
        correct_count: correctCount,
        children_id: childrenId,
      });

      completeWordbook(childrenId);
    }
  }, [
    currentIndex,
    total,
    correctCount,
    childrenId,
    postStudyRecord,
    completeWordbook,
  ]);

  const next = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setOpened(false);
    } else {
      setCurrentIndex(total);
    }
  };

  const handleCorrect = () => {
    setCorrectCount((prev) => prev + 1);
    next();
  };

  const handleWrong = async () => {
    if (!isTagged) {
      await addTaggedWord(currentWord.uuid);
    }

    setWrongQuestions((prev) => [...prev, currentWord]);
    next();
  };

  const handleToggleAnswer = () => {
    setOpened((prev) => !prev);
  };

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
                {total} / {total} 問目
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
            {wrongQuestions.map((w) => {
              const tagged = taggedWords.some((tw) => tw.word_uuid === w.uuid);

              const handleResultTagToggle = async () => {
                if (tagged) {
                  await removeTaggedWord(w.uuid);
                } else {
                  await addTaggedWord(w.uuid);
                }
              };

              return (
                <WordCard
                  key={w.uuid}
                  question={w.question}
                  answer={w.answer}
                  review={tagged}
                  opened={true}
                  onTagToggle={handleResultTagToggle}
                  onDelete={() => {}}
                  deletable={false}
                />
              );
            })}
          </div>

          <div className={styles.buttonWrapper}>
            <Button href="./list">一覧に戻る</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionTitle
        icon={PiNotePencilDuotone}
        subTitle="Words Test"
        title="単語テスト"
      />

      <div className={styles.testCard}>
        <div className={styles.progressWrapper}>
          <div className={styles.progressInfo}>
            <span>
              {currentNumber} / {total} 問目
            </span>
            <span>正答率 {rate}%</span>
          </div>

          <progress
            className={styles.progressBar}
            value={answeredCount}
            max={total}
          />
        </div>

        <WordCard
          question={currentWord.question}
          answer={currentWord.answer}
          review={isTagged}
          opened={opened}
          onTagToggle={handleTagToggle}
          onDelete={() => {}}
          deletable={false}
        />

        <div className={styles.actions}>
          <Button onClick={handleToggleAnswer} disabled={opened}>
            {opened ? "答えを表示中" : "答えを見る"}
          </Button>

          <div className={styles.judgeButtons}>
            <JudgeButtons
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              disabled={!opened}
            />
          </div>
        </div>
      </div>
    </>
  );
}
