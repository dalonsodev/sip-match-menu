# SipMatch 🍹

**An interactive cocktail menu with a preference-based recommendation engine — guides customers to their ideal drink in 3 questions or fewer.**

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-8-CA4245?logo=reactrouter&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-25-26A69A?logo=i18next&logoColor=white)

**🔗 [Live Demo](https://sipmatch.netlify.app/)**

---

Most bar menus are passive catalogues. A customer scans a QR code, faces 30+ options with no guidance, enters **decision paralysis**, and either orders "the usual" or nothing at all — both outcomes cap the ticket and waste the table's engagement window.

**SipMatch** is built to convert that moment. A **preference-based recommendation engine** (the Quiz) guides the user to their ideal drink in 3 questions or fewer — reducing decision friction, increasing order confidence, and nudging customers toward cocktails they might not have discovered otherwise. The result is a higher average ticket and lower churn per interaction.

Built with **React 19 + TypeScript**, deployed on Netlify, and designed mobile-first for the real bar environment — thumb navigation, ambient lighting, zero learning curve.

---

## The Problem with Static QR Menus

| Static QR Menu                              | SipMatch                                                  |
| ------------------------------------------- | --------------------------------------------------------- |
| Passive catalogue — customer self-navigates | Active recommendation — app narrows the field             |
| Decision paralysis with 20–40 options       | 3 questions -> 1–5 curated results                        |
| No preference signal captured               | Preference-aware: occasion, flavor, spirit                |
| Same experience for every customer          | Personalized path: alcohol vs. non-alcohol branching      |
| Churn to a safe default order               | Guided discovery -> higher-confidence, higher-value order |

---

## Features

### Recommendation Engine (The Quiz)

https://github.com/user-attachments/assets/6ead01d1-7ced-4c98-b547-01fc2cb53ee3

The quiz is the core conversion mechanism. It collects up to 3 preference signals and maps them to a filtered cocktail shortlist — functioning as a lightweight, rule-based recommender that mirrors the logic of a knowledgeable bartender.

**Alcohol path (up to 3 signals):**

1. **Occasion** — Aperitif / Evening & Night / With a meal / Dessert
2. **Flavor style** — Bold & Classic / Refreshing & Light / Sweet & Fruity
3. **Spirit preference** — multi-select from spirits available in the filtered subset

**Non-alcohol path (2 signals):**

1. **Flavor profile** — Citrus / Fruity / Herbal
2. **Texture** — Smooth / Bubbly

**Conversion-oriented UX decisions:**

- **Auto-advance** on single-choice questions (150 ms delay for perceived responsiveness)
- **Q3 skip logic** — if Q1 + Q2 already narrow results below the spirit count threshold, Q3 is skipped entirely and the user lands on results faster, reducing drop-off
- **Dynamic Q3 options** — spirit buttons are derived from cocktails that match Q1 + Q2, so the user is never shown an option that leads to zero results
- **Confirmation-aware Back** — navigating back resets only the target step, preserving the answers already given
- **Curated shortlist, not a single answer** — results show a filtered carousel (typically 1–5 cocktails), giving the customer ownership of the final choice

### Interactive Menu

https://github.com/user-attachments/assets/684cc1cd-f171-470d-9d7f-c99bb10bd8d2

- **Horizontal-scroll carousel** — zero vertical scroll; 80vw cards + 10vw padding + 5vw gaps with CSS Scroll Snap (`x mandatory`, center-aligned)
- **Peek cards** — 10% of the next cocktail is always visible as a natural swipe invitation
- **Tap to reveal details** — ingredients and allergens on demand (legally required for bars in Spain)
- **Single open card enforced** — `useActiveCard` ensures only one card shows details at a time
- **Click-outside to dismiss** — `useClickOutside` listens at the document level

**Filter Controls:**

- Toggle alcoholic / non-alcoholic
- Filter by **flavor category** and **main spirit**
- Live **cocktail count**, highlighted in gold (`--accent`)
- **Clear Filters** appears only when filters are active

### Multilingual Support

Spanish and English via `react-i18next` + `i18next-icu` (ICU message format for pluralization). Language is auto-detected from the browser via `i18next-browser-languagedetector` and persisted in localStorage. Fallback: Spanish.

This matters in the bar context: tourist-heavy locations in Spain need both languages without a manual switch.

### Accessibility (WCAG 2.1 AA)

- **Keyboard navigation** — every control focusable and operable
- **ARIA attributes** — `aria-label`, `aria-pressed`, `role="group"`
- **Skip to main content** link
- **Contrast ratio** > 4.5:1 across all text
- **Visible focus** — custom outline on every interactive element

---

## Tech Stack

| Technology                       | Purpose                                                                 |
| -------------------------------- | ----------------------------------------------------------------------- |
| React 19                         | Component-based UI with modern hooks                                    |
| TypeScript                       | Static typing across components, hooks, and data                        |
| react-router 8                   | Unified package — router primitives + DOM bindings in a single import   |
| react-i18next + i18next-icu      | Internationalization with ICU pluralization                             |
| i18next-browser-languagedetector | Auto-detects browser language, persists in localStorage                 |
| react-icons                      | Icon library                                                            |
| CSS (6 files)                    | Centralized styles with custom properties                               |
| Vite 7                           | Build tool; strips `console.*` and `debugger` in production via esbuild |

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/dalonsodev/DrinkWise.git
cd DrinkWise

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Other useful commands:

```bash
npm run build      # Production build
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint
npm run format     # Prettier
```

---

## Project Structure

```
src/
├── components/
│   ├── common/          # ProgressIndicator, Question, Option, ToggleAlcohol, CocktailCarousel, NotFound
│   ├── layout/          # Navbar, Footer, Layout
│   └── features/
│       ├── drinkcard/       # DrinkCard, DrinkCardHeader, DrinkCardDetails
│       ├── filter-controls/ # FilterControls, FlavorFilter, SpiritFilter, FiltersFooter
│       ├── menu/            # MenuHeader, MenuContent
│       └── quiz/            # Quiz, QuizConfirmation, QuizContent, QuizProgress, QuizResults, QuizStep
├── pages/               # HomePage, MenuPage
├── hooks/
│   ├── useActiveCard.ts       # Single-card open/close state
│   ├── useClickOutside.ts     # Document-level click-outside listener
│   ├── useDrinkFiltering.ts   # Menu filter state (alcohol, category, spirit)
│   ├── useAnswerMapping.ts    # Normalizes translated answers to internal English keys
│   ├── useQ3Options.ts        # Derives available spirit options from Q1+Q2 results
│   ├── useQuizAutoAdvance.ts  # Auto-advance + Q3 skip logic (useRef guards against loops)
│   ├── useQuizFiltering.ts    # Filters cocktails after Q2 and for final results
│   ├── useQuizState.ts        # Quiz state: answers, currentStep, navigation
│   └── useQuizLogic.ts        # Orchestrator: composes all quiz hooks (~60 lines)
├── data/
│   ├── cocktails.json         # Cocktail dataset (typed via discriminated union)
│   └── questions/             # noAlcohol.ts, withAlcohol.ts
├── locales/             # en.json, es.json
├── styles/
│   ├── globals.css      # CSS custom properties + reset
│   ├── layout.css       # Header, footer, page containers
│   ├── components.css   # Buttons, filters, toggle, cards, carousel, quiz nav
│   ├── pages.css        # Home, Quiz, Menu page styles
│   ├── utils.css        # Focus styles, skip link, screen-reader utilities
│   └── index.css        # @imports + media queries
├── types/index.ts       # BaseCocktail, AlcoholicCocktail, NonAlcoholicCocktail, Quiz types
├── i18n.ts              # i18next configuration
├── App.tsx              # Route definitions
└── index.tsx            # Entry point
```

---

## Architecture Notes

**Unified react-router package** — Migrated from the split `react-router` + `react-router-dom` setup to the single unified `react-router` package (v8), which now exports both the routing primitives and DOM bindings (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`) from one import. This removes a dependency, eliminates the version-mismatch footgun between the two packages, and reflects the library's current recommended setup.

**Discriminated union type** — `Cocktail` is `AlcoholicCocktail | NonAlcoholicCocktail`. TypeScript narrows the type automatically in every filter function via `cocktail.hasAlcohol`, making the filtering logic type-safe and self-documenting without runtime `instanceof` checks.

**Answer normalization** — `useAnswerMapping` converts translated option strings back to internal English keys before filtering. This decouples the UI language from the recommendation logic entirely — the engine always operates on stable keys regardless of the active locale.

**Hook decomposition** — `useQuizLogic` was originally ~200 lines of interleaved state, filtering, and auto-advance concerns. It was refactored into 6 single-responsibility hooks. The orchestrator now sits at ~60 lines, each hook independently testable.

**Production hygiene** — Vite's esbuild config strips all `console.*` calls and `debugger` statements from production builds.

---

## Contact

Built by **David Alonso**

[GitHub](https://github.com/dalonsodev) · [LinkedIn](https://www.linkedin.com/in/dalonsodev) · [hello@dalon.so](mailto:hello@dalon.so)

Available for remote contract work

Based in Spain 🇪🇸 · working with international teams · CET
