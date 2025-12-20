// 品詞の型定義
export type Pos =
  | "noun"
  | "verb"
  | "adj"
  | "adv"
  | "conj"
  | "phr"
  | "other";

// 単語の型定義
export type WordItem = {
  uuid: string;
  question: string;
  answer: string;
  pos: readonly Pos[];
  review: boolean;
};

// 単語集のレベルごとの型定義
export type LevelsInfo = {
  id: number;
  title: string;
  words: WordItem[];
}

// 単語集の型定義
export type WordbookDetail = {
  title: string;
  description: string | null;
  levels: LevelsInfo[];
};

// 自作用単語集型定義
export type Wordbook = {
  uuid: string;
  title: string;
  description: string | null;
};
