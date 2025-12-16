"use client";

import React from "react";
import styles from "./TestCard.module.css";
import { VscTag } from "react-icons/vsc";

type TestCardProps = {
  question: string;
  answer: string;
  pos?: string[];
  review: boolean;
  opened: boolean;
  onTagToggle: () => void;
};

export const TestCard = ({
  question,
  answer,
  pos = [],
  review,
  opened,
  onTagToggle,
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
