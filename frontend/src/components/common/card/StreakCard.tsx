"use client";
import React, { useEffect, useState } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { FaChartLine } from "react-icons/fa";
import styles from "./StreakCard.module.css";
import { BsFire } from "react-icons/bs";

type WeekItem = {
  dateLabel: string;
  day: string;
  active: boolean;
  isToday: boolean;
};

type StreakData = {
  todayLabel: string;
  thisWeek: WeekItem[];
};

export const StreakCard = () => {
  const [data, setData] = useState<StreakData>({
    todayLabel: "",
    thisWeek: [],
  });

  useEffect(() => {
    const today = new Date();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const todayM = today.getMonth();
    const todayD = today.getDate();
    const todayY = today.getFullYear();
    const todayLabel = `${months[todayM]} ${todayD}`;

    const jsDay = today.getDay();
    const convertToMondayStart = (jsDay - 1 + 7) % 7;

    const monday = new Date(today);
    monday.setDate(today.getDate() - convertToMondayStart);

    const weekEng = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const thisWeek: WeekItem[] = [...Array(7)].map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      return {
        dateLabel: `${d.getDate()}`,
        day: weekEng[i],
        active: Math.random() > 0.3,
        isToday:
          d.getFullYear() === todayY &&
          d.getMonth() === todayM &&
          d.getDate() === todayD,
      };
    });

    Promise.resolve().then(() => {
      setData({
        todayLabel,
        thisWeek,
      });
    });
  }, []);

  return (
    <div className={styles.streakCardContainer}>
      <SectionTitle icon={FaChartLine} subTitle="Streak" title="継続記録" />

      <div className={styles.streakCard}>
        <div className={styles.streakToday}>Today, {data.todayLabel}</div>

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
                <div className={styles.streakDot}>
                  {item.active && <BsFire className={styles.streakFireIcon} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
