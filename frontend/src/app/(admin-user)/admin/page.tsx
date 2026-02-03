"use client";

import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked, LuUsers } from "react-icons/lu";
import styles from "./page.module.css";
import Link from "next/link";
import { useAdminStats } from "@/src/hooks/useAdminStats";

export default function AdminPage() {
  const { stats, loading, error } = useAdminStats();

  if (loading) return <p>読み込み中...</p>;
  if (error || !stats) return <p>データの取得に失敗しました</p>;

  return (
    <>
      <SectionTitle
        icon={LuBookMarked}
        subTitle="Admin Dashboard"
        title="管理者ページ"
      />

      <div className={styles.cardGrid}>
        {/* ユーザー数 */}
        <Link href="/admin/users" className={styles.cardLink}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <LuUsers className={styles.cardIcon} />
              <p className={styles.cardLabel}>ユーザー数</p>
            </div>
            <p className={styles.cardValue}>
              {stats.users_count}
              <span className={styles.cardUnit}> 人</span>
            </p>
          </div>
        </Link>

        {/* 公式単語集数 */}
        <Link href="/admin/wordbooks" className={styles.cardLink}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <LuBookMarked className={styles.cardIcon} />
              <p className={styles.cardLabel}>公式単語集数</p>
            </div>
            <p className={styles.cardValue}>
              {stats.public_wordbooks_count}
              <span className={styles.cardUnit}> 冊</span>
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
