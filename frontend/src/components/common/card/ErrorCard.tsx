"use client";
import styles from "./ErrorCard.module.css";
import { Button } from "@/src/components/common/ui/Button";

type ErrorCardProps = {
  text: React.ReactNode; 
  buttonLabel: string;
  href: string;
};

export const ErrorCard = ({ text, buttonLabel, href }: ErrorCardProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      <div className={styles.buttonWrapper}>
        <Button href={href}>{buttonLabel}</Button>
      </div>
    </div>
  );
};
