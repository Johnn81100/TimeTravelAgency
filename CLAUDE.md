# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TimeTravel Agency — webapp interactive pour une agence de voyage temporel fictive de luxe (TP scolaire M1/M2 Digital & IA).

## Commands

```bash
npm run dev        # dev server (Vite)
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run preview    # preview du build
```

No test runner configured.

## Stack

- React 19 + TypeScript 6 + Vite 8
- Tailwind CSS v4 via `@tailwindcss/vite` — **pas de `tailwind.config.ts`**, la config est entièrement dans `src/index.css`
- shadcn/ui style `base-nova` — ajouter des composants avec `npx shadcn add <component>`
- Font : Geist Variable (importée via `@fontsource-variable/geist`)
- À venir : Framer Motion (animations), Mistral AI API `mistral-small` (chatbot), Vercel (déploiement)

## Theming

Le thème est dark navy + accents or, défini en OKLCH dans `src/index.css`.

Le pattern Tailwind v4 utilisé ici : les variables CSS sont déclarées dans `:root {}`, puis mappées aux utilitaires Tailwind dans `@theme inline {}`. Ne pas utiliser `@theme` sans `inline` — cela casserait le thème.

La classe `.dark` dans `src/index.css` existe mais n'est pas activée — le design est fixé en mode dark navy par défaut (pas de toggle light/dark).

## Architecture — Feature-First

```
src/
├── features/
│   ├── home/            # HeroSection
│   ├── destinations/    # DestinationsSection + DestinationCard
│   └── chatbot/         # (à créer) Agent conversationnel IA
├── components/
│   ├── ui/              # Composants shadcn/ui
│   └── layout/          # Header, Footer
├── lib/utils.ts         # Utilitaire cn() (clsx + tailwind-merge)
├── hooks/               # (à créer) Hooks partagés
├── assets/              # hero.png + icônes
├── App.tsx              # Composition : Header > HeroSection > DestinationsSection > Footer
└── index.css            # Toute la config Tailwind v4 + thème
```

Règle : pas de dépendances croisées entre features. Une feature n'importe pas depuis une autre feature.

## Alias

`@/` → `src/` (configuré dans `vite.config.ts` et `tsconfig.app.json`).

## shadcn/ui

- `components.json` à la racine configure shadcn
- Les composants générés vont dans `src/components/ui/`
- Icônes : Lucide React
- Pour utiliser les variants de bouton sans le composant : `import { buttonVariants } from '@/components/ui/button'` + `cn(buttonVariants({ variant, size }))`

## Destinations

Trois destinations définies en tant que données statiques dans `DestinationsSection.tsx` :
- Paris 1889 — Belle Époque
- Crétacé -65M — Dinosaures
- Florence 1504 — Renaissance

Le type `Destination` est défini et exporté depuis `DestinationCard.tsx`.

## Chatbot IA (à venir)

La feature `chatbot` doit utiliser l'API Mistral (`mistral-small`). La section est référencée dans la Hero via `href="#chatbot"`.
