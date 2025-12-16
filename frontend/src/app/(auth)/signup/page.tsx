"use client";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { FloatingInput } from "@/src/components/common/form/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import styles from "./page.module.css";

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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    setErrors({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirm,
          },
        }),
      });

      const data = await res.json();

      if (res.status === 422) {
        setErrors({
          name: formatError("name", data.errors?.name?.[0]),
          email: formatError("email", data.errors?.email?.[0]),
          password: formatError("password", data.errors?.password?.[0]),
          passwordConfirm: formatError(
            "password_confirmation",
            data.errors?.password_confirmation?.[0]
          ),
        });
        return;
      }

      if (res.status >= 500) {
        setMessage(
          "サーバー側で問題が発生しました（DB接続エラーの可能性あり）"
        );
        return;
      }

      if (res.ok) {
        setMessage("会員登録が成功しました！");
      }
    } catch (err) {
      setMessage("サーバーに接続できませんでした");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SectionTitle icon={FaUserPlus} subTitle="Signup" title="会員登録" />

      <div className={styles.signupDescription}>
        MemoRise をもっと便利に使うために、アカウントを作成しましょう。
      </div>

      <div className={styles.signupContainer}>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <FloatingInput
            id="name"
            label="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            error={errors.name}
          />

          <FloatingInput
            id="email"
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            error={errors.email}
          />

          <FloatingInput
            id="password"
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            error={errors.password}
          />

          <FloatingInput
            id="passwordConfirm"
            label="パスワード（確認）"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={loading}
            error={errors.passwordConfirm}
          />

          <Button>
            <button
              type="submit"
              className={styles.signupSubmitBtn}
              disabled={loading}
            >
              {loading ? "送信中..." : "登録する"}
            </button>
          </Button>
        </form>

        {loading && <p className={styles.signupLoading}>送信中です…</p>}
        {message && <p className={styles.signupSuccess}>{message}</p>}
      </div>
    </>
  );
}
