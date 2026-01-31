"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWordbooks } from "@/src/hooks/useWordbooks";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked } from "react-icons/lu";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import { TbBook2, TbAlignLeft, TbTag } from "react-icons/tb";
import { FormLayout } from "@/src/components/layout/FormLayout";

export default function NewWordbookPage() {
  const { createWordbook } = useWordbooks();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createWordbook({
        title,
        description,
        label,
      });
      router.push("/wordbooks");
    } catch (err: unknown) {
      setError((err as Error).message || "作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      header={
        <SectionTitle
          icon={LuBookMarked}
          subTitle="Create New Wordbook"
          title="単語帳を作成"
        />
      }
      description={<p>単語帳の基本情報を入力してください。</p>}
      form={
        <form onSubmit={handleSubmit}>
          <FloatingInput
            id="title"
            type="text"
            label="単語帳タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            icon={<TbBook2 />}
          />

          <FloatingInput
            id="description"
            type="text"
            label="説明（任意）"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            icon={<TbAlignLeft />}
          />

          <FloatingInput
            id="label"
            type="text"
            label="ラベル（例: 英語 / IT / TOEIC）"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            icon={<TbTag />}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "作成中..." : "作成"}
          </Button>
        </form>
      }
    />
  );
}
