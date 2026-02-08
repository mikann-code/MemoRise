"use client";

import { useState } from "react";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { Button } from "@/src/components/common/ui/Button";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { FaRightToBracket } from "react-icons/fa6";
import { MdLockOutline, MdMailOutline } from "react-icons/md";
import { useLogin } from "@/src/hooks/useLogin";
import { FormLayout } from "@/src/components/layout/FormLayout";
import styles from "./page.module.css";
import Link from "next/link";

export default function LoginPage() {
  const login = useLogin();

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

    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: "メールアドレスを入力してください",
      }));
      hasError = true;
    }

    if (!password) {
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
        onError: (err: Error) => {
          setErrors({
            email: "",
            password: err.message,
          });
        },
      }
    );
  };

  return (
    <FormLayout
      header={
        <SectionTitle
          icon={FaRightToBracket}
          subTitle="User Login"
          title="ログイン"
        />
      }
      description={
        <p className={styles.description}>
          登録済みのアカウントでログインします。
        </p>
      }
      form={
        <>
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

          <div className={styles.signupLinkWrapper}>
            <Link href="/signup" className={styles.signupLink}>
              新規登録はこちら
            </Link>
          </div>
        </>
      }
    />
  );
}
