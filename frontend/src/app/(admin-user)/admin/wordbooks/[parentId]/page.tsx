"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked, LuPlus, LuTrash2 } from "react-icons/lu";
import styles from "./page.module.css";
import Link from "next/link";

import { useAdminWordbooks } from "@/src/hooks/useAdminWordbooks";
import { useAdminWordbookChildren } from "@/src/hooks/useAdminWordbookChildren";

import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import { WordbookListLayout } from "@/src/components/layout/WordbookListLayout";

export default function AdminWordbookDetailPage() {
  const { parentId } = useParams<{ parentId: string }>();

  // 親一覧 + 子作成 + 子削除
  const {
    wordbooks,
    loading,
    error,
    addChildWordbook,
    creatingChild,
    deleteChildWordbook, // ★ 子削除用を使う
  } = useAdminWordbooks();

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

  // Part 作成
  const handleCreatePart = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!part) {
      alert("Part を入力してください");
      return;
    }

    try {
      await addChildWordbook({
        parent_uuid: parentId,
        part,
      });
      setPart("");
    } catch {
      alert("Part の作成に失敗しました");
    }
  };

  // Part 削除（子単語帳削除）
  const handleDeletePart = async (uuid: string) => {
    if (!confirm("この Part を削除しますか？")) return;

    try {
      await deleteChildWordbook(uuid); // ★ここを修正
    } catch {
      alert("削除に失敗しました");
    }
  };

  return (
    <WordbookListLayout
      header={
        <div className={styles.headerRow}>
          <SectionTitle
            icon={LuBookMarked}
            subTitle="Admin Wordbook"
            title={`${wordbook.title} ${wordbook.level}`}
          />

          <Link
            href={`/admin/wordbooks/${parentId}/edit`}
            className={styles.editButton}
          >
            編集
          </Link>
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

          <Button type="submit" disabled={creatingChild}>
            {creatingChild ? "作成中..." : "Partを作成"}
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

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDeletePart(child.uuid)}
                  >
                    <LuTrash2 />
                    削除する
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    />
  );
}
