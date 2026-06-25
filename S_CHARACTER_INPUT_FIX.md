# DN Engine / Embedded Input Character Fix

## Issue
The embedded iframe input was accidentally removing lowercase `s` characters before sending text back to React. For example, `What skills does Danish have?` could become `What kill doe Dani h have?`.

## Cause
The iframe HTML is generated inside a JavaScript template literal. Regexes like `/\s+/g` were written as `/\s+/g` inside the source, but JavaScript template strings interpreted `\s` as `s` when building the `srcDoc` HTML. That turned the whitespace cleanup regex into `/s+/g`, which removed `s` letters.

## Fix
The iframe HTML templates now use `String.raw`, preserving regex backslashes correctly so the iframe receives `/\s+/g` as intended.

Updated files:

- `src/components/DNPromptInput.tsx`
- `src/components/StableSearchBox.tsx`
- `src/components/EmbeddedContactForm.tsx`

I also added a small fallback repair for common older broken inputs like `kill` → `skill`, `doe` → `does`, and `Dani h` → `Danish`.
