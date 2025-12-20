// hooksの作成
"use client";
import { useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    console.error(
      "useAuth が AuthProvider の外で使われています。AuthProvider でラップしてください。"
    );
  }

  return context;
}
