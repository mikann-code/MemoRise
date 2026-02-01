"use client";

import { useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useStudyRecords } from "@/src/hooks/useStudyRecords";
import styles from "./Calendar.module.css";

export const StudyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data: records, isLoading } = useStudyRecords(year, month);

  const events = useMemo(() => {
    if (!records) return [];

    return records.map((record) => ({
      title: "",
      date: record.study_date,
    }));
  }, [records]);

  useEffect(() => {
    console.log("Study Records:", records);
  }, [records]);

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <div className={styles.calendar}>
      <FullCalendar
        key={`${year}-${month}`}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={currentDate}
        events={events}
        displayEventTime={false}
        eventDisplay="block"
        eventBackgroundColor="transparent"
        eventBorderColor="transparent"
        dayCellDidMount={(arg) => {
          const existing = arg.el.querySelector(`.${styles.countBadge}`);
          if (existing) existing.remove();
          // ISO 使わず、ローカル日付で取得する
          const y = arg.date.getFullYear();
          const m = String(arg.date.getMonth() + 1).padStart(2, "0");
          const d = String(arg.date.getDate()).padStart(2, "0");
          const dateStr = `${y}-${m}-${d}`;
          const record = records?.find(
            (r) => r.study_date.slice(0, 10) === dateStr,
          );
          if (!record) return;

          // hasRecord > countBadge
          arg.el.classList.add(styles.hasRecord);

          const badge = document.createElement("div");
          badge.className = styles.countBadge;
          badge.textContent = String(record.study_count);
          const max = 100;
          const ratio = Math.min(record.study_count / max, 1);
          badge.style.backgroundColor = `rgba(45, 140, 255, ${0.4 + ratio * 0.6})`;
          arg.el.appendChild(badge);
        }}
        /** 日付クリック処理 */
        dateClick={(info) => {
          const clickedDate = info.dateStr;

          const record = records?.find(
            (r) => r.study_date.slice(0, 10) === clickedDate,
          );

          if (record) {
            alert(
              `📘 ${clickedDate} の記録\n\n` +
                `ログイン状態：ログインしています✅ \n` +
                `学習数：${record.study_count}\n`,
            );
          } else {
            alert(
              `📘 ${clickedDate} の記録はありません\n\n` +
                `ログイン状態：ログインしていません❌`,
            );
          }
        }}
        /** 月が切り替わったとき */
        datesSet={(info) => {
          const start = info.view.currentStart;

          // 表示中の月そのものを使う
          setCurrentDate(new Date(start.getFullYear(), start.getMonth(), 1));
        }}
        height="auto"
      />
    </div>
  );
};
