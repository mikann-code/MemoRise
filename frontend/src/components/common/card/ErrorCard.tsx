"use client";
import styles from "./ErrorCard.module.css";
import { Button } from "@/src/components/common/ui/Button";
import { ButtonSecondary } from "@/src/components/common/ui/ButtonSecondary";

type ErrorCardProps = {
  text: React.ReactNode;

  buttonLabel: string;
  href: string;

  secondaryButtonLabel?: string;
  secondaryHref?: string;
};

export const ErrorCard = ({
  text,
  buttonLabel,
  href,
  secondaryButtonLabel,
  secondaryHref,
}: ErrorCardProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>

      <div className={styles.buttonWrapper}>
        <Button href={href}>{buttonLabel}</Button>

        {secondaryButtonLabel && secondaryHref && (
          <ButtonSecondary href={secondaryHref}>
            {secondaryButtonLabel}
          </ButtonSecondary>
        )}
      </div>
    </div>
  );
};
