"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { MdCreate, MdAdminPanelSettings } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";

// user用admin用でfooterを分離
const userNavItems = [
  { href: "/", label: "ホーム", icon: <FaHome size={24} /> },
  { href: "/words", label: "単語作成", icon: <MdCreate size={24} /> },
  { href: "/study-records", label: "学習データ", icon: <HiAcademicCap size={24} /> },
  { href: "/my-page", label: "マイページ", icon: <FaUser size={24} /> },
];

const adminNavItems = [
  { href: "/admin", label: "管理トップ", icon: <MdAdminPanelSettings size={24} /> },
  { href: "/admin/wordbooks", label: "単語帳管理", icon: <MdCreate size={24} /> },
  { href: "/admin/news", label: "ダッシュボード", icon: <MdCreate size={24} /> },
];

export const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // admin かどうかは URL で判定
  const isAdmin = pathname.startsWith("/admin");
  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <footer className={styles.footer}>
      {navItems.map((item, index) => {
        // ページ本来の active
        const isPageActive = pathname === item.href;

        // hover 中かどうか
        const isHover = hoverIndex === index;
        const isActive = hoverIndex !== null ? isHover : isPageActive;

        // user 側の /words だけ特殊遷移
        const handleClick = (e: React.MouseEvent) => {
          if (item.href !== "/words") return;

          e.preventDefault();

          const lastWordbookUuid = localStorage.getItem("lastWordbookUuid");

          if (lastWordbookUuid) {
            router.push(`/wordbooks/${lastWordbookUuid}`);
          } else {
            router.push("/wordbooks");
          }
        };

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.footerItem} ${
              isActive ? styles.isActive : ""
            }`}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={!isAdmin ? handleClick : undefined}
          >
            <div className={styles.footerIcon}>{item.icon}</div>
            <p className={styles.footerLabel}>{item.label}</p>
          </Link>
        );
      })}
    </footer>
  );
};
