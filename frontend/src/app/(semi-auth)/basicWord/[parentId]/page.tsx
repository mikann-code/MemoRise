"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import styles from "./page.module.css";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { FaListUl } from "react-icons/fa6";
import { Button } from "@/src/components/common/ui/Button";
import { HiLockClosed } from "react-icons/hi";
import { usePublicWordbookChildren } from "@/src/hooks/usePublicWordbookChildren";
import { useProgress } from "@/src/hooks/useProgress";

export default function BasicWordDetailPage() {
  const { parentId } = useParams<{ parentId: string }>();

  // ① Part 構造（表示用）
  const {
    children,
    loading: childrenLoading,
    error: childrenError,
  } = usePublicWordbookChildren(parentId);

  // ② Part 状態（unlocked / completed）
  const {
    data: progresses = [],
    isLoading: progressLoading,
    error: progressError,
  } = useProgress(parentId);

  if (childrenLoading || progressLoading) return <p>読み込み中...</p>;
  if (childrenError || progressError) return <p>取得に失敗しました</p>;
  if (!children || children.length === 0) {
    return (
      <div>
        <h2>😢 教材が見つかりません</h2>
        <p>{parentId} の教材データがありません。</p>
        <Link href="/">← 一覧へ戻る</Link>
      </div>
    );
  }

  const progressMap = new Map(progresses.map((p) => [p.wordbook_uuid, p]));
  const parts = children.map((child) => {
    const progress = progressMap.get(child.uuid);

    return {
      ...child,
      unlocked: progress?.unlocked ?? false,
      completed: progress?.completed ?? false,
    };
  });

  const firstUnlocked = parts.find((p) => p.unlocked);

  return (
    <>
      <SectionTitle
        icon={HiOutlineClipboardCheck}
        subTitle="Words Overview"
        title="公式単語集"
      />
      <p className={styles.description}>
        各 Part の単語リストはいつでも確認できます。
        <br />
        テストを完了すると、次の Part が順番に解放されていきます。
      </p>

      {firstUnlocked && (
        <Button href={`/basicWord/${parentId}/${firstUnlocked.uuid}/test`}>
          今すぐはじめる
        </Button>
      )}

      <div className={styles.viewLevelSelection}>
        {parts.map((part, index) => (
          <div
            key={part.uuid}
            className={`${styles.viewOption} ${
              part.completed ? styles.lineActive : ""
            }`}
          >
            {part.unlocked ? (
              <Link
                href={`/basicWord/${parentId}/${part.uuid}/test`}
                className={styles.viewOptionLink}
              >
                <span
                  className={`${styles.viewOptionNum} ${
                    part.completed
                      ? styles.completedNum
                      : part.unlocked
                        ? styles.unlockedNum
                        : ""
                  }`}
                >
                  {index + 1}
                </span>
                <h3 className={styles.viewOptionTitle}>{part.part}</h3>
              </Link>
            ) : (
              <div className={`${styles.viewOptionLink} ${styles.locked}`}>
                <div className={styles.viewOptionNum}>
                  <span className={styles.viewOptionLockedNum}>
                    {index + 1}
                  </span>
                  <HiLockClosed className={styles.lockIcon} />
                </div>
                <h3 className={styles.viewOptionTitle}>{part.part}</h3>
              </div>
            )}

            {/* 一覧表示は常にOK */}
            {part.unlocked || part.completed ? (
              <Link href={`/basicWord/${parentId}/${part.uuid}/list`}>
                <FaListUl
                  className={`${styles.viewListIcon} ${
                    part.completed ? styles.listCompleted : styles.listUnlocked
                  }`}
                />
              </Link>
            ) : (
              <span className={`${styles.viewListIcon} ${styles.listLocked}`}>
                <FaListUl />
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
