"use client";

import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export const Button = ({
  children,
  href,
  onClick,
}: ButtonProps) => {


  if (href) {
    return (
      <Link href={href} className={styles.button}>
        {children}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={styles.button}>
      {children}
    </div>
  );
};
