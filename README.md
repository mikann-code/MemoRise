# MemoRise

英単語学習の継続を支援するWebアプリです。  
単語帳管理・テスト・学習記録を通じて、  
**「学習の習慣化」と「進捗の可視化」**を目的に開発しました。

---

## Features

- **Daily Word**
  - アプリを開いたときにすぐ学習できる導線
- **Wordbooks**
  - 自分専用の単語帳を作成・管理
- **Study Records**
  - カレンダー／ダッシュボードで学習履歴を可視化
- **Admin Wordbooks**
  - 管理者用単語帳の作成・CSV一括登録機能

---

## Tech Stack

- **Frontend**
  - Next.js (App Router)
  - TypeScript
  - React Query
  - CSS Modules

- **Backend**
  - Ruby on Rails (API mode)
  - PostgreSQL

---

## Design & Architecture

### API分離構成
フロントエンド（Next.js）とバックエンド（Rails API）を分離し、  
責務を明確化しました。

### UUIDを用いた設計
- Wordbook / Word に UUID を採用  
- URLから連番IDを推測できないように設計

### 学習履歴設計
- `study_records`（日単位の学習）
- `study_details`（単語帳単位の内訳）

に分けることで、  
**集計しやすさと拡張性**を重視しました。

### 管理者機能
- 管理者用単語帳を分離
- CSV一括登録により大量単語を効率的に登録可能

---

## Requirements

- Node.js 18+
- npm
- Ruby 3.x
- Bundler
- PostgreSQL

---

## Setup

### Frontend

```bash
cd frontend
npm install
