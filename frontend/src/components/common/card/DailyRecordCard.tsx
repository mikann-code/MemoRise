"use client";

import styles from "./DailyRecordCard.module.css";
import type { StudyRecord } from "@/src/lib/studyRecords";

export const DailyRecordCard = ({ record }: { record: StudyRecord }) => {
  const date = new Date(record.study_date);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.date}>
          {month}/{day}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.count}>学習単語数：{record.study_count}</p>

        {record.memo && (
          <p className={styles.memo}>{record.memo}</p>
        )}
      </div>
    </div>
  );
}
