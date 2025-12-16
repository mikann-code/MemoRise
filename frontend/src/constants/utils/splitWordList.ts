import type { WordItem } from "../basicWordInfo";

export const splitIntoSections = (words: WordItem[], size: number) => {
  const sections = [];
  for (let i = 0; i < words.length; i += size) {
    sections.push(words.slice(i, i + size));
  }
  return sections;
};
