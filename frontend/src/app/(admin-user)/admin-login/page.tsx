"use client";

import { useState } from "react";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { Button } from "@/src/components/common/ui/Button";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { FaUserShield } from "react-icons/fa6";
import styles from "./page.module.css";
import { useAdminLogin } from "@/src/hooks/useAdminLogin";
import { MdLockOutline, MdMailOutline } from "react-icons/md";
import { FormLayout } from "@/src/components/layout/FormLayout";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const login = useAdminLogin();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      email: "",
      password: "",
    });

    let hasError = false;

    if (!email.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: "メールアドレスを入力してください",
      }));
      hasError = true;
    }

    if (!password.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: "パスワードを入力してください",
      }));
      hasError = true;
    }

    if (hasError) return;

    login.mutate(
      { email, password },
      {
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "ログインに失敗しました";

          setErrors({
            email: "",
            password: message,
          });
        },
      }
    );
  };

  return (
    <FormLayout
      header={
        <SectionTitle
          icon={FaUserShield}
          subTitle="Admin Login"
          title="管理者ログイン"
        />
      }
      description={
        <p className={styles.description}>
          管理者アカウントでログインしてください。
        </p>
      }
      form={
        <form onSubmit={handleSubmit} autoComplete="off">
          <FloatingInput
            id="email"
            type="email"
            label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MdMailOutline />}
            error={errors.email}
          />

          <FloatingInput
            id="password"
            type="password"
            label="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<MdLockOutline />}
            error={errors.password}
          />

          <Button type="submit" disabled={login.isPending}>
            {login.isPending ? "ログイン中..." : "ログイン"}
          </Button>
        </form>
      }
    />
  );
}
