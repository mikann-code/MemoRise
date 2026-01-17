"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked, LuChevronRight, LuPlus } from "react-icons/lu";
import styles from "./page.module.css";
import { useAdminWordbooks } from "@/src/hooks/useAdminWordbooks";

export default function AdminWordbooksPage() {
  const { wordbooks, loading, error, addWordbook, creating } =
    useAdminWordbooks();

  // 新規作成用 state（フォームだけはローカルでOK）
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [label, setLabel] = useState("");

  const handleCreate = async () => {
    if (!title || !level || !label) {
      alert("title / level / label は必須です");
      return;
    }

    try {
      await addWordbook({ title, description, level, label });

      // フォーム初期化
      setTitle("");
      setDescription("");
      setLevel("");
      setLabel("");
    } catch (e: any) {
      alert(e?.message || "作成に失敗しました");
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

      {/* 作成フォーム */}
      <div className={styles.createBox}>
        <h3>
          <LuPlus /> 新規作成
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
        <input
          placeholder="level（例: beginner）"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          placeholder="label（例: toeic）"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <button onClick={handleCreate} disabled={creating}>
          {creating ? "作成中..." : "作成"}
        </button>
      </div>

      {/* 一覧 */}
      <ul className={styles.wordbooksList}>
        {wordbooks.map((wb) => (
          <li key={wb.uuid} className={styles.wordbooksItem}>
            <Link
              href={`/admin/wordbooks/${wb.uuid}`}
              className={styles.wordbooksLink}
            >
              <div>{wb.title}</div>
              <p>{wb.description || "説明なし"}</p>
              <div className={styles.wordbooksMeta}>
                <p>{wb.level}</p>
                <p>{wb.label}</p>
              </div>
              <LuChevronRight className={styles.wordbooksArrow} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
