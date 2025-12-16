"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { SectionTitle } from "../../components/common/ui/SectionTitle";
import styles from "./page.module.css";
import { FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <SectionTitle icon={FaChartLine} subTitle="Streak" title="継続記録" />
      <div>
        <select name="" id="">
          <option value="">問題集A</option>
          <option value="">問題集B</option>
          <option value="">問題集C</option>
          <option value="">問題集D</option>
        </select>

        <p className={styles.createNew}>新しく単語帳を作成する</p>
      </div>
    </>
  );
}
