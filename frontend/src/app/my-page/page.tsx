"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";

import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { UserCard } from "@/src/components/common/card/UserCard";
import { User } from "@/src/types/user";

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("① localStorage token:", token);

    if (!token) {
      console.log("② token が無いので login に遷移");
      router.push("/login");
      return;
    }

    fetch("http://localhost:3001/api/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("③ /me status:", res.status);
        return res.json().then((data) => {
          console.log("④ /me response body:", data);
          if (!res.ok) {
            throw new Error("認証エラー");
          }
          return data;
        });
      })
      .then((data) => {
        console.log("⑤ setUser 実行:", data.user);
        setUser(data.user);
      })
      .catch((err) => {
        console.error("⑥ catch に入った:", err);
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => {
        console.log("⑦ loading 終了");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (!user) {
    return <p>ユーザー情報が取得できませんでした。</p>;
  }

  return (
    <>
      <SectionTitle icon={FaUserPlus} subTitle="mypage" title="マイページ" />
      <UserCard user={user} />
    </>
  );
}
