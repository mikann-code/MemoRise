"use client";

import React, { useRef, useState, useEffect } from "react";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { PiNotePencilDuotone } from "react-icons/pi";
import styles from "./Test.module.css";
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

export default function TestBody({
  parentId,
  childrenId,
  words,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<TestWord[]>([]);

  const { mutate: postStudyRecord } = usePostStudyRecord();
  const hasPostedRef = useRef(false);
  const total = words.length;

  useEffect(() => {
    if (currentIndex >= total && total > 0 && !hasPostedRef.current) {
      hasPostedRef.current = true;

      const today = new Date().toISOString().slice(0, 10);
      const rate = Math.round((correctCount / total) * 100);

      postStudyRecord({
        study_date: today,
        total_count: total,
        title: `basicWord ${childrenId}`,
        rate,
        count: total,
        children_id: childrenId,
      });
    }
  }, [currentIndex, total, correctCount, childrenId, postStudyRecord]);

  const currentWord = words[currentIndex];

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

  const handleWrong = () => {
    setWrongQuestions((prev) => [...prev, currentWord]);
    next();
  };

  const handleToggleAnswer = () => {
    setOpened((prev) => !prev);
  };

  if (currentIndex >= total) {
    return (
      <>
        <SectionTitle icon={PiNotePencilDuotone} subTitle="Result" title="テスト結果" />
        <div className={styles.testResultCard}>
          <p>{correctCount} / {total}</p>

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

          <Button href={`/basicWord/${parentId}`}>教材トップへ戻る</Button>
          <Button href={`/basicWord/${parentId}/${childrenId}/test`}>
            もう一度挑戦する
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionTitle icon={PiNotePencilDuotone} subTitle="Words Test" title="単語テスト" />

      <WordCard
        question={currentWord.question}
        answer={currentWord.answer}
        review={currentWord.review}
        opened={opened}
        onTagToggle={() => {}}
        onDelete={() => {}}
        deletable={false}
      />

      <button onClick={handleToggleAnswer}>
        {opened ? "答えを隠す" : "答えを見る"}
      </button>
      <button onClick={handleCorrect}>正解！</button>
      <button onClick={handleWrong}>不正解</button>
    </>
  );
}
