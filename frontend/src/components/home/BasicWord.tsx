"use client";
import React from "react";
import styles from "./BasicWord.module.css";
import { HiOutlineClipboardList } from "react-icons/hi";
import { SectionTitle } from "../common/ui/SectionTitle";
import { AiOutlineBook } from "react-icons/ai";
import Link from "next/link";
import { basicWordInfo } from "../../constants/basicWordInfo";

export const BasicWord = () => {
  const subjects = [
    { key: "toeic", value: "TOEIC" },
    { key: "highschool", value: "高校生向け" },
    { key: "junior", value: "中学生向け" },
  ];

  const basicWords = Object.entries(basicWordInfo).map(([id, data]) => ({
    id,
    label: data.title,
    icon: AiOutlineBook,
  }));

  return (
    <section className={styles.basicSection}>
      <SectionTitle
        icon={HiOutlineClipboardList}
        subTitle="Vocabulary & Practice"
        title="おすすめの単語・問題集"
      />

      <select name="subject" className={styles.basicSelect}>
        {subjects.map((s) => (
          <option key={s.key} value={s.value}>
            {s.value}
          </option>
        ))}
      </select>

      <div className={styles.basicWordsBoxContainer}>
        {basicWords.map((item) => (
          <Link
            href={`/basicWord/${item.id}`}
            className={styles.basicWordsBoxLink}
            key={item.id}
          >
            <item.icon className={styles.basicWordsBox} />
            <p className={styles.basicWordsBoxLabel}>{item.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
