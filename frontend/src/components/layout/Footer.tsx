"use client";
import Link from "next/link";
import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";

export const Footer = () => {
  const pathname = usePathname();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const navItems = [
    { href: "/", label: "ホーム", icon: <FaHome size={24} /> },
    { href: "/words", label: "単語作成", icon: <MdCreate size={24} /> },
    { href: "/study", label: "学習データ", icon: <HiAcademicCap size={24} /> },
    { href: "/my-page", label: "マイページ", icon: <FaUser size={24} /> },
  ];

  return (
    <footer className={styles.footer}>
      {navItems.map((item, index) => {

        // ページ本来にactiveをつける
        const isPageActive = pathname === item.href;

        // hover中かどうか
        const isHover = hoverIndex === index;
        const isActive =
          hoverIndex !== null
            ? isHover
            : isPageActive;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.footerItem} ${isActive ? styles.isActive : ""}`}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className={styles.footerIcon}>{item.icon}</div>
            <p className={styles.footerLabel}>{item.label}</p>
          </Link>
        );
      })}
    </footer>
  );
}
