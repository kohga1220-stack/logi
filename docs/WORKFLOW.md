# 開発の分担と進め方

Logi は、**あなた（M1ko）・Claude・Antigravity** の3者で作っています。認識がずれないように、役割・境界・手順をここで固定します。
作業を始める前に、この文書と [docs/STATUS.md](STATUS.md) を読んでください。

## 1. 役割

| 担当 | 役割 | 決めること |
|---|---|---|
| **M1ko（あなた）** | 決定者 | 提案（`docs/proposals/`）の選択、語感の確認、PRのマージ |
| **Claude** | 文法設計 | 音韻・語尾・語順・機能語・派生・造語の規則、翻訳機、検査ツール、CI |
| **Antigravity** | 単語の増量 | 名詞・動詞・形容詞・副詞（内容語）を、決まった規則で増やす |

3者とも、PRのマージはしません。マージするのはあなただけです。

## 2. 触ってよい範囲

| 範囲 | Claude | Antigravity |
|---|---|---|
| `docs/grammar.md`、`docs/proposals/` | ○ | ×（読むだけ） |
| `web/translator.js`、`web/index.html`、`web/test/` | ○ | ×（`web/index.html` と `web/README.md` は語数の数字だけ可） |
| `tools/`、`tests/`、`corpus/`、`.github/` | ○ | × |
| `dictionary/anti_additions.csv`、`dictionary/final.csv`、`dictionary/glossary_en.csv` | ○ | ○（`anti_additions.csv` は内容語だけ。`coin_words.py` が造語して反映する）|
| `dictionary/function_additions.csv`（機能語）、その他の `*_additions.csv` | ○ | ×（機能語は M1ko が決めてから Claude が入れる）|
| `dictionary/word_review.csv`、`docs/review/` | ○（ツールの更新）| ○（`make_review.py` の再生成）|
| `web/lexicon.js` | ○ | ○（`build_web.py` で再生成するだけ。手で書かない）|
| `README.md`（変更履歴・構成）、`docs/STATUS.md` | ○ | ○ |

Antigravity のブランチ（`anti/*`）は、CI が上の表のとおりか自動で確かめます（`tools/check_scope.py`）。

### Antigravity の追加リスト

Antigravity は、語を足すときに **`dictionary/anti_additions.csv`** に行を追記します（列: `english,pos,meaning_ja,aliases,source`）。このファイルは `tools/coin_words.py` に登録済みなので、`tools/` を変えずに使えます。新しいリストを作る必要はありません。

- `pos` は `noun` / `verb` / `adj` / `adv` のどれかです。機能語（`pronoun` `prep` など）は足しません。
- `english` は、辞書にない自然な英語1語（見出し語）にします。同じ英語・品詞の語や、同じ日本語の意味の語がすでにあるときは、`coin_words.py` が何も追加せずに止まり、重なった行を表示します。その行を消してください（同じ意味の語を増やさないため）。
- `source` には、語の選び方（例: `core_candidates.py の候補 123`、`テーマ: 感情`）を書きます。
- Logi の語形は **`coin_words.py` に作らせます**（手で作りません）。2音節の空き形は114個しか残っていないので、新しい語はほとんど3音節になります（`python tools/free_forms.py`）。
- 語の選び方の例: `python tools/core_candidates.py` が出す、日本語の基本語彙で辞書にまだ無い語。

### 内容語と機能語

- **内容語**（名詞・動詞・形容詞・副詞）は、Antigravity が既存の規則で増やせます。
- **機能語**（代名詞・マーカー・接続詞・前置詞・数詞・指示詞・はい／いいえ）、新しい品詞や語尾、派生の規則、音韻の規則は、**Claude が提案し、あなたが決めてから**実装します。
- 単語を増やす途中で文法が足りないと気づいたら、勝手に決めず、`docs/STATUS.md` の「文法への依頼」に書きます。

## 3. ブランチ・コミット・PR

