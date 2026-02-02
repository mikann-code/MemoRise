"use client";
import React, { useEffect, useState } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { FaChartLine } from "react-icons/fa";
import styles from "./WeeklyStreakCard.module.css";
import { BsFire } from "react-icons/bs";
import { fetchStudyWeekRecords } from "@/src/lib/studyRecords";
import Link from "next/link";
import { useMe } from "@/src/hooks/useMe";
import { Button } from "@/src/components/common/ui/Button";
import { ButtonSecondary } from "@/src/components/common/ui/ButtonSecondary";

type WeekItem = {
  dateLabel: string;
  day: string;
  active: boolean;
  isToday: boolean;
};

type StreakData = {
  thisWeek: WeekItem[];
};

// YYYY-MM-DD にフォーマット
const format = (date: Date) => date.toISOString().split("T")[0];

export const StreakCard = () => {
  const { data: user, isLoading, isError } = useMe();

  const [data, setData] = useState<StreakData>({
    thisWeek: [],
  });

  useEffect(() => {
    if (!user) return; // 🔑 未ログイン時は取得しない

    const today = new Date();

    const todayM = today.getMonth();
    const todayD = today.getDate();
    const todayY = today.getFullYear();

    // JSの曜日(0=日) → 月曜始まり変換
    const jsDay = today.getDay();
    const convertToMondayStart = (jsDay - 1 + 7) % 7;

    // 今週の月曜日
    const monday = new Date(today);
    monday.setDate(today.getDate() - convertToMondayStart);

    const startDate = format(monday);
    const weekEng = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const fetchWeek = async () => {
      const weekRecords = await fetchStudyWeekRecords(startDate);

      const thisWeek: WeekItem[] = [...Array(7)].map((_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);

        const dStr = format(d);

        const record = weekRecords.find((r) => r.study_date === dStr);

        const isToday =
          d.getFullYear() === todayY &&
          d.getMonth() === todayM &&
          d.getDate() === todayD;

        return {
          dateLabel: `${d.getDate()}`,
          day: weekEng[i],
          active: record ? true : false,
          isToday,
        };
      });

      setData({
        thisWeek,
      });
    };

    fetchWeek();
  }, [user]);

  // 読み込み中
  if (isLoading) {
    return null; // or スケルトン
  }

  // 🚫 未ログイン時
  if (isError || !user) {
    return (
     <div className={styles.streakCardContainer}>
        <SectionTitle icon={FaChartLine} subTitle="Streak" title="継続記録" />

        <div className={styles.streakCard}>
          <p className={styles.loginMessage}>
            継続記録を見るにはログインが必要です
          </p>
          <div className={styles.actionsWrapper}>
            <Button href="/login">ログインする</Button>
            <ButtonSecondary href="/signup">
              新規登録
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.streakCardContainer}>
      <SectionTitle icon={FaChartLine} subTitle="Streak" title="継続記録" />

      <Link href="/study-records" className={styles.streakCardLink}>
        <div className={styles.streakCard}>
          <div className={styles.streakCardDays}>
            {data.thisWeek.map((item, index) => (
              <div
                key={index}
                className={`${styles.streakItem} ${
                  item.isToday ? styles.isToday : ""
                }`}
              >
                <p className={styles.streakDay}>{item.day}</p>
                <p className={styles.streakDate}>{item.dateLabel}</p>

                <div
                  className={`${styles.streakDot} ${
                    item.active ? styles.isActive : ""
                  }`}
                >
                  {item.active && <BsFire className={styles.streakFireIcon} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};
