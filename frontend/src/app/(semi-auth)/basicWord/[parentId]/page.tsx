"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import styles from "./page.module.css";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { FaListUl } from "react-icons/fa6";
import { Button } from "@/src/components/common/ui/Button";
import { usePublicWordbookChildren } from "@/src/hooks/usePublicWordbookChildren";
import { useProgress } from "@/src/hooks/useProgress"; // ★ 追加

export default function BasicWordDetailPage() {
  const { parentId } = useParams<{ parentId: string }>();

  // children（Part一覧）
  const { children, loading, error } = usePublicWordbookChildren(parentId);

  // progress（進捗）
  const { data: progresses = [], isLoading: progressLoading } = useProgress();

  if (loading || progressLoading) return <p>読み込み中...</p>;
  if (error) return <p>取得に失敗しました</p>;
  if (!children || children.length === 0) {
    return (
      <div>
        <h2>😢 教材が見つかりません</h2>
        <p>{parentId} の教材データがありません。</p>
        <Link href="/">← 一覧へ戻る</Link>
      </div>
    );
  }

  console.log("progresses:", progresses);

  // 「今すぐはじめる」は最初のPart
  const firstChildId = children[0].uuid;

  return (
    <>
      <SectionTitle
        icon={HiOutlineClipboardCheck}
        subTitle="Words Overview"
        title="公式単語集"
      />

      <Button href={`/basicWord/${parentId}/${firstChildId}/test`}>
        今すぐはじめる
      </Button>

      <div className={styles.viewLevelSelection}>
        {children.map((child, index) => {
          const progress = progresses.find((p) => p.wordbook_id === child.id);
          const isCompleted = progress?.completed;

          const prev = children[index - 1];
          const prevProgress = prev
            ? progresses.find((p) => p.wordbook_id === prev.id)
            : null;

          // 解放条件：最初 or 前のPartがcompleted
          const isUnlocked = index === 0 || prevProgress?.completed;

          return (
            <div key={child.uuid} className={styles.viewOption}>
              {isUnlocked ? (
                <Link
                  href={`/basicWord/${parentId}/${child.uuid}/test`}
                  className={styles.viewOptionLink}
                >
                  <span
                    className={`${styles.viewOptionNum} ${
                      isCompleted ? styles.completedNum : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                  <h3 className={styles.viewOptionTitle}>{child.part}</h3>
                </Link>
              ) : (
                <div className={styles.locked}>
                  <span className={styles.viewOptionNum}>{index + 1}</span>
                  <h3 className={styles.viewOptionTitle}>🔒 {child.part}</h3>
                </div>
              )}

              {/* 一覧表示は常にOK */}
              <Link href={`/basicWord/${parentId}/${child.uuid}/list`}>
                <FaListUl className={styles.viewListIcon} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
