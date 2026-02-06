"use client";

import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";


type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;  
};

export const Button = ({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  if (href) {
    return (
      <Link href={href} className={styles.button}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
};
