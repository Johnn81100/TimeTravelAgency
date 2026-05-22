# Cahier des Charges — TimeTravel Agency

> Webapp interactive pour une agence de voyage temporel fictive de luxe.
> Projet pédagogique M1/M2 Digital & IA — développeur solo.

---

## 1. Analyse du projet existant

### État initial (point de départ)

| Élément | État |
|---|---|
| Vite + React 19 + TypeScript | ✅ Initialisé |
| Tailwind CSS v4 (`@tailwindcss/vite`) | ✅ Configuré |
| shadcn/ui (`base-nova`) | ✅ Initialisé |
| Thème dark navy + or (oklch) | ✅ Variables CSS en place |
| Police Geist Variable | ✅ Importée |
| Alias `@/` → `src/` | ✅ Configuré |
| Composant `Button` shadcn | ✅ Installé |
| Architecture feature-first | ✅ Définie dans README |
| Code applicatif réel | ❌ Template Vite par défaut |
| Git | ✅ Initialisé (commit initial) |

### Stack technique retenue

- **Framework** : React 19 + Vite 8 + TypeScript 6
- **Style** : Tailwind CSS v4, shadcn/ui `base-nova`, `tw-animate-css`
- **Composants UI primitifs** : `@base-ui/react` (pas Radix)
- **Police** : Geist Variable
- **Animations** : `tw-animate-css` (déjà installé), Framer Motion (à ajouter si besoin)
- **IA Chatbot** : API Mistral (`mistral-small`)
- **Déploiement** : Vercel

### Palette de couleurs (oklch)

| Token | Valeur | Usage |
|---|---|---|
| `--background` | `oklch(0.16 0.02 255)` | Fond principal — navy profond |
| `--foreground` | `oklch(0.95 0.005 255)` | Texte principal — blanc cassé |
| `--primary` | `oklch(0.75 0.15 75)` | Or — CTA, accents |
| `--card` | `oklch(0.19 0.02 255)` | Fond des cartes |
| `--muted-foreground` | `oklch(0.65 0.01 255)` | Texte secondaire |
| `--border` | `oklch(0.28 0.02 255)` | Bordures subtiles |

### Destinations

| Époque | Lieu | Thème visuel |
|---|---|---|
| 1889 | Paris — Belle Époque | Dégradé doré/ambré |
| -65 000 000 | Crétacé — Dinosaures | Dégradé vert profond |
| 1504 | Florence — Renaissance | Dégradé rouge/terracotta |

---

## 2. Architecture feature-first

```
src/
├── features/
│   ├── home/                  # Phase 2 — Hero section
│   │   └── HeroSection.tsx
│   ├── destinations/          # Phase 3 — Galerie destinations
│   │   ├── DestinationCard.tsx
│   │   └── DestinationsSection.tsx
│   └── chatbot/               # Phase 4 — Agent IA
│       ├── ChatWidget.tsx
│       ├── ChatMessage.tsx
│       └── useChatbot.ts
├── components/
│   ├── ui/                    # Composants shadcn (Button, etc.)
│   └── layout/                # Phase 2 — Header, Footer
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── utils.ts               # cn() — déjà en place
│   └── mistral.ts             # Phase 4 — client API Mistral
├── hooks/                     # Hooks React partagés
├── assets/                    # Images, icônes
├── App.tsx
├── main.tsx
└── index.css
```

**Règle d'architecture :** chaque `feature/` est autonome. Pas de dépendances croisées entre features. Les composants vraiment partagés montent dans `components/`.

---

## 3. Phases & exercices

---

### Phase 1 — Setup & Infrastructure
**Commit :** `chore: initial setup`
**Statut :** ✅ Terminé

**Livrables :**
- [x] Projet Vite + React 19 + TypeScript initialisé
- [x] Tailwind CSS v4 configuré (via plugin Vite, sans `tailwind.config.ts`)
- [x] shadcn/ui initialisé (style `base-nova`, `@base-ui/react`)
- [x] Thème dark navy + or (variables CSS oklch dans `index.css`)
- [x] Police Geist Variable importée
- [x] Alias `@/` → `src/` dans `tsconfig.app.json` et `vite.config.ts`
- [x] Git initialisé

---

### Phase 2 — Layout & Page d'accueil
**Commit :** `feat(home): add homepage layout — header, hero, footer`
**Statut :** 🔲 À faire

**Objectif :** Remplacer le template Vite par défaut par une vraie page d'accueil.

**Livrables :**
- [ ] `src/components/layout/Header.tsx` — Navbar sticky (logo + liens nav + bouton Réserver)
- [ ] `src/components/layout/Footer.tsx` — Footer minimaliste
- [ ] `src/features/home/HeroSection.tsx` — Titre principal, sous-titre, 2 CTA
- [ ] `src/App.tsx` — Assemblage Header + Hero + Footer
- [ ] `src/App.css` — Nettoyage (styles Vite supprimés)
- [ ] `README.md` — Mise à jour

