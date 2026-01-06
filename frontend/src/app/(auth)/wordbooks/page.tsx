"use client";
import Link from "next/link";
import { useWordbooks } from "@/src/hooks/useWordbooks";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked } from "react-icons/lu";
import styles from "./page.module.css";
import { LuChevronRight } from "react-icons/lu";
import dayjs from "@/src/lib/dayjs";

export default function WordbooksPage() {
  const { data: wordbooks, isLoading, error } = useWordbooks();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!wordbooks) return null;

  return (
    <>
      <SectionTitle
        icon={LuBookMarked}
        subTitle="My Wordbook Collection"
        title="単語帳一覧"
      />

      <ul className={styles.wordbooksList}>
        {wordbooks.map((wb) => (
          <li key={wb.uuid} className={styles.wordbooksItem}>
            <Link
              href={`/wordbooks/${wb.uuid}`}
              className={styles.wordbooksLink}
            >
              <div>{wb.title}</div>
              <p>{wb.description}</p>
              <div className={styles.wordbooksMeta}>
                <p>{wb.words_count} words</p>
                <p>
                  {wb.last_studied
                    ? dayjs(wb.last_studied).fromNow()
                    : "未学習"}
                </p>
              </div>
              <LuChevronRight className={styles.wordbooksArrow} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
