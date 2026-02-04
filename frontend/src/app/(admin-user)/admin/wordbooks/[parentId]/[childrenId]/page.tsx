"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked } from "react-icons/lu";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { TbCircleLetterQFilled, TbCircleLetterAFilled } from "react-icons/tb";
import { Button } from "@/src/components/common/ui/Button";
import { WordCard } from "@/src/components/common/card/WordCard";
import { WordbookListLayout } from "@/src/components/layout/WordbookListLayout";
import { useAdminWordbookChildren } from "@/src/hooks/useAdminWordbookChildren";
import { useAdminWords } from "@/src/hooks/useAdminWords";
import styles from "./page.module.css";
import { ButtonSecondary } from "@/src/components/common/ui/ButtonSecondary";

export default function AdminWordbookChildPage() {
  const { parentId, childrenId } = useParams<{
    parentId: string;
    childrenId: string;
  }>();

  const {
    children,
    loading: childrenLoading,
    error: childrenError,
  } = useAdminWordbookChildren(parentId);

  const childWordbook = useMemo(() => {
    return children.find((child) => child.uuid === childrenId);
  }, [children, childrenId]);

  const { words, loading, error, addWord, deleteWord } =
    useAdminWords(childrenId);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isCsvSubmitting, setIsCsvSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addWord({ question, answer });
    setQuestion("");
    setAnswer("");
  };

  const handleDeleteWord = async (wordUuid: string) => {
    if (!confirm("この単語を削除しますか？")) return;
    await deleteWord(wordUuid);
  };

  const handleCsvUpload = async (file: File | null) => {
    if (!file) return;
    setIsCsvSubmitting(true);

    const text = await file.text();
    const lines = text.split("\n");

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].replace("\r", "").trim();
      if (!line) continue;

      const [q, a] = line.split(",");
      if (!q || !a) continue;

      await addWord({
        question: q.trim(),
        answer: a.trim(),
      });
    }
    
    setIsCsvSubmitting(false);
    setCsvFile(null);
  };

  if (childrenLoading) return <p>読み込み中...</p>;
  if (childrenError) return <p>Part の取得に失敗しました</p>;
  if (!childWordbook) return <p>この Part は存在しません</p>;

  if (loading) return <p>単語を読み込み中...</p>;
  if (error) return <p>単語の取得に失敗しました</p>;

  return (
    <WordbookListLayout
      header={
        <SectionTitle
          icon={LuBookMarked}
          subTitle="Admin Wordbook Part"
          title={`${childWordbook.title} ${childWordbook.part}`}
        />
      }
      description={
        <div>
          <p>{childWordbook.description}</p>
          <p>登録単語数：{words.length}語</p>
        </div>
      }
      form={
        <form onSubmit={handleSubmit}>
          <FloatingInput
            id="question"
            type="text"
            label="単語"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            icon={<TbCircleLetterQFilled />}
          />

          <FloatingInput
            id="answer"
            type="text"
            label="意味"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            icon={<TbCircleLetterAFilled />}
          />

          <Button type="submit">単語を登録</Button>

          <div className={styles.csvFileContainer}>
            <p className={styles.csvFileLabel}>CSVファイルで登録できます</p>

            <div className={styles.csvRow}>
              <label htmlFor="csvFile" className={styles.csvSelectButton}>
                ファイルを選択
              </label>

              <span className={styles.csvFileName}>
                {csvFile ? csvFile.name : "選択されていません"}
              </span>
            </div>

            <input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              className={styles.csvFileInput}
            />

            <div className={styles.buttonSecondary}>
              <ButtonSecondary
                type="button"
                onClick={() => handleCsvUpload(csvFile)}
                disabled={!csvFile || isCsvSubmitting}
              >
                {isCsvSubmitting ? "登録中..." : "CSVを登録"}
              </ButtonSecondary>
            </div>
          </div>
        </form>
      }
      list={
        <ul>
          {words.length === 0 && <li>この Part にはまだ単語がありません</li>}

          {words.map((word) => (
            <li key={word.uuid}>
              <WordCard
                question={word.question}
                answer={word.answer}
                opened={true}
                onTagToggle={() => {}}
                onDelete={() => handleDeleteWord(word.uuid)}
                deletable={true}
                review={false}
              />
            </li>
          ))}
        </ul>
      }
    />
  );
}
