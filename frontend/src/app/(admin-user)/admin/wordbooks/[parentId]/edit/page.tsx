"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import { FormLayout } from "@/src/components/layout/FormLayout";
import { LuBookMarked } from "react-icons/lu";
import { useAdminWordbooks } from "@/src/hooks/useAdminWordbooks";
import styles from "./page.module.css";

export default function AdminWordbookEditPage() {
  const { parentId } = useParams<{ parentId: string }>();
  const router = useRouter();

  const {
    wordbooks,
    loading,
    error,
  } = useAdminWordbooks();

  const wordbook = wordbooks.find((wb) => wb.uuid === parentId);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>単語帳の取得に失敗しました</p>;
  if (!wordbook) return <p>単語帳が見つかりません</p>;

  return <EditForm key={wordbook.uuid} wordbook={wordbook} />;
}

/* =====================
   フォーム部分
===================== */

type Props = {
  wordbook: {
    uuid: string;
    title: string;
    description: string | null;
    label: string | null;
    level: string | null;
  };
};

function EditForm({ wordbook }: Props) {
  const router = useRouter();
  const {
    updateParentWordbook,
    updatingParent,
    deleteParentWordbook,
  } = useAdminWordbooks();

  const [title, setTitle] = useState(wordbook.title);
  const [description, setDescription] = useState(wordbook.description ?? "");
  const [label, setLabel] = useState(wordbook.label ?? "");
  const [level, setLevel] = useState(wordbook.level ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateParentWordbook({
        uuid: wordbook.uuid,
        title,
        description,
        label,
        level,
      });

      router.push(`/admin/wordbooks/${wordbook.uuid}`);
    } catch {
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    const ok = confirm("この親単語帳と子単語帳をすべて削除します。よろしいですか？");
    if (!ok) return;

    try {
      await deleteParentWordbook(wordbook.uuid);
      router.push("/admin/wordbooks");
    } catch {
      alert("削除に失敗しました");
    }
  };

  return (
    <FormLayout
      header={
        <SectionTitle
          icon={LuBookMarked}
          subTitle="Admin Wordbook"
          title="単語帳を編集"
        />
      }
      description={<p>親単語帳の情報を編集できます。</p>}
      form={
        <form onSubmit={handleSubmit}>
          <FloatingInput
            id="title"
            label="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FloatingInput
            id="description"
            label="説明"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FloatingInput
            id="label"
            label="ラベル"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <FloatingInput
            id="level"
            label="レベル"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />

          <Button type="submit" disabled={updatingParent}>
            {updatingParent ? "更新中..." : "更新する"}
          </Button>

          <button
            type="button"
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            削除する
          </button>
        </form>
      }
    />
  );
}
