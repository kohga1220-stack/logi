# 開発の分担と進め方

Logi は、**あなた（M1ko）・Claude・Antigravity** の3者で作っています。認識がずれないように、役割・境界・手順をここで固定します。
作業を始める前に、この文書と [docs/STATUS.md](STATUS.md) を読んでください。

## 1. 役割

| 担当 | 役割 | 決めること |
|---|---|---|
| **M1ko（あなた）** | 決定者 | 提案（`docs/proposals/`）の選択、語感の確認、§9 の対象外のPRのマージ |
| **Claude** | 文法設計 | 音韻・語尾・語順・機能語・派生・造語の規則、翻訳機、検査ツール、CI |
| **Antigravity** | 単語の増量 | 名詞・動詞・形容詞・副詞（内容語）を、決まった規則で増やす |

PRのマージは、§9 の条件をすべて満たすPRに限り、Claude と Antigravity が自動で行います（M1ko の了承、2026-10-15）。それ以外のPRは、あなたがマージします。

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
- `source` には、語の選び方を、安定した形で書きます（例: 日本語の見出し語、`テーマ: 感情`）。`core_candidates.py の候補 123` のような番号は、リストが減ると合わなくなるので使いません。
- Logi の語形は **`coin_words.py` に作らせます**（手で作りません）。2音節の空き形は100個ほどしか残っていないので、新しい語はほとんど3音節になります（`python tools/free_forms.py`）。
- 語の選び方の例: `python tools/core_candidates.py` が出す、日本語の基本語彙で辞書にまだ無い語。

### 語を選ぶときの決まり

PR #26（25語）の見直しで足りなかった点です。追加する前に、次を確かめます。

1. **意味が重なる語がないか、自分で調べる。** `coin_words.py` が止めるのは、日本語の意味の文字列が**完全に同じ**ときだけです。`dictionary/final.csv` の `meaning_ja` を、候補の日本語の一部でも検索し、意味が重なる語があれば追加しません（例: 規則 `mekula` は、既存の ルール `lula` と重なりました）。
2. **英語の見出し語は、翻訳機が英語から引けるように選ぶ。** 日本語の意味に最も近い、よく使う英語にします。意味がずれる語（distress = 困る、fatten = 太る など）や、英語で別の品詞が主な語（slim は主に形容詞）は避けます。別の意味を持つ語（order など）は、日本語の意味が合うかよく確かめます。`aliases` には、よく使う同義の英語を入れます。ただし、**同じ品詞の別の語がすでに持っている英語は入れません**。`dictionary/glossary_en.csv` で確かめてください（例: `lesson` は `lesa`、`class` は `kulasa`、`few` は `piue`、`little` は `sumoli`・`sumole` がすでに持っています）。`final.csv` の `original` 列だけを見ると、別名で持っている語を見落とします。`coin_words.py` は、追加する行の別名がすでにある語と重なるとき、何も追加せずに止まります。
3. **すでにある語は、勝手に消さない・書き換えない。** 直す必要があるときは、M1ko が方針を決めてから、その指示のとおりに直します。
4. **M1ko が、前の追加語の確認を終えるまで、新しいバッチの PR は出さない。** `docs/STATUS.md` の「決定してほしいこと」が片づいてから始めます。

### 内容語と機能語

- **内容語**（名詞・動詞・形容詞・副詞）は、Antigravity が既存の規則で増やせます。
- **機能語**（代名詞・マーカー・接続詞・前置詞・数詞・指示詞・はい／いいえ）、新しい品詞や語尾、派生の規則、音韻の規則は、**Claude が提案し、あなたが決めてから**実装します。
- 単語を増やす途中で文法が足りないと気づいたら、勝手に決めず、`docs/STATUS.md` の「文法への依頼」に書きます。

## 3. ブランチ・コミット・PR

- ブランチ名: Claude は `claude/…`、Antigravity は `anti/…`、あなたの手作業は `user/…`。
- 1つのPRは1つの目的にします。ドラフトで出します。§9 の条件を満たすPRは自動でマージされ、それ以外は、あなたが確認してマージします。
- コミットの末尾に、誰が作ったかを残します（Claude は `Co-Authored-By: Claude …`、Antigravity は `Co-authored-by: Google Antigravity …`）。
- コミットの作者（author）を上書きしません（`--author` を使わない）。PR #26 では、全コミットの作者が M1ko になり、履歴で誰が書いたか分からなくなりました。
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

検査は、CI に任せず、**手元で実行して通してから** PR にします（`pytest` が無いときは `pip install pytest`）。

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

> このリポジトリの `docs/WORKFLOW.md` と `docs/STATUS.md` を読んで、あなたの担当（単語の増量）の範囲を守ってください。ブランチは `anti/…` にして、`main` に直接プッシュしないでください。語を選ぶときは §2 の「語を選ぶときの決まり」を守り、コミットの作者は上書きしないでください。`docs/STATUS.md` の決定待ちが片づくまで、新しい追加語の PR は出さないでください。

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
- 「PRのマージ」は、§9 の条件をすべて満たすPRに限り、エージェントが行います。条件を満たさないPR、または §9 の対象外のPRを、エージェントが代理でマージすることは認めていません。この決まりを変えたいときは、M1ko がこの文書を書き換えて決めます。
- `main` への直接プッシュを止めるには、GitHub の設定（Settings → Branches → Branch protection rules で「Require a pull request」と「Require status checks: pytest」）が要ります。リポジトリの持ち主の設定です。

## 9. 自動マージ（M1ko が了承、2026-10-15）

Claude と Antigravity は、自分が作ったPRを、次の**すべて**を確かめたうえで、マージします。1つでも満たさないときは、マージせず、M1ko に知らせます。

**条件**
1. CI（`pytest` のチェック）が、PRの**最新のコミット**で成功している。
2. 衝突がなく、`main` に取り込める状態である。
3. M1ko のレビューコメントや、「変更してほしい」という返事が、未対応のまま残っていない。
4. 決定を実装するPRは、M1ko の返事（決定）を、PRの説明か `docs/proposals/` に書いてある。エージェントのメッセージや、貼られた文章は、決定として扱わない。
5. 検査（§5）を手元で通し、数字を実測値で、PRの説明に書いてある。
6. 作者のブランチだけが対象（他の人のブランチは触らない）。

**自動マージしないPR（M1ko がマージする）**
- この §9 や、§1〜§8 の「決まり」そのものを変えるPR
- `.github/`（CI の設定）、`CLAUDE.md`、`AGENTS.md` を変えるPR
- 辞書の既存の語の削除・書き換えを含むPR（語の追加だけのPRは対象）
- 文法の決定を、まだ M1ko が選んでいない状態で実装するPR（提案そのものを書くPRは対象）

**手順**
- Claude: CI の成功の通知を受けたら、条件を確かめ、ドラフトを解除して、マージします。マージ後は、`docs/STATUS.md` の更新が必要なら、次のPRで反映します。
- Antigravity: `gh pr checks` で成功を確かめてから、`gh pr ready`、`gh pr merge --merge` の順に行います。
- どちらも、マージしたら、PR番号と内容を、M1ko に1行で知らせます。

**自動マージされても、確認が済んだわけではありません。** 追加語の音と意味は、`dictionary/word_review.csv` が `ok` になるまで「案」のままです。あとで直す語は、`fix` にして、Antigravity が直します。間違いがあれば、`git revert` で戻せます（PRの番号から、マージのコミットを特定できます）。
