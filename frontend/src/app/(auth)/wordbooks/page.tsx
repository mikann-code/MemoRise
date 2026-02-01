"use client";
import Link from "next/link";
import { useWordbooks } from "@/src/hooks/useWordbooks";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked, LuChevronRight } from "react-icons/lu";
import { FaRegStickyNote, FaClock } from "react-icons/fa";
import styles from "./page.module.css";
import dayjs from "@/src/lib/dayjs";
import { FaStar } from "react-icons/fa";
import { useTaggedWords } from "@/src/hooks/useTaggedWords";

export default function WordbooksPage() {
  const { wordbooks, loading, error } = useWordbooks();
  const { taggedWords } = useTaggedWords();
  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;

  return (
    <>
      <div className={styles.headerRow}>
        <SectionTitle
          icon={LuBookMarked}
          subTitle="My Wordbooks Collection"
          title="単語帳一覧"
        />

        <div className={styles.headerActions}>
          <Link href="/wordbooks/review" className={styles.reviewButton}>
            <FaStar /> 復習単語 ( {taggedWords.length} )
          </Link>

          <Link href="/wordbooks/new" className={styles.createButton}>
            ＋ 新しい単語帳
          </Link>
        </div>
      </div>

      <ul className={styles.wordbooksList}>
        {wordbooks.map((wb) => (
          <li key={wb.uuid} className={styles.wordbooksItem}>
            <Link
              href={`/wordbooks/${wb.uuid}/list`}
              className={styles.wordbooksLink}
            >
              {/* 左アクセント */}
              <span className={styles.accent} />

              <div className={styles.wordbookMain}>
                <h3 className={styles.wordbookTitle}>{wb.title}</h3>
                <p className={styles.wordbookDescription}>{wb.description}</p>

                <div className={styles.wordbooksMeta}>
                  <p className={styles.wordbookStat}>
                    <FaRegStickyNote /> {wb.words_count} words
                  </p>
                  <p className={styles.wordbookStat}>
                    <FaClock />
                    {wb.last_studied
                      ? dayjs(wb.last_studied).fromNow()
                      : " 未学習"}
                  </p>
                </div>
              </div>

              {wb.label && (
                <span className={styles.wordbookLabel}>{wb.label}</span>
              )}

              <LuChevronRight className={styles.wordbooksArrow} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
