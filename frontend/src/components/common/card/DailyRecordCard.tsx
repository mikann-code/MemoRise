"use client";

import styles from "./DailyRecordCard.module.css";
import type { StudyRecord } from "@/src/lib/studyRecords";

export const DailyRecordCard = ({ record }: { record: StudyRecord }) => {
  const date = new Date(record.study_date);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className={styles.card}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.dateBadge}>
          <span className={styles.month}>{month}月</span>
          <span className={styles.day}>{day}日</span>
        </div>
      </div>

      <div className={styles.body}>
        {/* 学習量（主役） */}
        <div className={styles.count}>
          <span className={styles.countNumber}>{record.study_count}</span>
          <span className={styles.countLabel}>words</span>
        </div>

        {/* 詳細ログ */}
        {record.study_details.length > 0 && (
          <div className={styles.details}>
            {record.study_details.map((detail) => (
              <div key={detail.id} className={styles.detailLine}>
                {/* 問題集名（主役級） */}
                <div className={styles.detailTitle}>
                  {detail.title}
                </div>

                {/* 成績 */}
                <div className={styles.detailStats}>
                  <span className={styles.correct}>
                    {detail.correct_count}/{detail.count}
                  </span>

                  <span
                    className={
                      detail.rate >= 80
                        ? styles.rateGood
                        : styles.rateNormal
                    }
                  >
                    {detail.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {record.memo && (
          <p className={styles.memo}>{record.memo}</p>
        )}
      </div>
    </div>
  );
};
