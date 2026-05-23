# TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive de luxe, créée dans le cadre d'un TP scolaire.

## Liens

| | |
|---|---|
| 🚀 **Production** | [timetravelagency-kappa.vercel.app](https://timetravelagency-kappa.vercel.app) |
| 💻 **GitHub** | [Johnn81100/TimeTravelAgency](https://github.com/Johnn81100/TimeTravelAgency) |

## Stack Technique

- **React 19** + **Vite 8** + **TypeScript 6**
- **React Router v7** — navigation SPA (pages de détail)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, sans `tailwind.config.ts`)
- **shadcn/ui** (composants UI, style `base-nova`, `@base-ui/react`)
- **Font** : Geist Variable (UI) + Cormorant Garamond (titres display)
- **Animations** : `tw-animate-css` + Intersection Observer (scroll-triggered)
- **Chatbot IA** : API Mistral (`mistral-small-latest`), widget flottant
- **Déploiement** : Vercel
- **Tests unitaires** : Vitest + jsdom + Testing Library (fonctions clés)
- **Tests E2E** : Playwright (Chromium + Mobile Chrome)
- **CI** : GitHub Actions — unitaires puis E2E sur chaque push/PR vers `main`

## Destinations

| Époque | Description | Route |
|---|---|---|
| Paris 1889 | Belle Époque, Tour Eiffel, Exposition Universelle | `/destination/paris-1889` |
| Crétacé -65M | Dinosaures, nature préhistorique | `/destination/cretace` |
| Florence 1504 | Renaissance, Michel-Ange, art classique | `/destination/florence-1504` |

## Features

- Page d'accueil : hero animé, galerie des 3 destinations, footer
- Navigation SPA avec React Router — pages de détail par destination
- Animations au chargement (hero) et au scroll (cartes, Intersection Observer)
- Widget chatbot IA flottant sur toutes les pages (Mistral `mistral-small-latest`)
- Quiz de recommandation IA (4 questions → recommandation Mistral → destination personnalisée)
- Menu hamburger sur mobile
- Déploiement Vercel avec fallback SPA
- 15 tests unitaires Vitest (fonctions clés : `getDestinationById`, `sendMessage`, `useChatbot`)
- 39 tests E2E Playwright (parcours principal, quiz, cas limites, responsive)

## Architecture — Feature-First

```
src/
├── features/
│   ├── home/                  # Hero, HomePage
│   ├── destinations/          # Cartes, page de détail, data
│   ├── chatbot/               # Widget IA, hook, messages
│   └── quiz/                  # Quiz de recommandation IA
├── components/
│   ├── ui/                    # Composants shadcn/ui (Button)
│   └── layout/                # Header, Footer
├── hooks/                     # useInView (Intersection Observer)
├── lib/                       # cn(), client API Mistral
├── assets/                    # Images destinations (paris-1889, cretace, florence-1504)
├── test/                      # Setup Vitest + mock assets
├── App.tsx                    # Router + routes + ChatWidget + QuizModal globaux
├── main.tsx
├── index.css                  # Thème oklch, Tailwind v4
└── vercel.json                # Rewrite SPA fallback
tests/
└── e2e/
    ├── golden-path.spec.ts    # 7 tests — parcours principal
    ├── quiz.spec.ts           # 5 tests — quiz complet (Mistral mocké)
    └── edge-cases.spec.ts     # 9 tests — cas limites, abandon, responsive
.github/
└── workflows/
    └── e2e.yml                # CI — unitaires (Vitest) puis E2E (Playwright)
```

Chaque feature est un dossier autonome — pas de dépendances croisées entre features.

## IA Utilisées

- **Code** : Claude Code (claude.ai/code)
- **Design review** : Claude Code — agent Alexis (UI/UX)
- **Chatbot** : Mistral AI API (`mistral-small-latest`)

## Prompts

### System prompt — Chatbot Mistral

```
Tu es le conseiller de voyage de TimeTravel Agency, une agence de luxe spécialisée
dans les voyages temporels. Tu aides les clients à choisir entre 3 destinations :
Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle),
le Crétacé -65 000 000 (dinosaures, nature préhistorique),
et Florence 1504 (Renaissance, Michel-Ange, les Médicis).
Tu parles de manière élégante, enthousiaste et rassurante.
Tu réponds toujours en français. Sois concis (2-3 phrases maximum par réponse).
```

### Processus de développement

Ce projet a été entièrement développé avec des outils IA :

- **Architecture** : brief fourni à Claude Code, qui a proposé et appliqué la structure feature-first
- **Composants** : chaque feature générée via Claude Code avec itérations successives (corrections de bugs, alignement des boutons, animations)
- **Design review** : agent Alexis invoqué pour audit UX — corrections appliquées sur le header, footer, cartes et chatbot
- **Chatbot** : intégration API Mistral avec hook custom `useChatbot`, gestion du loading/erreur et auto-scroll
- **Tests unitaires** : 15 tests Vitest sur les fonctions clés (`getDestinationById`, `sendMessage`, `useChatbot`) — fetch mocké via `vi.stubGlobal`, hook testé avec `renderHook`
- **Tests E2E** : 39 tests Playwright — golden path, quiz (Mistral mocké via `page.route()`), cas limites (erreurs 500, abandon, responsive)
- **CI** : GitHub Actions — unitaires d'abord (fail fast), puis E2E ; protection de branche `main` bloque le merge si non verts

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine :

```
VITE_MISTRAL_API_KEY=ta_clé_mistral
```

Obtenir une clé sur [console.mistral.ai](https://console.mistral.ai).

```bash
npm run dev
```

## Tests

### Tests unitaires (Vitest)

```bash
npm test          # mode watch
npm test -- --run # one-shot
```

15 tests couvrant les fonctions clés :

| Fichier | Tests | Couverture |
|---|---|---|
| `destinationsData.test.ts` | 5 | `getDestinationById` — id valide, inconnu, champs requis |
| `mistral.test.ts` | 5 | `sendMessage` — réponse OK, endpoint, system prompt, erreurs 401/429 |
| `useChatbot.test.ts` | 5 | Hook — état initial, messages, loading, erreur, reset |

### Tests E2E (Playwright)

```bash
npx playwright test                               # tous les tests
npx playwright test --project=chromium            # Chromium uniquement
npx playwright test tests/e2e/edge-cases.spec.ts  # un fichier spécifique
```

39 tests répartis en 3 fichiers :

| Fichier | Tests | Couverture |
|---|---|---|
| `golden-path.spec.ts` | 7 | Navigation, hero, chatbot, routing |
| `quiz.spec.ts` | 5 | Quiz complet, reset, fermeture |
| `edge-cases.spec.ts` | 9 | Erreurs API, abandon, responsive |

Les appels Mistral sont mockés via `page.route()` — aucune dépendance réseau externe.

Le rapport HTML est généré dans `playwright-report/`.

## Build

```bash
npm run build
npm run preview
```

## Membres du groupe

- **GAU Jonathan**

## Licence

Projet pédagogique — M1/M2 Digital & IA
