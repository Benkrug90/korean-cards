# Korean Cards

A lightweight Korean vocabulary flashcard and quiz Progressive Web App (PWA), intended for Android home-screen installation.

## Vocabulary data

The canonical vocabulary dataset is [`public/vocabulary.json`](public/vocabulary.json). It starts with 10 Korean terms. Each object contains:

- `id`: permanent, unique string (do not change after creation).
- `korean`: Korean dictionary form or expression.
- `english`: English meaning.
- `example_ko`: natural Korean example sentence.
- `example_en`: English example translation.
- `tags`: array of category labels.

Example:

```json
{
  "id": "kr-0001",
  "korean": "떨리다",
  "english": "to tremble; to feel nervous",
  "example_ko": "발표 전에 너무 떨려요.",
  "example_en": "I'm really nervous before the presentation.",
  "tags": ["verb", "feelings"]
}
```

## Adding words

Add entries to the JSON array, using a new unique ID for every card. Preserve existing IDs so that on-device progress remains linked to the right cards. Review example translations and ensure valid JSON before committing.

## Planned app (to build with Codex)

- React + TypeScript + Vite, hosted on GitHub Pages.
- Android-installable PWA built with `vite-plugin-pwa`.
- Tap-to-flip flashcards with examples and swipe/previous/next controls.
- Four-option multiple-choice quiz, feedback, and score.
- Fetch `import.meta.env.BASE_URL + "vocabulary.json"` on launch and manual sync, with `cache: "no-store"`.
- Keep offline cached vocabulary and learning progress in IndexedDB, keyed by stable card ID.
- Handle malformed downloads and offline failures without losing saved cards.
- GitHub Actions deployment to GitHub Pages; Vite `base` should be `/korean-cards/`.
- No backend, sign-in, or API tokens for reading the public deck.

## Deployment after Codex builds the app

In the GitHub repository: **Settings → Pages → Build and deployment → GitHub Actions**. Follow the generated README's build and install steps. The expected website is `https://benkrug90.github.io/korean-cards/` once deployed.
