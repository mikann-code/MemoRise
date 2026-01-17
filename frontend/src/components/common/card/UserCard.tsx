"use client";

import styles from "./UserCard.module.css";
import { User } from "@/src/types/user";
import { FaUserCircle } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { MdLibraryBooks } from "react-icons/md";
import { useStats } from "@/src/hooks/useStats";

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  const { data, isLoading } = useStats();

  return (
    <div className={styles.userCard}>
      {/* Header */}
      <div className={styles.header}>
        <FaUserCircle size={48} />
        <p className={styles.userName}>{user.name}</p>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <MdLibraryBooks size={20} />
          <span className={styles.statValue}>
            {isLoading ? "..." : data.total_words}
          </span>
          <span className={styles.statLabel}>登録単語</span>
        </div>

        <div className={styles.statItem}>
          <HiFire size={22} color="#ff6b6b" />
          <span className={styles.statValue}>{user.streak}</span>
          <span className={styles.statLabel}>連続記録</span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.label}>メールアドレス</span>
          <span className={styles.value}>{user.email}</span>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.primaryButton}>
          プロフィール編集
        </button>
      </div>
    </div>
  );
};
