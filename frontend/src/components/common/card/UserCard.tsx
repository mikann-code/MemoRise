"use client";

import styles from "./UserCard.module.css";
import { User } from "@/src/types/user";
import { FaUserCircle } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { MdLibraryBooks } from "react-icons/md";
import { useStats } from "@/src/hooks/useStats";
import { Button } from "@/src/components/common/ui/Button";

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  // ✅ data に意味のある名前をつける
  const { data: stats, isLoading } = useStats();

  return (
    <div className={styles.userCard}>
      <div className={styles.header}>
        <FaUserCircle />
        <p className={styles.userName}>{user.name}</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <MdLibraryBooks className={styles.icon} />
          <span className={styles.statValue}>
            {isLoading || !stats ? "..." : stats.total_words}
          </span>
          <span className={styles.statLabel}>登録単語</span>
        </div>

        <div className={styles.statItem}>
          <HiFire className={styles.icon} />
          <span className={styles.statValue}>{user.streak}</span>
          <span className={styles.statLabel}>連続記録</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.label}>メールアドレス</span>
          <span className={styles.value}>{user.email}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <Button href="/my-page/edit">プロフィール編集</Button>
      </div>
    </div>
  );
};
