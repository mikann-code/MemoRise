"use client";
import Link from "next/link";
import { useWordbooks } from "@/src/hooks/useWordbooks";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked, LuChevronRight } from "react-icons/lu";
import { FaRegStickyNote, FaClock, FaStar } from "react-icons/fa";
import styles from "./page.module.css";
import dayjs from "@/src/lib/dayjs";
import { useTaggedWords } from "@/src/hooks/useTaggedWords";

import { useMe } from "@/src/hooks/useMe";
import { ErrorCard } from "@/src/components/common/card/ErrorCard";

export default function WordbooksPage() {
  const { wordbooks, loading, error } = useWordbooks();
  const { taggedWords } = useTaggedWords();

  // 🔑 ログイン状態
  const { data: user, isLoading: meLoading, isError: meError } = useMe();

  if (loading || meLoading) return <p>読み込み中...</p>;

  // 🚫 未ログイン時
  if (meError || !user) {
    return (
      <>
        <SectionTitle
          icon={LuBookMarked}
          subTitle="My Wordbooks Collection"
          title="単語帳一覧"
        />
        <ErrorCard
          text={<>単語帳を見るにはログインが必要です</>}
          buttonLabel="ログインする"
          href="/login"
          secondaryButtonLabel="新規登録"
          secondaryHref="/signup"
        />
      </>
    );
  }

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
