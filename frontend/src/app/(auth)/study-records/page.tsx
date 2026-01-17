"use client";

import { useState } from "react";
import { StudyCalendar } from "@/src/components/feature/Calendar";
import { DailyRecordList } from "@/src/components/common/list/DailyRecordList";

import { useStudyRecentRecords } from "@/src/hooks/useStudyRecentRecords";

import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaChartLine } from "react-icons/fa";
import styles from "./page.module.css";

export default function StudyPage() {
  // 表示するタブの状態管理
  const [activeTab, setActiveTab] = useState<"calendar" | "dashboard">(
    "calendar"
  );

  // 最近の30件の学習記録を取得
  const { data: recentRecords } = useStudyRecentRecords();

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

      {/*  タブ切り替え表示  */}

      {/* カレンダー（月別） */}
      {activeTab === "calendar" && <StudyCalendar />}

      {/* ダッシュボード（最新30件） */}
      {activeTab === "dashboard" && (
        <>
          <p className={styles.recordListDescription}>最近の学習記録一覧（最新30件）</p>
          <DailyRecordList records={recentRecords ?? []} />
        </>
      )}
    </>
  );
}
