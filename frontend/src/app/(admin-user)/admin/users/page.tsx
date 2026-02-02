"use client";

import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FaUser } from "react-icons/fa";
import styles from "./page.module.css";
import { useAdminUsers } from "@/src/hooks/useAdminUsers";

export default function AdminUsersPage() {
  const { users, loading, error } = useAdminUsers();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>ユーザー一覧の取得に失敗しました</p>;

  return (
    <>
      <SectionTitle
        icon={FaUser}
        subTitle="User Management"
        title="ユーザー一覧"
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>メール</th>
              <th>連続日数</th>
              <th>総単語数</th>
              <th>登録日</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className={styles.idCell}>{u.id}</td>
                <td className={styles.nameCell}>{u.name}</td>
                <td className={styles.emailCell}>{u.email}</td>
                <td
                  className={
                    u.streak > 0 ? styles.activeStreak : styles.zeroStreak
                  }
                >
                  {u.streak > 0 ? "🔥 " : ""}
                  {u.streak}
                </td>
                <td className={styles.countCell}>{u.total_words}</td>
                <td className={styles.dateCell}>
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
