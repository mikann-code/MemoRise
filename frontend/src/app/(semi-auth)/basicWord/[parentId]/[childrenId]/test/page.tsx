"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { PiNotePencilDuotone } from "react-icons/pi";
import styles from "./page.module.css";
import { Button } from "@/src/components/common/ui/Button";
import { TestCard } from "@/src/components/common/card/TestCard";
import { usePublicWords } from "@/src/hooks/usePublicWords";
import { usePostStudyRecord } from "@/src/hooks/usePostStudyRecord";

export default function BasicWordTestPage() {
  const { parentId, childrenId } = useParams<{
    parentId: string;
    childrenId: string;
  }>();

  // 単語取得
  const { words: fetchedWords, loading, error } = usePublicWords(childrenId);

  const [words, setWords] = useState<typeof fetchedWords>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<typeof fetchedWords>([]);

  const { mutate: postStudyRecord } = usePostStudyRecord();

  // ★ 二重POST防止フラグ
  const hasPostedRef = useRef(false);

  const total = words.length;

  const shuffleArray = (arr: typeof fetchedWords) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // 単語ロード時に初期化
  useEffect(() => {
    if (!fetchedWords || fetchedWords.length === 0) return;

    const shuffled = shuffleArray(fetchedWords);
    setWords(shuffled);
    setCurrentIndex(0);
    setOpened(false);
    setCorrectCount(0);
    setWrongQuestions([]);
    hasPostedRef.current = false; // 再挑戦時にリセット
  }, [fetchedWords]);

  // ★ テスト終了時に学習記録をPOST
  useEffect(() => {
    if (currentIndex >= total && total > 0 && !hasPostedRef.current) {
      hasPostedRef.current = true; // 二重送信防止

      const today = new Date().toISOString().slice(0, 10);
      const rate = Math.round((correctCount / total) * 100);

      postStudyRecord({
        study_date: today,
        total_count: total,
        title: `basicWord ${childrenId}`,
        rate: rate,
        count: total,
        children_id: childrenId,
      });
    }
  }, [currentIndex, total, correctCount, childrenId, postStudyRecord]);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>単語の取得に失敗しました</div>;
  if (!words || words.length === 0) return <div>単語がありません</div>;

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

  const handleTagToggle = () => {
    setWords((prev) =>
      prev.map((w, i) =>
        i === currentIndex ? { ...w, review: !w.review } : w
      )
    );
  };

  const handleToggleAnswer = () => {
    setOpened((prev) => !prev);
  };

  // ===== 結果画面 =====
  if (currentIndex >= total) {
    return (
      <>
        <SectionTitle
          icon={PiNotePencilDuotone}
          subTitle="Result"
          title="テスト結果"
        />

        <div className={styles.testResultCard}>
          <p className={styles.testScoreFinal}>
            {correctCount} / {total}
          </p>

          <p className={styles.testScoreRateFinal}>
            正答率：{((correctCount / total) * 100).toFixed(2)}%
          </p>

          {wrongQuestions.map((w, idx) => (
            <TestCard
              key={idx}
              question={w.question}
              answer={w.answer}
              pos={w.pos || []}
              review={w.review}
              opened={true}
              onTagToggle={() => {}}
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

  // ===== 出題中画面 =====
  return (
    <>
      <SectionTitle
        icon={PiNotePencilDuotone}
        subTitle="Words Test"
        title="単語テスト"
      />

      <div className={styles.testButtons}>
        <Button href={`/basicWord/${parentId}`}>教材トップへ戻る</Button>
        <Button href={`/basicWord/${parentId}/${childrenId}/list`}>
          単語一覧へ戻る
        </Button>
      </div>

      <div className={styles.testScoreContainer}>
        <p className={styles.testScoreCount}>
          {currentIndex + 1} / {total}
        </p>

        <p className={styles.testScoreRate}>
          正答率：
          {currentIndex > 0
            ? ((correctCount / currentIndex) * 100).toFixed(2)
            : "0.00"}
          %
        </p>
      </div>

      <TestCard
        question={currentWord.question}
        answer={currentWord.answer}
        pos={currentWord.pos || []}
        review={currentWord.review}
        opened={opened}
        onTagToggle={handleTagToggle}
      />

      <div className={styles.answerToggleWrapper}>
        <button
          className={styles.answerToggleButton}
          onClick={handleToggleAnswer}
        >
          {opened ? "答えを隠す" : "答えを見る"}
        </button>
      </div>

      <div className={styles.judgeButtons}>
        <button
          className={styles.correctButton}
          onClick={handleCorrect}
          type="button"
        >
          正解！
        </button>
        <button
          className={styles.wrongButton}
          onClick={handleWrong}
          type="button"
        >
          不正解
        </button>
      </div>
    </>
  );
}
