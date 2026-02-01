"use client";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useMe } from "@/src/hooks/useMe";

type Props = {
  children: ReactNode;
};

// 認証済みユーザーのみがアクセスできるレイアウト
export default function AuthLayout({ children }: Props) {
  const { data: user, isLoading, isError } = useMe();

  console.log(user)

  if (isLoading) {
    return <p>読み込み中...</p>;
  }


  if (isError) {
    redirect("/login");
  }

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
