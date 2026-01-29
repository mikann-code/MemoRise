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
          <p className={styles.craftWordLabel}>自作単語帳を作成</p>
          <Image
            src="/images/icon-creative.svg"
            width={180}
            height={180}
            alt="自作単語帳の作成"
            className={styles.craftWordImage}
          />
        </Link>
        <Link
          className={styles.craftWordItem}
          href="/wordbooks"
          onClick={handleClick}
        >
          自作単語帳をテスト
          <Image
            src="/images/icon-practice.svg"
            width={200}
            height={200}
            alt="自作単語帳をテスト"
            className={styles.craftWordImage}
          />
        </Link>
      </div>
    </div>
  );
};
