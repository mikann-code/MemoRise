"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useAdminMe } from "@/src/hooks/useAdminMe";

type Props = {
  children: ReactNode;
};

// 管理者のみ通す
export default function AdminLayout({ children }: Props) {
  const { admin, isLoading, isError } = useAdminMe();

  console.log(admin);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  // 未ログイン or エラー
  if (isError || !admin) {
    redirect("/admin-login");
  }

  // role
  if (admin.role !== "admin") {
    redirect("/admin-login");
  }

  return <>{children}</>;
}
