import React from "react";
import styles from "./UserCard.module.css";
import { User } from "@/src/types/user";

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.userHeader}>
        <p className={styles.userName}>{user.name}</p>
      </div>

      <div className={styles.userBody}>
        <span className={styles.userLabel}>メールアドレス</span>
        <span className={styles.userEmail}>{user.email}</span>
      </div>
    </div>
  );
};
