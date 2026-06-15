# Performance/stability notes

## Posts page

`src/routes/posts.tsx` limits rendering to `POSTS_PER_PAGE = 9` cards per page. Visitors can move through additional pages using `/posts?page=2`, `/posts?page=3`, etc. This keeps the page from rendering every generated stack note/post card at once.

What changed:

- Only the current page of posts is mapped into DOM cards.
- Post cards, filters, links, and pagination have explicit pointer cursor styling.
- LinkedIn references are capped with `LINKEDIN_REFERENCES_LIMIT = 6`.
- Search uses `src/components/StableSearchBox.tsx`, which renders the visible typing field inside a lightweight sandboxed iframe. React receives only the submitted search term, not every keystroke.

To change the page size, edit:

```ts
const POSTS_PER_PAGE = 9;
```

## Stack Map

`src/routes/stack-map.tsx` now follows the same optimization pattern as Posts.

- Stack Map renders `STACK_ITEMS_PER_PAGE = 12` cards per page.
- Stack cards include image slots for optional diagrams, screenshots, lab photos, dashboards, or project artifacts.
- Search uses the same iframe-isolated `StableSearchBox` so typing stays smooth while filtering only runs after Enter/Search.
- Stack Map category chips and pagination controls use explicit pointer cursor styling.

To change the page size, edit:

```ts
const STACK_ITEMS_PER_PAGE = 12;
```

## DN Response Engine

`src/components/FloatingAvatar.tsx` keeps the LLM-backed DN Engine, but `src/components/DNPromptInput.tsx` now provides an embedded chat input instead of a native browser popup.

What changed:

- No browser `prompt()` popup.
- The visible input stays inside the DN panel.
- The input is sandboxed in a lightweight iframe, so typing does not trigger React renders.
- React receives only the final submitted text.
- `MAX_INPUT_CHARS = 240`.
- `MAX_VISIBLE_MESSAGES = 6`.
- Expensive ambient animations are still paused while the DN panel is open with the `dn-engine-open` class.

## Contact page

`src/routes/contact.tsx` uses `src/components/EmbeddedContactForm.tsx`, which keeps the contact form visually embedded in the page while isolating the text fields from the animated React layout.

## Why this should fix the freeze without weird popups

The last version avoided freezing by moving typing into native browser dialogs, but that felt awkward. This version keeps typing on the page while isolating keystrokes inside small sandboxed iframe widgets. The main React app does not process every letter, so the site should avoid the previous freeze while still feeling like a normal portfolio UI.

## DN Engine LLM update

The DN Response Engine calls `/api/dn-engine`, which uses a server-side LLM when configured and falls back to a local project-aware brain when the API is unavailable.

The full profile/portfolio knowledge file is `src/data/dn_profile_knowledge.json`. The browser receives only normal page code and does not expose private LLM keys.
