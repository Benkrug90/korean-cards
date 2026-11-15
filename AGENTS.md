# Korean Cards — Agent Instructions

This repository hosts a Korean vocabulary PWA. When asked to add or manage vocabulary, follow [the Korean Vocabulary Manager skill](.agents/skills/korean-vocabulary-manager/SKILL.md).

## Non-negotiable data rules

- The canonical deck is `public/vocabulary.json`, a JSON array. Consult `src/types.ts` and `src/vocabulary.ts` for current validation.
- Preserve all existing cards and their stable `id` values. Check for duplicates by both `id` and Korean headword.
- Each card needs `id`, `korean`, `english`, `example_ko`, `example_en` (nonempty), and `tags` (array).
- Part of speech is encoded in `tags`: `noun`, `verb`, `adjective`, `adverb`, or `preposition`.
- The existing Fitness terms set uses tag `fitness-terms`. As currently implemented, named sets are hardcoded in `src/App.tsx`; tagging alone does not expose a new set in the UI.
- **Do not commit vocabulary changes without explicit user approval.** Present an approval/rejection review first, accepting user feedback.
- Write approved entries only, verify the resulting file, and preserve rejected and unrelated cards/sets.
- Use the personal GitHub repository `Benkrug90/korean-cards`, not any work account.
- Do not store private content or credentials in this public repository.

For normal app development, preserve vocabulary and IndexedDB study-progress compatibility unless the user explicitly requests a migration.
