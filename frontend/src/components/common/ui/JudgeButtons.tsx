"use client";

import React from "react";
import styles from "./JudgeButtons.module.css";

type Props = {
  onCorrect: () => void;
  onWrong: () => void;
  disabled?: boolean;
};

export const JudgeButtons = ({ onCorrect, onWrong  ,disabled}: Props) => {
  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.correctButton} onClick={onCorrect} disabled={disabled}>
        正解
      </button>
      <button type="button" className={styles.wrongButton} onClick={onWrong} disabled={disabled}>
        不正解
      </button>
    </div>
  );
};
