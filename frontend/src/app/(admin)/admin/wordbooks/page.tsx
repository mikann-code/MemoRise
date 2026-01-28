"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked, LuChevronRight, LuPlus } from "react-icons/lu";
import styles from "./page.module.css";

import { useAdminWordbooks } from "@/src/hooks/useAdminWordbooks";
import { WORDBOOK_LABELS } from "@/src/constants/wordbookLabels";
import { LEVELS_BY_LABEL } from "@/src/constants/wordbookLevels";
import { WORDBOOK_PARTS } from "@/src/constants/wordbookParts";

export default function AdminWordbooksPage() {
  const { wordbooks, loading, error, addWordbook, creating } =
    useAdminWordbooks();

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [level, setLevel] = useState("");
  const [part, setPart] = useState("");

  // label に応じた level 一覧
  const levels =
    label && label in LEVELS_BY_LABEL
      ? LEVELS_BY_LABEL[label as keyof typeof LEVELS_BY_LABEL]
      : [];

  // label ごとに単語帳をグループ化
  const groupedWordbooks = useMemo(() => {
    return WORDBOOK_LABELS.map((labelDef) => ({
      ...labelDef,
      items: wordbooks.filter((wb) => wb.label === labelDef.value),
    }));
  }, [wordbooks]);

  const handleCreate = async () => {
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
        part: part || null,
      });

      // reset
      setTitle("");
      setDescription("");
      setLabel("");
      setLevel("");
      setPart("");
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("作成に失敗しました");
      }
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>単語帳の取得に失敗しました</p>;

  return (
    <>
      <SectionTitle
        icon={LuBookMarked}
        subTitle="Admin Wordbooks"
        title="管理用単語帳"
      />

      {/* ======================
          新規作成フォーム
      ====================== */}
      <div className={styles.createBox}>
        <h3 className={styles.createTitle}>
          <LuPlus /> 新規単語帳作成
        </h3>

        <input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="説明（任意）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* label */}
        <select
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            setLevel("");
          }}
        >
          <option value="">ラベルを選択</option>
          {WORDBOOK_LABELS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>

        {/* level */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          disabled={!label}
        >
          <option value="">レベルを選択</option>
          {levels.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>

        <button onClick={handleCreate} disabled={creating}>
          {creating ? "作成中..." : "作成"}
        </button>
      </div>

      {/* ======================
          label ごとの単語帳一覧
      ====================== */}
      {groupedWordbooks.map((group) => (
        <section key={group.value} className={styles.labelSection}>
          <h3 className={styles.labelTitle}>
            {group.label}
            <span className={styles.count}>
              ({group.items.length})
            </span>
          </h3>

          {group.items.length === 0 ? (
            <p className={styles.empty}>単語帳はまだありません</p>
          ) : (
            <ul className={styles.wordbooksList}>
              {group.items.map((wb) => (
                <li key={wb.uuid} className={styles.wordbooksItem}>
                  <Link
                    href={`/admin/wordbooks/${wb.uuid}`}
                    className={styles.wordbooksLink}
                  >
                    <div className={styles.wordbooksHeader}>
                      <h4>{wb.title}</h4>
                      <LuChevronRight />
                    </div>

                    <p className={styles.description}>
                      {wb.description || "説明なし"}
                    </p>

                    <div className={styles.wordbooksMeta}>
                      <span className={styles.badge}>{wb.level}</span>
                      {wb.part && (
                        <span className={styles.badgeSub}>{wb.part}</span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}
