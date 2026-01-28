"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked } from "react-icons/lu";
import styles from "./page.module.css";
import Link from "next/link";

import { useAdminWordbooks } from "@/src/hooks/useAdminWordbooks";
import { useAdminWordbookChildren } from "@/src/hooks/useAdminWordbookChildren";

export default function AdminWordbookDetailPage() {
  const { parentId } = useParams<{ parentId: string }>();

  // 親一覧（index）
  const { wordbooks, loading, error } = useAdminWordbooks();

  // 子（Part 一覧）
  const {
    children,
    loading: childrenLoading,
    error: childrenError,
  } = useAdminWordbookChildren(parentId);

  // id(uuid) に基づいて親単語帳取得
  const wordbook = useMemo(() => {
    return wordbooks.find((wb) => wb.uuid === parentId);
  }, [wordbooks, parentId]);

  if (loading) return <p>読み込み中...</p>;
  if (error || !wordbook) return <p>単語帳が見つかりません</p>;

  return (
    <>
      <SectionTitle
        icon={LuBookMarked}
        subTitle="Admin Wordbook"
        title={wordbook.title}
      />

      {wordbook.description && (
        <p className={styles.description}>{wordbook.description}</p>
      )}

      <p className={styles.meta}>
        {wordbook.label} / {wordbook.level}
      </p>

      {/* ======================
          Part（子 wordbook 一覧）
      ====================== */}
      <div className={styles.filterBox}>
        <div className={styles.filterItem}>
          <label>Part</label>

          {childrenLoading && <p>読み込み中...</p>}
          {childrenError && <p>Part の取得に失敗しました</p>}

          {!childrenLoading && children.length === 0 && (
            <p>Part はまだありません</p>
          )}

          <ul className={styles.partList}>
            {children.map((child) => (
              <li key={child.uuid} className={styles.partItem}>
                <Link href={`/admin/wordbooks/${parentId}/${child.uuid}`}>
                  {child.part}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
