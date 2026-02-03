"use client";

import React from "react";
import styles from "./JudgeButtons.module.css";

type Props = {
  onCorrect: () => void;
  onWrong: () => void;
};

export const JudgeButtons = ({ onCorrect, onWrong }: Props) => {
  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.correctButton} onClick={onCorrect}>
        正解
      </button>
      <button type="button" className={styles.wrongButton} onClick={onWrong}>
        不正解
      </button>
    </div>
  );
};
