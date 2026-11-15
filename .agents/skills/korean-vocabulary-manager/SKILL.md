---
name: korean-vocabulary-manager
description: Manage naturally encountered Korean vocabulary for the user's Korean Cards app in Benkrug90/korean-cards. Use when the user asks to explain, capture, review, approve, reject, edit, categorize, or save Korean vocabulary to GitHub. Preserve approvals and existing cards. Never write without approval.
---

# Korean Vocabulary Manager

This skill manages **user-encountered** Korean vocabulary in the personal repository `Benkrug90/korean-cards`. The user is an intermediate Korean speaker; prioritize real-world meanings, natural phrasing, and context rather than generating random study lists.

## Repository and schema

- Always target the **personal** GitHub account `Benkrug90`. Do not use the separate work account.
- Repository: `https://github.com/Benkrug90/korean-cards`.
- Source of truth: `public/vocabulary.json` on the repository default branch. Inspect the **live** file and `src/types.ts`, `src/vocabulary.ts`, and `src/App.tsx` before edits; the app can evolve.
- As of skill creation the format is a JSON **array**, with card fields:
  `id` (stable unique string), `korean`, `english`, `example_ko`, `example_en`, `tags` (string array).
- The on-screen flashcard back shows the definition (`english`), Korean example (`example_ko`), and part of speech from the POS tag. **Still populate `example_en`**, which the present validator requires to be a nonempty string, even if the app hides it.
- Supported POS tag values in the app: `verb`, `noun`, `adjective`, `adverb`, `preposition`. For phrases, use the closest POS and explain that the entry is a phrase in a preview if relevant.
- Existing named set: `Fitness terms`, selected by the `fitness-terms` tag. The current `src/App.tsx` hardcodes the named set; a new tag **alone does not make a new set appear**. When creating a new set, inspect and update the live selector carefully (or whatever configuration replaces it) and ensure deployment, but only after approval.
- The existing `All cards` and `Test set` choices are hardcoded. Preserve them unless the user specifically requests otherwise.
- Do not overwrite or replace the whole vocabulary collection with a proposed deck.

## Default capture and review flow

1. When the user sends a Korean word or phrase, explain it in context. Do not assume every translation question means “save this”; only start capture when the user requests adding/saving, asks to collect terms, or explicitly invokes this workflow.
2. Determine correct spelling and standard headword; if uncertain (e.g. speech-to-text typo), show likely candidate(s), mark uncertainty, and ask for clarification **before** any write.
3. For each proposed card, prepare:
   - natural intermediate-level English meaning (distinguish context-dependent meanings),
   - correct part of speech,
   - useful, natural Korean example sentence,
   - accurate English example translation for the schema,
   - suitable existing set / tag recommendation.
4. Before proposing additions, read the current GitHub file to catch duplicate IDs and identical Korean headwords. If the headword exists, show its current definition and ask whether to reuse, amend, or skip. Different senses may justify distinct cards only on user approval.
5. Show the user a **review/approval sheet** with an Approve / Reject choice for **each** word, with a feedback field for corrections or set placement. Default to no changes made until approval. For a single card, a concise explicit approval request is sufficient. A rejection means no insertion. Apply feedback before committing; if meaning or requested change is uncertain, send revised proposal for approval.
6. Only after explicit approval, write **approved cards only**, append safely to existing JSON, use unique permanent IDs, keep all existing IDs and entries unchanged unless the user expressly requests edits, preserve unrelated sets.
7. After a successful write, fetch the actual file again and verify the approved entries, preserved existing entries, no duplicate IDs/headwords, and exclusion of rejects. Check any app set selector edits too. Report a GitHub file link, inserted/skipped counts, and whether deployment was actually verified (never assume it was).
8. If GitHub permissions are missing, explain the blocker and provide a copyable patch or next step. Do not claim it was saved.

## Writing safeguards

- Read before write and use the latest file SHA for GitHub contents API updates; if the SHA conflicts, re-read, re-merge, and retry once.
- Never run parallel updates to the same path.
- Keep grammar, punctuation, and example sentences natural. Avoid beginner filler; choose Korean actually used in speech or workout instructions when relevant.
- Don't add unrelated vocabulary lists unless the user specifically requests suggestions.
- Preserve the user's explicitly approved/rejected selections from the current conversation; do not infer unapproved cards from prior suggestions.
- Never commit credentials, personal email addresses, API keys, or tokens to public repository files.
- Never silently alter study progress, cached cards, quiz history, code, deployment workflows, or existing tags/sets.
- The vocabulary is public, so warn before saving any private names, personal messages, or other sensitive content.
- Editing `public/vocabulary.json` is a repository commit. GitHub Pages may need a build/deploy before the installed PWA can fetch changes; inform user to sync after the new deployment.

## Examples

User: “Add 헷갈리다. I heard it at work.”
Assistant: Show meaning, POS, Korean example, proposed set, and Approve/Reject. Wait for approval before writing.

User: “Review today’s six words.”
Assistant: Build one approval sheet, include notes field, handle duplicates, save only selected cards when approved.

User: “Add 날개뼈 to Fitness terms.”
Assistant: Check live JSON for duplicates, propose noun + natural exercise example, ask approval; after approval append with `fitness-terms` tag and verify.

User: “What does 어쩔 수 없다 mean?”
Assistant: Explain. Do not save it unless asked.
