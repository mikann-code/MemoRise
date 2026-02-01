"use client";
import React from "react";
import styles from "./WordbookListLayout.module.css";

type Props = {
  header: React.ReactNode; // タイトル領域
  description?: React.ReactNode; // 補足説明
  form?: React.ReactNode; // 追加フォーム
  list: React.ReactNode; // 単語一覧
};

export const WordbookListLayout = ({
  header,
  description,
  form,
  list,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{header}</div>
      {description && <div className={styles.description}>{description}</div>}
      {form && <div className={styles.form}>{form}</div>}
      <div className={styles.list}>{list}</div>
    </div>
  );
};