**Critères d'acceptance :**
- Le fond est navy, les accents sont dorés
- Le Hero occupe ~85vh avec un glow ambiant centré
- Les CTA pointent vers `#destinations` et `#chatbot`
- Le Header est sticky et semi-transparent avec `backdrop-blur`

---

### Phase 3 — Galerie des destinations
**Commit :** `feat(destinations): add destination gallery with 3 era cards`
**Statut :** 🔲 À faire

**Objectif :** Section présentant les 3 destinations avec leurs cartes visuelles.

**Livrables :**
- [ ] `src/features/destinations/DestinationCard.tsx` — Carte individuelle (gradient visuel, badge époque, tags, CTA Explorer)
- [ ] `src/features/destinations/DestinationsSection.tsx` — Grille 3 colonnes + titre de section
- [ ] Intégration dans `App.tsx` entre Hero et Footer
- [ ] `README.md` — Mise à jour

**Critères d'acceptance :**
- 3 cartes en grille (responsive : 1 col mobile, 3 col desktop)
- Chaque carte a un gradient de couleur distinct selon l'époque
- Hover : bordure qui s'allume en doré, bouton "Explorer" qui change de couleur
- Badge époque en haut à droite de chaque carte

---

### Phase 4 — Agent conversationnel IA (Chatbot)
**Commit :** `feat(chatbot): add AI chat widget powered by Mistral`
**Statut :** 🔲 À faire

**Objectif :** Intégrer un chatbot flottant connecté à l'API Mistral qui répond aux questions sur les voyages temporels.

**Livrables :**
- [ ] `src/lib/mistral.ts` — Client API Mistral (`mistral-small`), prompt système intégré
- [ ] `src/features/chatbot/useChatbot.ts` — Hook de gestion de l'état du chat (messages, loading, erreur)
- [ ] `src/features/chatbot/ChatMessage.tsx` — Affichage d'un message (user / assistant)
- [ ] `src/features/chatbot/ChatWidget.tsx` — Widget flottant (bouton toggle + fenêtre de chat)
- [ ] Variable d'environnement `VITE_MISTRAL_API_KEY` documentée dans `.env.example`
- [ ] Intégration dans `App.tsx`
- [ ] `README.md` — Mise à jour

**Critères d'acceptance :**
- Bouton flottant en bas à droite (icône chat, couleur or)
- Fenêtre de chat s'ouvre/ferme avec animation
- Le chatbot répond en tant que "conseiller de voyage temporel"
- Prompt système : persona d'agence de luxe, connaissance des 3 destinations
- Indicateur de chargement pendant la réponse de Mistral
- Gestion d'erreur si l'API est inaccessible

**Prompt système Mistral :**
```
Tu es le conseiller de voyage de TimeTravel Agency, une agence de luxe spécialisée
dans les voyages temporels. Tu aides les clients à choisir entre 3 destinations :
Paris 1889 (Belle Époque), le Crétacé -65M (dinosaures), et Florence 1504 (Renaissance).
Tu parles de manière élégante, enthousiaste et rassurante. Tu réponds en français.
```

---

### Phase 5 — Déploiement Vercel
**Commit :** `chore: deploy to Vercel`
**Statut :** 🔲 À faire

**Objectif :** Déployer l'application en production sur Vercel.

**Livrables :**
- [ ] Build de production validé localement (`npm run build`)
- [ ] Projet lié à Vercel (`vercel link`)
- [ ] Variable d'environnement `VITE_MISTRAL_API_KEY` configurée sur Vercel
- [ ] Déploiement en production (`vercel --prod`)
- [ ] URL de production documentée dans `README.md`

**Critères d'acceptance :**
- L'app est accessible publiquement
- Le chatbot fonctionne en production (clé API active)
- Pas de warnings de build TypeScript

---

## 4. Récapitulatif des livrables

| Phase | Feature | Commit | Statut |
|---|---|---|---|
| 1 | Setup & Infrastructure | `chore: initial setup` | ✅ |
| 2 | Layout + Page d'accueil | `feat(home): ...` | 🔲 |
| 3 | Galerie destinations | `feat(destinations): ...` | 🔲 |
| 4 | Chatbot IA Mistral | `feat(chatbot): ...` | 🔲 |
| 5 | Déploiement Vercel | `chore: deploy to Vercel` | 🔲 |

---

## 5. Convention de commits

```
feat(scope):    nouvelle feature
fix(scope):     correction de bug
chore:          config, setup, dépendances
style:          changements purement visuels / CSS
refactor:       refactoring sans changement de comportement
docs:           documentation uniquement
```

---

## 6. Commandes utiles

```bash
npm run dev        # Lancer le serveur de développement
npm run build      # Build de production
npm run preview    # Prévisualiser le build
npm run lint       # Linter ESLint
```
