// 共通で使う level
export const COMMON_LEVELS = [
  { value: "beginner", label: "初級" },
  { value: "intermediate", label: "中級" },
  { value: "advanced", label: "上級" },
];

// 英検専用 level
export const EIKEN_LEVELS = [
  { value: "grade5", label: "5級" },
  { value: "grade4", label: "4級" },
  { value: "grade3", label: "3級" },
  { value: "pre2", label: "準2級" },
  { value: "grade2", label: "2級" },
  { value: "pre1", label: "準1級" },
  { value: "grade1", label: "1級" },
];

// label ごとに参照する level をまとめる
export const LEVELS_BY_LABEL = {
  junior_high: COMMON_LEVELS,
  high_school: COMMON_LEVELS,
  toeic: COMMON_LEVELS,
  toefl: COMMON_LEVELS,
  eiken: EIKEN_LEVELS,
} 

