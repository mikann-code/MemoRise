"use client";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import { MdLockOutline, MdMailOutline } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FormLayout } from "@/src/components/layout/FormLayout";
import styles from "./page.module.css";
import { useSignup } from "@/src/hooks/useSignup";

const attributeLabels: Record<string, string> = {
  name: "名前",
  email: "メールアドレス",
  password: "パスワード",
  password_confirmation: "パスワード（確認）",
};

const formatError = (field: string, msg?: string) => {
  if (!msg) return "";
  const label = attributeLabels[field] || "";
  return `${label}${msg}`;
};

export default function SignupPage() {
  const signupMutation = useSignup();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setErrors({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });

    signupMutation.mutate(
      {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      },
      {
        onSuccess: () => {
          setMessage("会員登録が成功しました！");
        },
        onError: (err: any) => {
          if (err?.errors) {
            setErrors({
              name: formatError("name", err.errors?.name?.[0]),
              email: formatError("email", err.errors?.email?.[0]),
              password: formatError("password", err.errors?.password?.[0]),
              passwordConfirm: formatError(
                "password_confirmation",
                err.errors?.password_confirmation?.[0]
              ),
            });
          } else {
            setMessage("サーバーに接続できませんでした");
          }
        },
      }
    );
  };

  const loading = signupMutation.isPending;

  return (
    <FormLayout
      header={
        <SectionTitle icon={FaUserPlus} subTitle="Signup" title="会員登録" />
      }
      description={
        <p className={styles.signupDescription}>
          MemoRise をもっと便利に使うために、アカウントを作成しましょう。
        </p>
      }
      form={
        <>
          <form onSubmit={handleSubmit}>
            <FloatingInput
              id="name"
              label="名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              error={errors.name}
              icon={<IoPerson />}
            />

            <FloatingInput
              id="email"
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={errors.email}
              icon={<MdMailOutline />}
            />

            <FloatingInput
              id="password"
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              error={errors.password}
              icon={<MdLockOutline />}
            />

            <FloatingInput
              id="passwordConfirm"
              label="パスワード（確認）"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              disabled={loading}
              error={errors.passwordConfirm}
              icon={<MdLockOutline />}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "送信中..." : "登録する"}
            </Button>
          </form>

          {loading && <p className={styles.signupLoading}>送信中です…</p>}
          {message && <p className={styles.signupSuccess}>{message}</p>}
        </>
      }
    />
  );
}
