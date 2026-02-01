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
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const wantsPasswordChange =
      password.length > 0 || passwordConfirmation.length > 0;

    if (!name.trim()) {
      setError("名前を入力してください");
      return;
    }

    if (wantsPasswordChange) {
      if (password.length < 8) {
        setError("パスワードは8文字以上にしてください");
        return;
      }
      if (password !== passwordConfirmation) {
        setError("パスワード（確認）が一致しません");
        return;
      }
    }

    try {
      await mutateAsync({
        name: name.trim(),
        password: wantsPasswordChange ? password : undefined,
        password_confirmation: wantsPasswordChange
          ? passwordConfirmation
          : undefined,
      });

      alert("更新しました");
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗しました");
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
          {error && <p style={{ color: "#ff6b6b", fontSize: 12 }}>{error}</p>}

          <FloatingInput
            id="name"
            label="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            icon={<MdPersonOutline />}
          />

          <FloatingInput
            id="password"
            label="新しいパスワード（任意）"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            icon={<MdLockOutline />}
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
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "更新中..." : "保存"}
          </Button>
        </form>
      }
    />
  );
}
