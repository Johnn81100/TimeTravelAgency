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
- **Tests E2E** : Playwright (Chromium)

## Destinations

| Époque | Description | Route |
|---|---|---|
| Paris 1889 | Belle Époque, Tour Eiffel, Exposition Universelle | `/destination/paris-1889` |
| Crétacé -65M | Dinosaures, nature préhistorique | `/destination/cretace` |
| Florence 1504 | Renaissance, Michel-Ange, art classique | `/destination/florence-1504` |

## Features implémentées

- [x] Initialisation du projet (Vite + React + TS)
- [x] Tailwind CSS v4 configuré
- [x] shadcn/ui initialisé
- [x] Thème dark navy + accents or (oklch)
- [x] Architecture feature-first (`src/features/`)
- [x] Page d'accueil (Header + Hero + Footer)
- [x] Galerie des 3 destinations (cartes avec gradient par époque)
- [x] Pages de détail par destination (React Router)
- [x] Animations au chargement (Hero) et au scroll (cartes)
- [x] Agent conversationnel IA (Mistral `mistral-small-latest`, widget flottant sur toutes les pages)
- [x] Déploiement Vercel
- [x] Corrections audit : SPA fallback, routing catch-all, animations
- [x] Ouverture chatbot depuis nav, hero et pages destination (custom event `open-chatbot`)
- [x] Scroll-margin-top sur la section destinations (header sticky)
- [x] Menu hamburger mobile (Destinations, Assistant IA, Réserver)
- [x] Ancrage hero → cartes directement (`#destination-cards`)
- [x] Footer : Assistant IA ouvre le chatbot, Destinations scrolle vers les cartes
- [x] cursor-pointer sur tous les boutons custom
- [x] Tests E2E Playwright — golden path 7 tests (parcours accueil → destination → chatbot)

## Architecture — Feature-First

```
src/
├── features/
│   ├── home/                  # Hero, HomePage
│   ├── destinations/          # Cartes, page de détail, data
│   └── chatbot/               # Widget IA, hook, messages
├── components/
│   ├── ui/                    # Composants shadcn/ui (Button)
│   └── layout/                # Header, Footer
├── hooks/                     # useInView (Intersection Observer)
├── lib/                       # cn(), client API Mistral
├── App.tsx                    # Router + routes + ChatWidget global
├── main.tsx
├── index.css                  # Thème oklch, Tailwind v4
└── vercel.json                # Rewrite SPA fallback
tests/
└── e2e/
    └── golden-path.spec.ts    # Tests Playwright (parcours principal)
```

Chaque feature est un dossier autonome — pas de dépendances croisées entre features.

## IA Utilisées

- **Code** : Claude Code (claude.ai/code)
- **Design review** : Claude Code — agent Alexis (UI/UX)
- **Chatbot** : Mistral AI API (`mistral-small-latest`)

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

## Tests E2E

```bash
npx playwright test --project=chromium --workers=1
```

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
