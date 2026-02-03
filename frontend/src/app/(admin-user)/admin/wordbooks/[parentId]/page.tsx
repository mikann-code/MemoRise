"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked, LuPlus } from "react-icons/lu";
import styles from "./page.module.css";
import Link from "next/link";

import { useAdminWordbooks } from "@/src/hooks/useAdminWordbooks";
import { useAdminWordbookChildren } from "@/src/hooks/useAdminWordbookChildren";

import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import { WordbookListLayout } from "@/src/components/layout/WordbookListLayout";

export default function AdminWordbookDetailPage() {
  const { parentId } = useParams<{ parentId: string }>();

  // 親一覧（表示用）＋ 作成用
  const { wordbooks, loading, error, addWordbook, creating } =
    useAdminWordbooks();

  // 子一覧
  const {
    children = [],
    loading: childrenLoading,
    error: childrenError,
  } = useAdminWordbookChildren(parentId);

  const [part, setPart] = useState("");

  // 親単語帳取得
  const wordbook = useMemo(() => {
    return wordbooks.find((wb) => wb.uuid === parentId);
  }, [wordbooks, parentId]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>単語帳の取得に失敗しました</p>;
  if (!wordbook) return <p>単語帳が見つかりません</p>;

  // Part（子単語帳）作成
  const handleCreatePart = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!part) {
      alert("Part を入力してください");
      return;
    }

    try {
      await addWordbook({
        title: wordbook.title,
        description: wordbook.description,
        label: wordbook.label,
        level: wordbook.level,
        part: part,
        parent_uuid: parentId, // ← 親uuidを指定
      });

      setPart("");
    } catch {
      alert("Part の作成に失敗しました");
    }
  };

  return (
    <WordbookListLayout
      header={
        <div className={styles.headerRow}>
          <SectionTitle
            icon={LuBookMarked}
            subTitle="Admin Wordbook"
            title={wordbook.title}
          />

          <div className={styles.metaTags}>
            <span className={styles.labelTag}>{wordbook.label}</span>
            <span className={styles.levelTag}>{wordbook.level}</span>
          </div>
        </div>
      }
      description={
        <>
          {wordbook.description && (
            <p className={styles.description}>{wordbook.description}</p>
          )}
        </>
      }
      form={
        <form onSubmit={handleCreatePart} className={styles.partCreateBox}>
          <h3 className={styles.partCreateTitle}>
            <LuPlus /> part を追加
          </h3>

          <FloatingInput
            id="part"
            label="Part（例: 1, 2, Unit1 など）"
            value={part}
            onChange={(e) => setPart(e.target.value)}
          />

          <Button type="submit" disabled={creating}>
            {creating ? "作成中..." : "Partを作成"}
          </Button>
        </form>
      }
      list={
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
      }
    />
  );
}
