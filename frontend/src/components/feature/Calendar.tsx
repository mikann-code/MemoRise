"use client";

import { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useStudyRecords } from "@/src/hooks/useStudyRecords";

export default function StudyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data: records, isLoading } = useStudyRecords(year, month);

  // ⭐ Hooksは return の前に必ず書く
  const events = useMemo(() => {
    if (!records) return [];

    return records.map((r) => {
      // 💡 色分けロジック（自由に変えてOK）
      // 大きいほど濃い緑で目立つ
      const count = r.study_count;
      let color = "#A5D6A7"; // 薄い緑

      if (count >= 20) color = "#66BB6A"; // 濃い緑
      if (count >= 50) color = "#388E3C"; // さらに濃い緑

      return {
        title: `${r.study_count} words`, // ← study_countを表示
        date: r.study_date,
        backgroundColor: color,
        borderColor: color,
        textColor: "white",
      };
    });
  }, [records]);

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={(info) => {
        alert(`クリック日: ${info.dateStr}`);
      }}
      datesSet={(info) => {
        setCurrentDate(info.start);
      }}
      height="auto"
    />
  );
}
