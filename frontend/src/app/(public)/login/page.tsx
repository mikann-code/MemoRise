"use client";

import { useState } from "react";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { Button } from "@/src/components/common/ui/Button";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { FaRightToBracket } from "react-icons/fa6";
import styles from "./page.module.css";
import { useLogin } from "@/src/hooks/useLogin";
import { MdLockOutline } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";

export default function LoginPage() {
  const login = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <>
      <SectionTitle icon={FaRightToBracket} subTitle="User Login" title="ログイン" />

      <p className={styles.description}>
        登録済みのアカウントでログインします。
      </p>

      {login.isError && (
        <div className={styles.errorMessage}>
          {(login.error as Error).message}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.formItem}>
          <FloatingInput
            id="email"
            type="email"
            label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MdMailOutline />}
          />
        </div>

        <div className={styles.formItem}>
          <FloatingInput
            id="password"
            type="password"
            label="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<MdLockOutline />}
          />
        </div>

        <div className={styles.submitWrapper}>
          <Button>
            <button type="submit" disabled={login.isPending}>
              {login.isPending ? "ログイン中..." : "ログイン"}
            </button>
          </Button>
        </div>
      </form>
    </>
  );
}
