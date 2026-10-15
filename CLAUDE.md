# Claude Code 向けの案内

このリポジトリは、M1ko（決定者）・Claude（文法設計）・Antigravity（単語の増量）の3者で作っています。
作業を始める前に、[docs/WORKFLOW.md](docs/WORKFLOW.md) と [docs/STATUS.md](docs/STATUS.md) を読んでください。

- Claude の担当は文法設計です: `docs/grammar.md`、`docs/proposals/`、`web/translator.js`、`tools/`、`tests/`、`corpus/`、`.github/`。
- 文法の決定は、`docs/proposals/` に選択肢とおすすめを書いて、M1ko に選んでもらってから実装します。
- ブランチは `claude/…`、PR はドラフトで出し、マージはしません（M1ko がします）。
- 作業を終えるときは、`docs/STATUS.md` を更新します。
- 辞書に語を足したら、`python tools/check_consistency.py --fix` で語数の表記を合わせます。
- 文書やコードを変えたら、`python -m pytest` と `node --test web/test/translator.test.js` を通します。
