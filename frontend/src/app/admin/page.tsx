"use client";
import { SectionTitle } from "@/src/components/common/ui/SectionTitle";
import { LuBookMarked } from "react-icons/lu";

export default function AdminPage() {
  return (
    <>
      <SectionTitle
        icon={LuBookMarked}
        subTitle="Admin Page"
        title="管理者ページ"
      />
    </>
  );
}
