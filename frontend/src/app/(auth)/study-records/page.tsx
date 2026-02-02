"use client";

import { useState } from "react";
import { StudyCalendar } from "@/src/components/feature/Calendar";
import { DailyRecordList } from "@/src/components/common/list/DailyRecordList";
import { useStudyRecentRecords } from "@/src/hooks/useStudyRecentRecords";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaChartLine } from "react-icons/fa";
import styles from "./page.module.css";

import { useMe } from "@/src/hooks/useMe";
import { ErrorCard } from "@/src/components/common/card/ErrorCard";

export default function StudyPage() {
  // 表示するタブの状態管理
  const [activeTab, setActiveTab] = useState<"calendar" | "dashboard">(
    "calendar"
  );

  // ログインユーザー取得
  const { data: user, isLoading, isError } = useMe();

  // 最近の30件の学習記録を取得
  const { data: recentRecords } = useStudyRecentRecords();

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  // 🚫 未ログイン時
  if (isError || !user) {
    return (
      <>
        <SectionTitle
          icon={FaChartLine}
          subTitle="My Study Records"
          title="学習記録"
        />
        <ErrorCard
          text={<>学習記録を見るにはログインが必要です</>}
          buttonLabel="ログインする"
          href="/login"
          secondaryButtonLabel="新規登録"
          secondaryHref="/signup"
        />
      </>
    );
  }

  return (
    <>
      <SectionTitle
        icon={FaChartLine}
        subTitle="My Study Records"
        title="学習記録"
      />

      <div className={styles.selectWrapper}>
        <div
          className={`${styles.selectItem} ${
            activeTab === "calendar" ? styles.isActive : ""
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          記録
        </div>

        <div
          className={`${styles.selectItem} ${
            activeTab === "dashboard" ? styles.isActive : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          ダッシュボード
        </div>
      </div>

      {/* カレンダー（月別） */}
      {activeTab === "calendar" && <StudyCalendar />}

      {/* ダッシュボード（最新30件） */}
      {activeTab === "dashboard" && (
        <>
          <p className={styles.recordListDescription}>
            最近の学習記録一覧（最新30件）
          </p>
          <DailyRecordList records={recentRecords ?? []} />
        </>
      )}
    </>
  );
}
