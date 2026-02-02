"use client";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// 認証済みユーザーのみがアクセスできるレイアウト
export default function AuthLayout({ children }: Props) {
  return <>{children}</>;
}
