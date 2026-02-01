"use client";
import React from "react";
import styles from "./FormLayout.module.css";

type Props = {
  header: React.ReactNode;        // タイトル
  description?: React.ReactNode; // 補足説明（任意）
  form: React.ReactNode;         // form 本体
};

export const FormLayout = ({
  header,
  description,
  form,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{header}</div>
      {description && (
        <div className={styles.description}>{description}</div>
      )}

      <div className={styles.form}>{form}</div>
    </div>
  );
};
