import type { Metadata } from "next";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { AuthProvider } from "@/src/context/AuthContext";
import { ReactQueryProvider } from "@/src/providers/ReactQueryProvider";

import {
  Geist,
  Geist_Mono,
  Noto_Sans_JP,
  Zen_Maru_Gothic,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
});

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-zenmaru",
});

export const metadata = {
  title: "MemoRise",
  description:
    "MemoRise（メモライズ）は、毎日の学習で“覚える力”を育てる単語学習アプリです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} ${zenMaru.variable}`}
    >
      <body className="antialiased">
        <ReactQueryProvider>
          <AuthProvider>
            <Header />
            <main id="mainContainer">{children}</main>
            <Footer />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
