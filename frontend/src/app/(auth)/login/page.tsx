"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { Button } from "@/src/components/common/ui/Button";
import { FloatingInput } from "@/src/components/common/form/FloatingInput";
import { FaRightToBracket } from "react-icons/fa6";
import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
        credentials: "include",
        // Cookie を送る
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg =
          data?.message ||
          data?.error ||
          "ログインに失敗しました。メールアドレスとパスワードを確認してください。";
        setErrorMessage(msg);
        return;
      }

      // ★ ログイン確認
      const meRes = await fetch("http://localhost:3001/api/v1/me", {
        credentials: "include",
      });
      const meData = await meRes.json();
      console.log("ログイン中ユーザー:", meData.user);

      // ★ 遷移
      router.push("/mypage");
      return;
      
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "通信エラーが発生しました。時間をおいて再度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
