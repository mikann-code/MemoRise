"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { basicWordInfo } from "@/src/constants/basicWordInfo";
import { SectionTitle } from "../../../components/common/ui/SectionTitle";
import styles from "./page.module.css";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { FaListUl } from "react-icons/fa6";
import { Button } from "@/src/components/common/ui/Button";

export default function BasicWordDetailPage() {
  const { id } = useParams();
  const data = basicWordInfo[id as string];
  const [startLevel, setStartLevel] = useState<number>(1);

  if (!data) {
    return (
      <div>
        <h2>😢 教材が見つかりません</h2>
        <p>{id} の教材データがありません。</p>
        <Link href="/basicWord">← 一覧へ戻る</Link>
      </div>
    );
  }

  return (
    <>
      <SectionTitle
        icon={HiOutlineClipboardCheck}
        subTitle="Words Overview"
        title={data.title}
      />
      <p className={styles.viewDescription}>{data.description}</p>

      <Button href={`/basicWord/${id}/test/${startLevel}`}>
        今すぐはじめる
      </Button>

      <div className={styles.viewLevelSelection}>
        {data.levels.map((level, index) => (
          <div key={index} className={styles.viewOption}>
            <Link
              href={`/basicWord/${id}/${level.id}`}
              className={styles.viewOptionLink}
            >
              <span className={styles.viewOptionNum}>{index + 1}</span>
              <h3 className={styles.viewOptionTitle}>{level.title}</h3>
            </Link>
            <Link href={`/basicWord/${id}/list/${index + 1}`}>
              <FaListUl className={styles.viewListIcon} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
