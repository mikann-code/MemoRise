import { toeic200 } from "./wordList/toeic200";
import { splitIntoSections } from "./utils/splitWordList";
import type { WordItem, LevelsInfo, WordbookDetail } from "@/src/types/word";

// 50単語で区切ってpart分け
const toeic200Sections = splitIntoSections(toeic200, 50);
const toeic200Levels: LevelsInfo[] = toeic200Sections.map((section:WordItem[], index:number) => ({
  id: index + 1,
  title: `Part ${index + 1}`,
  words: section,
}));

export const basicWordInfo: Record<string, WordbookDetail> = {
  toeic200: {
    title: "TOEIC 初級200単語",
    description: "基礎〜中級レベルのTOEIC頻出単語セットです。",
    levels: toeic200Levels, 
  },
};
