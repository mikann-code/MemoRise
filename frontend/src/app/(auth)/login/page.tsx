"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { Button } from "@/src/components/common/ui/Button";
import { FloatingInput } from "@/src/components/common/form/FloatingInput";
import { FaRightToBracket } from "react-icons/fa6";
import styles from "./page.module.css";

import { useAuth } from "@/src/context/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // すでにログインしていたら my-page へ
  useEffect(() => {
    if (!loading && user) {
      router.push("/my-page");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(
          data?.error ||
            "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
        );
        return;
      }

      // ✅ token を保存（login の責務）
      localStorage.setItem("token", data.token);

      // ✅ Context に user を反映（超重要）
      setUser(data.user);

      // ✅ 遷移
      router.push("/my-page");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "通信エラーが発生しました。時間をおいて再度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <>
      <SectionTitle icon={FaRightToBracket} subTitle="Login" title="ログイン" />

      <p className={styles.description}>
        登録済みのアカウントでログインします。
      </p>

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.formItem}>
          <FloatingInput
            id="email"
            type="email"
            label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formItem}>
          <FloatingInput
            id="password"
            type="password"
            label="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.submitWrapper}>
          <Button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "ログイン中..." : "ログイン"}
            </button>
          </Button>
        </div>
      </form>
    </>
  );
}
