"use client";
import styles from "./DailyWord.module.css";
import { IoBulbOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { SectionTitle } from "../common/ui/SectionTitle";

export const DailyWord = () => {
  // 仮のwords
  const words = [{ question: "open", answer: "開く" }];
  const dairy = words[0];

  // Google TTS による音声再生
  const handleSpeak = async () => {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: dairy.question }),
      });

      const data = await res.json();

      if (!data.audioContent) {
        console.error("音声データが返されませんでした");
        return;
      }

      // Base64 の mp3 を再生
      const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
      audio.play();
    } catch (error) {
      console.error("音声再生エラー:", error);
    }
  };

  return (
    <section className={styles.dairySection}>
      <SectionTitle
        icon={IoBulbOutline}
        subTitle="Today’s Vocab"
        title="今日の一問"
      />

      <div className={styles.dairyWordContainer}>
        <div className={styles.dairyWord}>{dairy.question}</div>

        <div className={styles.dairyPronunciation}>
          <span>Pronunciation</span>
          <div
            className={styles.dairyPronunciationIconWrapper}
            onClick={handleSpeak}
          >
            <IoVolumeMediumOutline className={styles.dairyPronunciationIcon} />
          </div>
        </div>
      </div>
    </section>
  );
}
