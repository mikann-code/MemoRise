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

export default function BasicWordDetailPage() {
  const { parentId } = useParams<{ parentId: string }>();

  // 親UUIDを使って「子（children）」を取得
  const { children, loading, error } = usePublicWordbookChildren(parentId);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p>取得に失敗しました</p>;
  }

  if (!children || children.length === 0) {
    return (
      <div>
        <h2>😢 教材が見つかりません</h2>
        <p>{parentId} の教材データがありません。</p>
        <Link href="/">← 一覧へ戻る</Link>
      </div>
    );
  }

  // 「今すぐはじめる」は最初の children を使う
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
        {children.map((child, index) => (
          <div key={child.uuid} className={styles.viewOption}>
            {/* part選択（childrenIdベース） */}
            <Link
              href={`/basicWord/${parentId}/${child.uuid}/test`}
              className={styles.viewOptionLink}
            >
              <span className={styles.viewOptionNum}>{index + 1}</span>
              <h3 className={styles.viewOptionTitle}>
                {child.title || child.part}
              </h3>
            </Link>

            {/* 一覧表示 */}
            <Link href={`/basicWord/${parentId}/${child.uuid}/list`}>
              <FaListUl className={styles.viewListIcon} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
