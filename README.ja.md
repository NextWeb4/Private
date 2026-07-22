<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/English-0969da?style=flat-square" alt="English"></a>
  <a href="README.zh-CN.md"><img src="https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-c8102e?style=flat-square" alt="简体中文"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/%E6%97%A5%E6%9C%AC%E8%AA%9E-8250df?style=flat-square" alt="日本語"></a>
</p>

<div align="center">

# NextWeb4 Private ランタイム

**個人記事アーカイブ [nextweb4.github.io/Private/](https://nextweb4.github.io/Private/) の公開ランタイム専用成果物です。**

[![公開サイト](https://img.shields.io/badge/live-%2FPrivate%2F-0969da?style=flat-square&logo=githubpages&logoColor=white)](https://nextweb4.github.io/Private/)
[![最終コミット](https://img.shields.io/github/last-commit/NextWeb4/Private?style=flat-square&logo=github&label=last%20commit)](https://github.com/NextWeb4/Private/commits/main)
[![リポジトリ容量](https://img.shields.io/github/repo-size/NextWeb4/Private?style=flat-square&logo=github)](https://github.com/NextWeb4/Private)
[![Stars](https://img.shields.io/github/stars/NextWeb4/Private?style=flat-square&logo=github)](https://github.com/NextWeb4/Private)
![HTML](https://img.shields.io/badge/HTML-static%20runtime-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=111)

</div>

## リポジトリの役割

名前に `Private` が含まれますが、`NextWeb4/Private` は**公開** GitHub Pages ランタイムリポジトリです。`/Private/` プロジェクトサイトでブラウザーが直接使う成果物だけを収録し、非公開のアプリケーションソース、認証情報、管理バックエンド、完全な開発履歴は収録しません。

第 6 回監査の証拠から、このリポジトリが生成済みデプロイ成果物であることは確認できますが、2 つの非公開ソースリポジトリのデプロイ先に関する記述は競合しています。そのため、本書では未確認の正本リポジトリを指定しません。公開経路を変える前に、現在有効なワークフローの対象を確認してください。デプロイ時にはランタイムツリー全体が置換される可能性があります。

## 監査済みインベントリ

2026-07-22 に `main` を再帰監査した時点で、コミット済みファイルは 656 個でした。

| 領域 | ファイル数 | 用途 |
| --- | ---: | --- |
| `article/` | 562 | 事前レンダリング済みの個別記事ページ |
| `module/` | 3 | 投資・思想、内省、技術・ネットワークの索引 |
| `data/` | 8 | 3 つの検索索引、3 つの本文データ、および各統合ファイル |
| `uploads/` | 74 | 記事メディアとサイトアイコン |
| リポジトリ直下 | 9 | ホーム、About、404、共有資産、`_headers`、`.nojekyll` |

この数は監査対象コミットの状態であり、製品上限ではありません。生成成果物が変わった場合は現在のツリーから再集計してください。

## 閲覧機能

- `index.html` はアーカイブ入口、モジュール移動、記事発見、同一オリジン検索を提供します。
- `module/` はサーバー側レンダリングを使わず、アーカイブを 3 つのテーマに整理します。
- `article/` の各ファイルは事前レンダリング済み HTML であり、閲覧にデータベースやアプリケーションサーバーは不要です。
- `about.html` は著者情報、中国語・英語の画面切り替え、現在の連絡先を提供します。
- 検索はコミット済み JSON を読み、ブラウザー内で順位付けし、生成ページへ直接リンクします。
- 毎日の Bing 壁紙は任意の段階的拡張です。要求や画像の失敗時も単色背景で内容を利用できます。

## ランタイム構成

| パス | ランタイム上の責務 |
| --- | --- |
| `index.html`, `404.html` | メイン入口とプロジェクトサイトの未検出ページ |
| `about.html` | 著者情報とローカルの言語設定 |
| `article/` | 公開済み記事 562 件 |
| `module/` | 生成済みカテゴリ文書 3 件 |
| `data/search-index.json` | 統合された小型検索索引 |
| `data/search-index/` | カテゴリ別の小型索引 |
| `data/search-content.json` | 統合された検索対象本文データ |
| `data/search-content/` | カテゴリ別本文データ |
| `uploads/` | 公開 HTML から参照するメディア |
| `site.css`, `article.css` | ホーム/モジュールと記事の共有表示 |
| `site.js` | 年表示、UI 保護上の注意表示、壁紙検証、キャッシュ、フォールバック |
| `article-search.js` | ブラウザー内検索と候補表示 |
| `.nojekyll` | 生成ツリーに対する Jekyll の再処理を防止 |
| `_headers` | 対応する予備ホスト向けヘッダーポリシー。GitHub Pages は適用しません |

## ローカルプレビュー

パッケージのインストールは不要です。リポジトリ直下で実行します。

```bash
python -m http.server 8000
```

`http://localhost:8000/` を開いてください。検索は同一オリジンの `fetch()` でコミット済み JSON を読むため、`file://` ではなく HTTP を使います。

このランタイムツリーには、リポジトリ固有のビルド、自動テスト、lint、format、パッケージマネージャー、CI のコマンドは見つかりませんでした。ランタイムだけの手動確認をソースレベルの自動テスト範囲として扱わないでください。現在のソース/デプロイの競合により、ここではソース側のコマンドを断定しません。

## ソースとデプロイの境界

このリポジトリはデプロイ先であり、直接保守するソースツリーではありません。安全な流れは次のとおりです。

1. 現在有効な非公開ソースを特定し、ワークフローの対象を確認します。第 6 回監査の証拠はこの点で競合しています。
2. 確認済みソースでコンテンツ、テンプレート、検証規則を編集し、その実在するビルドおよびテストゲートを実行します。
3. レビュー済みの公開許可リストだけを出力します。
4. このランタイムツリーを原子的に置換し、GitHub Pages から `main` を配信します。
5. 公開済み `/Private/` URL、代表記事、検索、メディア、404 の挙動を確認します。

バックエンドコード、生のソースデータ、パスワード、トークン、バックアップ、ローカルツール、非公開保守文書を追加しないでください。コピーや開発者ツールを UI スクリプトで妨げても、公開静的リポジトリ内のバイトを秘密にはできません。

## 検索とコンテンツの整合性

ランタイムは小型の Bloom filter 型索引と検索対象本文を別々に保持します。同一オリジンのファイルを取得した後、問い合わせ処理と順位付けはローカルで行われ、検索 API はありません。そのため記事変更時には、HTML、モジュール項目、小型索引、本文データ、メディア参照を同期する必要があります。

このリポジトリにはジェネレーターがないため、ランタイムを直接一括修正するのは危険です。有効なソースを確認してからそこで再生成し、数百の出力を手で編集せずに公開マニフェストを厳密に検証してください。

## ネットワーク、保存、プライバシー

記事 HTML、スタイル、スクリプト、メディア、検索データは同一オリジンの静的ファイルです。`site.js` は `https://bing.biturl.top/` から壁紙メタデータを取得することがあります。認証情報と referrer を送らず、6 秒でタイムアウトし、HTTPS の `bing.com` ホストにある画像だけを受け入れます。壁紙障害は本文を妨げません。

壁紙キャッシュと About の言語選択は `localStorage` を使います。この公開成果物にはサーバー側の秘密保持や認証境界はありません。README のバッジは `img.shields.io` を読みますが、README 表示だけに関係し、サイト依存関係は増やしません。

## 検証チェックリスト

- HTTP でプレビューし、ホーム、About、3 つのモジュール、代表記事を開く。
- 空、中国語、英語、日付、該当なし、キーボード、連続変更の検索を試す。
- 大文字小文字を区別するホストを想定し、UTF-8 とパーセント符号化された非 ASCII パスを確認する。
- 変更したメディア URL がすべて解決し、未参照の非公開アップロードが成果物に混入していないことを確認する。
- 狭い画面、キーボードフォーカス、視差効果の軽減、About の言語設定を確認する。
- 検索索引、壁紙 API、画像、ストレージの障害を再現し、主要内容が読めることを確認する。
- 存在しないパスを要求し、誤った SPA フォールバックではなく `404.html` が出ることを確認する。

## 状態、制限、コントリビューション

2026-07-22 の監査時点で、リポジトリは公開、未アーカイブ、Pages 有効でした。主なリスクはソースと成果物のずれ、直接変更の上書き、大きな静的メディア、生成索引の不整合、非公開ソースだけに属する情報の誤公開です。

現在有効なソースを確認してから変更を始め、検証済み成果物としてのみ反映してください。ソース設計とデプロイ契約を意図的に同時変更し、テストする場合を除き、ランタイムはフレームワークなしに保ちます。

## 連絡先

- [Rays688888@Gmail.com](mailto:Rays688888@Gmail.com)

## ライセンス

ライセンスファイルは検出されませんでした。公開されていること自体は、サイトコード、記事、アップロード済みメディアの再利用許可を意味しません。個々の記事素材には別の権利や出典条件がある場合もあります。
