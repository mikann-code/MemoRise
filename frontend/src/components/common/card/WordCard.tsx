"use client";

import React from "react";
import styles from "./WordCard.module.css";
import { VscTag } from "react-icons/vsc";
import { RiDeleteBack2Line } from "react-icons/ri";

type WordCardProps = {
  question: string;
  answer: string;
  review?: boolean;
  opened: boolean;
  onTagToggle?: () => void;
  onDelete: () => void;
  deletable?: boolean;
};

export const WordCard = ({
  question,
  answer,
  review,
  opened,
  onTagToggle,
  onDelete,
  deletable = false,
}: WordCardProps) => {
  return (
    <div className={styles.wordCardWrapper}>
      <div className={styles.wordCard}>
        <div className={styles.wordCardActions}>
          <VscTag
            className={`${styles.wordCardActionButton} ${
              review ? styles.isActive : styles.isNotActive
            }`}
            onClick={onTagToggle}
          />

          {deletable && (
            <RiDeleteBack2Line
              className={styles.wordCardActionButton}
              onClick={() => {
                if (!confirm("この単語を削除しますか？")) return;
                onDelete();
              }}
            />
          )}
        </div>

        <div className={styles.wordCardQuestion}>{question}</div>

        {opened && (
          <div className={styles.wordCardAnswer}>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};
