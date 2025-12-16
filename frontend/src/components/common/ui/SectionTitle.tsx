"use client";
import React from "react";
import styles from "./SectionTitle.module.css";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;           
  subTitle: string;         
  title: string;      
};

export const SectionTitle = ({ icon: Icon, subTitle, title }: Props) => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleIconWrapper}>
        <Icon className={styles.titleIcon} />
      </div>
      <div>
        <span className={styles.titleLabel}>{subTitle}</span>
        <h3 className={styles.titleValue}>{title}</h3>
      </div>
    </div>
  );
};
