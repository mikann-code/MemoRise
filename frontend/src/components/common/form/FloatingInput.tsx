"use client";

import React from "react";
import styles from "./FloatingInput.module.css";

type FloatingInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
};

export const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  disabled = false,
  error,
}: FloatingInputProps) => {
  return (
    <div>
      <div className={styles.floatingGroup}>
        <input
          id={id}
          type={type}
          className={`${styles.floatingInput} ${
            error ? styles.floatingInputError : ""
          }`}
          value={value}
          onChange={onChange}
          placeholder=" "
          disabled={disabled}
          autoComplete="off"
        />
        <label htmlFor={id} className={styles.floatingInputLabel}>
          {label}
        </label>
        {error && <p className={styles.floatingInputErrorMessage}>{error}</p>}
      </div>
    </div>
  );
};
