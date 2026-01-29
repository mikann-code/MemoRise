"use client";

import React from "react";
import styles from "./TestCard.module.css";
import { VscTag } from "react-icons/vsc";
import { FaTrash } from "react-icons/fa";

type TestCardProps = {
  question: string;
  answer: string;
  review: boolean;
  opened: boolean;
  onTagToggle: () => void;
  onDelete: () => void;
};

export const TestCard = ({
  question,
  answer,
  review,
  opened,
  onTagToggle,
  onDelete,
}: TestCardProps) => {
  return (
    <div className={styles.testCardWrapper}>
      <div className={styles.testCard}>
        <VscTag
          className={`${styles.testCardTag} ${
            review ? styles.isActive : styles.isNotActive
          }`}
          onClick={onTagToggle}
        />
        <FaTrash
          className={styles.testCardDelete}
          onClick={() => {
            if (!confirm("この単語を削除しますか？")) return;
            onDelete();
          }}
        />

        <div className={styles.testCardQuestion}>{question}</div>

        {opened && (
          <div className={styles.testCardAnswer}>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};
