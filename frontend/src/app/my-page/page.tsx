"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";

import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { UserCard } from "@/src/components/common/card/UserCard";
import { useAuth } from "@/src/context/useAuth";

export default function MyPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <SectionTitle icon={FaUserPlus} subTitle="mypage" title="マイページ" />

      <UserCard user={user} />

      {/* 🔽 ログアウトボタン */}
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          ログアウト
        </button>
      </div>
    </>
  );
}
