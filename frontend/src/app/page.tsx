"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { DailyWord } from "../components/home/DailyWord";
import { BasicWord } from "../components/home/BasicWord";
import { CraftWord } from "../components/home/CraftWord";
import { StreakCard } from "../components/common/card/WeeklyStreakCard";

export default function Home() {
  return (
    <>
      <DailyWord />
      <BasicWord />
      <CraftWord />
      <StreakCard />
    </>
  );
}
