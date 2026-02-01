"use client";

import { useState } from "react";
import { RiInfoCardLine } from "react-icons/ri";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { UserCard } from "@/src/components/common/card/UserCard";
import { useMe } from "@/src/hooks/useMe";
import { useLogout } from "@/src/hooks/useLogout";
import styles from "./page.module.css";

export default function MyPage() {
  const { data: user, isLoading, isError } = useMe();
  const logout = useLogout();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isLoading || isLoggingOut) {
    return <p>読み込み中...</p>;
  }

  if (isError || !user) {
    return <p>ログインしてください</p>;
  }

  return (
    <>
      <SectionTitle
        icon={RiInfoCardLine}
        subTitle="mypage"
        title="マイページ"
      />

      <UserCard user={user} />

      <div className={styles.logoutArea}>
        <button
          className={styles.logoutButton}
          type="button"
          onClick={() => {
            const ok = confirm("ログアウトしてもよろしいですか？");
            if (!ok) return;

            setIsLoggingOut(true);
            logout();
          }}
        >
          ログアウト
        </button>
      </div>
    </>
  );
}
