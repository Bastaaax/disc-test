# Test DISC — Application React + Supabase

Application web de test de personnalité DISC (Dominance, Influence, Stabilité, Consciencieux) en 25 questions, avec résultats visuels et sauvegarde Supabase.

## Stack

- React 18 + Vite
- Tailwind CSS v4
- Recharts (graphiques radar et barres)
- Framer Motion (animations)
- Supabase (base de données)
- React Router v6

## Installation

```bash
npm install
```

## Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com).
2. Dans le SQL Editor, exécutez le contenu du fichier `supabase/migrations/001_disc_results.sql` pour créer la table `disc_results` et les politiques RLS.
3. Copiez l’URL du projet et la clé anonyme (anon key) depuis **Settings → API**.
4. Créez un fichier `.env` à la racine (voir `.env.example`) :

```
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key
```

## Lancer l’app en dev

```bash
npm run dev
```

## Build production

```bash
npm run build
npm run preview   # prévisualiser le build
```

## Structure

- `src/components/` — Welcome, Quiz, Results
- `src/data/` — questions, clé de scoring, descriptions des profils
- `src/hooks/useDisc.js` — logique du test et calcul des scores
- `src/lib/supabase.js` — client Supabase

Les résultats sont enregistrés dans Supabase après la dernière question. En cas d’erreur réseau, les résultats restent affichés localement.

---

## Déploiement (Vercel)

1. Connecte ce dépôt GitHub à [Vercel](https://vercel.com) (Import Project).
2. Ajoute les variables d’environnement dans **Settings → Environment Variables** :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Déploie : chaque push sur `main` déclenche un déploiement automatique.
