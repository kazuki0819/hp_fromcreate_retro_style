# FROM CREATE HP プロジェクト 作業ルール

## リポジトリ構成
- origin = kazuki0819/hp_fromcreate_retro_style（本番）

## ブランチ運用
- main ブランチが本番（Vercel Production）
- 開発時は feature/* または fix/* ブランチを切り、main にマージする運用を推奨

## コミット後の push ルール
コミット後は以下のコマンドで push する:

git push origin main

## 禁止事項
- ユーザー確認なしでの強制 push（--force）
- ContactForm.tsx、HeroVideo、BreakoutGame、HeroCanvas、PixelPenguins、
  SectionVideo の意図しない変更
