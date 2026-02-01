"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWordbook, useWordbooks } from "@/src/hooks/useWordbooks";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { RiEdit2Line } from "react-icons/ri";
import { FormLayout } from "@/src/components/layout/FormLayout";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import { FaTrash } from "react-icons/fa6";
import styles from "./page.module.css";
import { TbBook2, TbAlignLeft, TbTag } from "react-icons/tb";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditWordbookPage({ params }: Props) {
  const router = useRouter();
  const { id: wordbookUuid } = use(params);

  const { wordbook, loading, error } = useWordbook(wordbookUuid);
  const { updateWordbook, deleteWordbook } = useWordbooks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (wordbook) {
      setTitle(wordbook.title ?? "");
      setDescription(wordbook.description ?? "");
      setLabel(wordbook.label ?? "");
    }
  }, [wordbook]);

  if (loading) return <p>読み込み中...</p>;
  if (error || !wordbook) return <p>単語帳が見つかりません</p>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("タイトルを入力してください");
      return;
    }

    try {
      setIsPending(true);

      await updateWordbook({
        uuid: wordbookUuid,
        title: title.trim(),
        description,
        label,
      });

      alert("更新しました");
      router.push(`/wordbooks/${wordbookUuid}/list`);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "更新に失敗しました");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    const ok = confirm(
      "この単語帳を削除しますか？\n中の単語もすべて削除されます。",
    );
    if (!ok) return;

    await deleteWordbook(wordbookUuid);
    router.push("/wordbooks");
  };

  return (
    <>
      <FormLayout
        header={
          <SectionTitle
            icon={RiEdit2Line}
            subTitle="wordbook"
            title="単語帳を編集"
          />
        }
        description="タイトル・説明・ラベルを変更できます"
        form={
          <form onSubmit={onSubmit}>
            {formError && (
              <p style={{ color: "#ff6b6b", fontSize: 12 }}>{formError}</p>
            )}

            <FloatingInput
              id="title"
              type="text"
              label="単語帳タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              icon={<TbBook2 />}
            />

            <FloatingInput
              id="description"
              type="text"
              label="説明（任意）"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              icon={<TbAlignLeft />}
            />

            <FloatingInput
              id="label"
              type="text"
              label="ラベル（例: 英語 / IT / TOEIC）"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              disabled={isPending}
              icon={<TbTag />}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "更新中..." : "保存"}
            </Button>
          </form>
        }
      />
      <button
        type="button"
        onClick={handleDelete}
        className={styles.deleteWordbookButton}
      >
        <FaTrash />
        この単語帳を削除
      </button>
    </>
  );
}
