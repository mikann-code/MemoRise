"use client";

import { useState } from "react";
import { useMe } from "@/src/hooks/useMe";
import { useUpdateProfile } from "@/src/hooks/useUpdateProfile";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { RiEdit2Line } from "react-icons/ri";
import { MdLockOutline, MdPersonOutline } from "react-icons/md";
import { FormLayout } from "@/src/components/layout/FormLayout";
import { FloatingInput } from "@/src/components/common/ui/FloatingInput";
import { Button } from "@/src/components/common/ui/Button";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { data: user, isLoading, isError } = useMe();
  if (isLoading) return <p>読み込み中...</p>;
  if (isError || !user) return <p>ログインしてください</p>;

  return <EditProfileForm user={user} />;
}

type Props = {
  user: {
    name: string | null;
  };
};

function EditProfileForm({ user }: Props) {
  const { mutateAsync, isPending } = useUpdateProfile();
  const [name, setName] = useState(user.name ?? "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    password: "",
    passwordConfirmation: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      name: "",
      password: "",
      passwordConfirmation: "",
    });

    const wantsPasswordChange =
      password.length > 0 || passwordConfirmation.length > 0;

    let hasError = false;

    if (!name.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: "名前を入力してください",
      }));
      hasError = true;
    }

    if (wantsPasswordChange) {
      if (password !== passwordConfirmation) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirmation: "パスワード（確認）が一致しません",
        }));
        hasError = true;
      }
    }

    if (hasError) return;

    try {
      await mutateAsync({
        name: name.trim(),
        password: wantsPasswordChange ? password : undefined,
        password_confirmation: wantsPasswordChange
          ? passwordConfirmation
          : undefined,
      });

      alert("更新しました");
      router.push("/my-page");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "更新に失敗しました";

      setErrors((prev) => ({
        ...prev,
        name: message,
      }));
    }
  };

  return (
    <FormLayout
      header={
        <SectionTitle
          icon={RiEdit2Line}
          subTitle="profile"
          title="プロフィール編集"
        />
      }
      description="名前とパスワードを変更できます"
      form={
        <form onSubmit={onSubmit}>
          <FloatingInput
            id="name"
            label="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            icon={<MdPersonOutline />}
            error={errors.name}
          />

          <FloatingInput
            id="password"
            label="新しいパスワード（任意）"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            icon={<MdLockOutline />}
            error={errors.password}
          />

          <FloatingInput
            id="passwordConfirm"
            label="新しいパスワード（確認）"
            type="password"
            value={passwordConfirmation}
            onChange={(e) =>
              setPasswordConfirmation(e.target.value)
            }
            disabled={isPending}
            icon={<MdLockOutline />}
            error={errors.passwordConfirmation}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "更新中..." : "保存"}
          </Button>
        </form>
      }
    />
  );
}