- ブランチ名: Claude は `claude/…`、Antigravity は `anti/…`、あなたの手作業は `user/…`。
- 1つのPRは1つの目的にします。ドラフトで出して、あなたが確認してマージします。
- コミットの末尾に、誰が作ったかを残します（Claude は `Co-Authored-By: Claude …`、Antigravity は `Co-authored-by: Google Antigravity …`）。
- 他の人のブランチを書き換えたり、`main` に直接プッシュしたりしません。

## 4. 作業の流れ

**始めるとき**
1. `git checkout main && git pull origin main`
2. `docs/STATUS.md` を読む（決定待ち・進行中のPR・文法への依頼）。
3. 自分の担当の範囲か確かめる（§2）。

**終えるとき**
1. 検査をすべて通す（§5）。
2. `docs/STATUS.md` を更新する（やったこと、次にやること、決定してほしいこと）。
3. PR を作る。説明に「何を・なぜ・確認したこと・人の確認が要る点」を書く。

## 5. 検査（語彙を足したとき）

```
python tools/coin_words.py            # 追加リストから造語して辞書に入れる
python tools/validate.py              # 音韻・語尾の規則
python tools/synonyms.py --check      # 同義語の扱い
python tools/build_web.py             # web/lexicon.js を作り直す
python tools/make_review.py           # 確認表を作り直す
python tools/check_consistency.py --fix   # 語数の表記を実際の数に合わせる
python -m pytest
node --test web/test/translator.test.js
```

追加した語の意味（日本語・英語）と音は、人の確認を受けるまで「案」です。PR の説明にそう書きます。

## 6. ずれを防ぐ仕組み

各担当は、作業を始めるときに、リモートの `main`・開いているPR（CIの状態を含む）・直近のコミットを確かめ、「いまのリポジトリの状態」を把握してから動きます。

| 仕組み | 防ぐこと |
|---|---|
| `docs/STATUS.md` | 3者が、いまの状態・決定待ち・次にやることを同じ場所で見る |
| `.github/workflows/tests.yml` の検査 | 辞書・文書・ツールの食い違い（`check_consistency.py`）、担当範囲の外の変更（`check_scope.py`）|
| `.github/pull_request_template.md` | PRに書くべきことの抜け |
| `CLAUDE.md`・`AGENTS.md` | 作業を始めるエージェントが、最初にこの文書を読む |
| `docs/proposals/` | 文法の決定を、選択肢と理由つきで残す |

### Antigravity に最初に渡す文

Antigravity が `AGENTS.md` を自動で読むかは、こちらで確認できていません。新しい作業を始めるときは、次を最初に伝えてください。

> このリポジトリの `docs/WORKFLOW.md` と `docs/STATUS.md` を読んで、あなたの担当（単語の増量）の範囲を守ってください。ブランチは `anti/…` にして、`main` に直接プッシュしないでください。

## 7. 引き継ぎメッセージの型

エージェント同士（またはあなたへ）作業を渡すときは、次の項目を箇条書きで書きます。数字は、実際に実行して確かめた値だけを書きます。

```
【引き継ぎ】担当: Claude / Antigravity  日付:
- 最新の main: <コミット>（git pull で同期済みか）
- やったこと: <変更の要点>
- 数字: 辞書の語数（全体 / active）、pytest の件数、node テストの件数
- 変更したファイル: <一覧>
- 人の確認が要る点: <案のままのもの>
- 次の作業: <担当ごとに>
- 決定してほしいこと: <M1ko へ>
```

同じ内容を `docs/STATUS.md` にも反映します。引き継ぎは、STATUS.md を正とします（別の調整用の文書は作りません）。

## 8. この仕組みではできないこと

- 3者のどれかが、いつもGitHubを見張っていることはできません。エージェントは、作業している間だけ動きます。代わりに、CI が毎回ずれを検査し、`docs/STATUS.md` が引き継ぎの場所になります。
- 「PRのマージ」は、決めた人（M1ko）だけがします。エージェントがコマンドで代理マージすることは、この文書では認めていません（マージは、ずれを止める最後の関門です）。変えたいときは、M1ko がこの文書を書き換えて決めます。
- `main` への直接プッシュを止めるには、GitHub の設定（Settings → Branches → Branch protection rules で「Require a pull request」と「Require status checks: pytest」）が要ります。リポジトリの持ち主の設定です。
