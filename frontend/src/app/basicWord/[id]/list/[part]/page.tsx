"use client";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { basicWordInfo } from "@/src/constants/basicWordInfo";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaListUl } from "react-icons/fa6";
import { Button } from "@/src/components/common/ui/Button";
import { TestCard } from "@/src/components/common/card/TestCard";
import styles from "./page.module.css";

export default function WordListPage() {
  const { id, part } = useParams() as { id: string; part: string };

  const book = basicWordInfo[id];
  const partIndex = Number(part) - 1;
  const targetPart = book?.levels?.[partIndex];

  // ★ Hook はここで "無条件" に定義（必ず毎レンダー呼ばれる）
  const [selectedPos, setSelectedPos] = useState<string>("all");

  // ★ targetPart がなくても安全な配列にしておく
  const words = targetPart?.words ?? [];

  // ★ 品詞の一覧 ["all", "動詞", "名詞", ...]
  const posList = useMemo(() => {
    const set = new Set<string>();
    words.forEach((word) => {
      word.pos?.forEach((p) => set.add(p));
    });
    return ["all", ...Array.from(set)];
  }, [words]);

  // ★ 絞り込み済みの単語リスト
  const filteredWords = useMemo(() => {
    if (selectedPos === "all") return words;
    return words.filter((word) => word.pos?.includes(selectedPos));
  }, [selectedPos, words]);

  // ★ Hook の「あと」で早期 return するのはOK
  if (!book) return <div>教材が見つかりません。</div>;
  if (!targetPart) return <div>対象のパートが存在しません。</div>;

  return (
    <>
      <SectionTitle
        icon={FaListUl}
        subTitle="Words List"
        title={`${book.title} - ${targetPart.title}`}
      />

      <div className={styles.listButtonContainer}>
        <Button href={`/basicWord/${id}`}>教材トップに戻る</Button>
        <Button href={`/basicWord/${id}/test/${part}`}>今すぐはじめる</Button>
      </div>

      <select
        value={selectedPos}
        onChange={(e) => setSelectedPos(e.target.value)}
      >
        {posList.map((pos) => (
          <option key={pos} value={pos}>
            {pos === "all" ? "すべて表示" : pos}
          </option>
        ))}
      </select>

      <div className={styles.listContainer}>
        {filteredWords.map((word) => (
          <TestCard
            key={word.uuid}
            question={word.question}
            answer={word.answer}
            pos={word.pos || []}
            opened={true}
            onToggle={() => {}}
            onNext={() => {}}
          />
        ))}
      </div>
    </>
  );
}
