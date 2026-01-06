// src/app/my-page/page.tsx
"use client";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { UserCard } from "@/src/components/common/card/UserCard";
import { useMe } from "@/src/hooks/useMe";
import { useLogout } from "@/src/hooks/useLogout";

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
      <SectionTitle icon={FaUserPlus} subTitle="mypage" title="マイページ" />
      <UserCard user={user} />

      <div>
        <button
          onClick={() => {
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
