"use client";

import styles from "./DailyRecordList.module.css";
import { DailyRecordCard } from "@/src/components/common/card/DailyRecordCard";
import type { StudyRecord } from "@/src/lib/studyRecords";

export function DailyRecordList({ records }: { records: StudyRecord[] }) {
  return (
    <div className={styles.list}>
      {records.map((rec) => (
        <DailyRecordCard key={rec.id} record={rec} />
      ))}
    </div>
  );
}
