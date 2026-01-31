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

export default function LoginPage() {
  const login = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email, password });
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
          {login.isError && (
            <div className={styles.errorMessage}>
              {(login.error as Error).message}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off">
            <FloatingInput
              id="email"
              type="email"
              label="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdMailOutline />}
            />

            <FloatingInput
              id="password"
              type="password"
              label="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<MdLockOutline />}
            />

            <Button type="submit" disabled={login.isPending}>
              {login.isPending ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </>
      }
    />
  );
}
