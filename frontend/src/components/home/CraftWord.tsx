import React from "react";
import { SectionTitle } from "../common/ui/SectionTitle";
import { FiEdit3 } from "react-icons/fi";
import styles from "./CraftWord.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMe } from "@/src/hooks/useMe";

export const CraftWord = () => {
  const router = useRouter();
  const { data: user } = useMe();

  const handleListClick = (e: React.MouseEvent<HTMLElement>) => {
  if (!user) {
    router.push("/wordbooks");
    return;
  }

  const uuid = localStorage.getItem("lastWordbookUuid");

  if (uuid) {
    router.push(`/wordbooks/${uuid}/list`);
  } else {
    router.push("/wordbooks");
  }
};

  const handleTestClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      router.push("/wordbooks");
      return;
    }
    const uuid = localStorage.getItem("lastWordbookUuid");
    if (uuid) {
      router.push(`/wordbooks/${uuid}/test`);
    } else {
      router.push("/wordbooks");
    }
  };

  return (
    <div className={styles.craftWordContainer}>
      <SectionTitle
        icon={FiEdit3}
        subTitle="Create & Learn"
        title="オリジナル単語帳"
      />

      <div className={styles.craftWordItems}>
        <div className={styles.craftWordItem}  onClick={handleListClick}>
          <p className={styles.craftWordLabel}>作成する</p>
          <Image
            src="/images/icon-creative.svg"
            width={180}
            height={180}
            alt="作成する"
            className={styles.craftWordImage}
          />
        </div>
        <div
          className={styles.craftWordItem}
          onClick={handleTestClick}
        >
          <p className={styles.craftWordLabel}>テストする
          </p>
          <Image
            src="/images/icon-practice.svg"
            width={200}
            height={200}
            alt="テストする"
            className={styles.craftWordImage}
          />
        </div>
      </div>
    </div>
  );
};
