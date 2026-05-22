# TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive de luxe, créée dans le cadre d'un TP scolaire.

## Stack Technique

- **React 19** + **Vite 8** + **TypeScript 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, sans `tailwind.config.ts`)
- **shadcn/ui** (composants UI, style `base-nova`)
- **Font** : Geist Variable (`@fontsource-variable/geist`)
- **Animations** : à venir (Framer Motion)
- **Chatbot IA** : à venir (API Mistral `mistral-small`)
- **Déploiement** : à venir (Vercel)

## Destinations

| Époque | Description |
|---|---|
| Paris 1889 | Belle Époque, Tour Eiffel, Exposition Universelle |
| Crétacé -65M | Dinosaures, nature préhistorique |
| Florence 1504 | Renaissance, Michel-Ange, art classique |

## Features implémentées

- [x] Initialisation du projet (Vite + React + TS)
- [x] Tailwind CSS v4 configuré
- [x] shadcn/ui initialisé
- [x] Thème dark navy + accents or (oklch)
- [x] Alias `@/` → `src/`
- [x] Page d'accueil (Header + Hero + Footer)
- [x] Galerie des 3 destinations (cartes avec gradient par époque)
- [ ] Agent conversationnel IA (Mistral)
- [ ] Déploiement Vercel

## Architecture — Feature-First

```
src/
├── features/
│   ├── home/            # Hero, intro, CTA
│   ├── destinations/    # Galerie des 3 destinations
│   └── chatbot/         # Agent conversationnel IA
├── components/
│   ├── ui/              # Composants shadcn/ui
│   └── layout/          # Header, Footer, etc.
├── lib/                 # Utilitaires partagés (cn, api, etc.)
├── hooks/               # Hooks React partagés
├── assets/              # Images, icônes
├── App.tsx
├── main.tsx
└── index.css
```

Chaque feature est un dossier autonome contenant ses propres composants, hooks, et types — sans dépendances croisées entre features.

## IA Utilisées

- **Code** : Claude Code (claude.ai/code)
- **Chatbot** : Mistral AI API (`mistral-small`) — à venir
- **Visuels** : assets du projet TimeTravel précédent

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Licence

Projet pédagogique — M1/M2 Digital & IA
