"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked, LuChevronRight, LuPlus } from "react-icons/lu";
import styles from "./page.module.css";

import { useAdminWordbooks } from "@/src/hooks/useAdminWordbooks";
import { WORDBOOK_LABELS } from "@/src/constants/wordbookLabels";

import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import { WordbookListLayout } from "@/src/components/layout/WordbookListLayout";

export default function AdminWordbooksPage() {
  const { wordbooks, loading, error, addWordbook, creating } =
    useAdminWordbooks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [level, setLevel] = useState("");

  // 親単語帳のみ表示
  const groupedWordbooks = useMemo(() => {
    return WORDBOOK_LABELS.map((labelDef) => ({
      ...labelDef,
      items: wordbooks.filter(
        (wb) => wb.label === labelDef.value && !wb.parent_uuid
      ),
    }));
  }, [wordbooks]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !label || !level) {
      alert("タイトル / ラベル / レベルは必須です");
      return;
    }

    try {
      await addWordbook({
        title,
        description,
        label,
        level,
        part: null,
        parent_uuid: null, // 親として作成
      });

      setTitle("");
      setDescription("");
      setLabel("");
      setLevel("");
    } catch {
      alert("作成に失敗しました");
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>単語帳の取得に失敗しました</p>;

  return (
    <WordbookListLayout
      header={
        <SectionTitle
          icon={LuBookMarked}
          subTitle="Admin Wordbooks"
          title="管理用単語帳"
        />
      }
      description={<p>公式単語帳の作成・管理を行います。</p>}
      form={
        <form onSubmit={handleCreate} className={styles.createBox}>
          <h3 className={styles.createTitle}>
            <LuPlus /> 新規単語帳作成
          </h3>

          <FloatingInput
            id="title"
            label="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FloatingInput
            id="description"
            label="説明（任意）"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FloatingInput
            id="level"
            label="レベル（例: A1, A2, B1, 初級 など）"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />

          <label
            id="wordbook-label-label"
            htmlFor="wordbook-label"
            className={styles.selectLabel}
          >
            タグを選択してください
          </label>
          <select
            id="wordbook-label"
            aria-labelledby="wordbook-label-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className={styles.select}
          >
            <option value="">ラベルを選択</option>
            {WORDBOOK_LABELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>

          <Button type="submit" disabled={creating}>
            {creating ? "登録中..." : "登録する"}
          </Button>
        </form>
      }
      list={
        <>
          {groupedWordbooks.map((group) => (
            <section key={group.value} className={styles.labelSection}>
              <h3 className={styles.labelTitle}>
                {group.label}
                <span className={styles.count}>({group.items.length})</span>
              </h3>

              {group.items.length === 0 ? (
                <p className={styles.empty}>
                  単語帳はまだありません。上のフォームから作成できます。
                </p>
              ) : (
                <ul className={styles.wordbooksList}>
                  {group.items.map((wb) => (
                    <li key={wb.uuid} className={styles.wordbooksItem}>
                      <Link
                        href={`/admin/wordbooks/${wb.uuid}`}
                        className={styles.wordbooksLink}
                      >
                        <div className={styles.cardContent}>
                          <LuChevronRight className={styles.arrowIcon} />

                          <div className={styles.wordbooksHeader}>
                            <h4>{wb.title}</h4>
                          </div>

                          <p className={styles.description}>
                            {wb.description || "説明なし"}
                          </p>

                          <div className={styles.wordbooksMeta}>
                            <span className={styles.badge}>{wb.level}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      }
    />
  );
}
