import React from "react";
import { SectionTitle } from "../common/ui/SectionTitle";
import { FiEdit3 } from "react-icons/fi";
import styles from "./CraftWord.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CraftWord = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Linkのデフォルト遷移を止める

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
        <Link className={styles.craftWordItem} href="/wordbooks">
          <p className={styles.craftWordLabel}>作成する</p>
          <Image
            src="/images/icon-creative.svg"
            width={180}
            height={180}
            alt="作成する"
            className={styles.craftWordImage}
          />
        </Link>
        <Link
          className={styles.craftWordItem}
          href="/wordbooks"
          onClick={handleClick}
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
        </Link>
      </div>
    </div>
  );
};
