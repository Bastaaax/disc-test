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

Le projet Supabase **DISC** est déjà créé. Pour le brancher à l’app :

1. Dans le dashboard de ton projet (DISC), ouvre le **SQL Editor** et exécutez le contenu de `supabase/migrations/001_disc_results.sql` pour créer la table `disc_results` et les politiques RLS.
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

**Si les résultats n’apparaissent pas en base :**
- En local : vérifie que `.env` contient bien `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` (sans espace, sans guillemets en trop).
- Sur Vercel : va dans **Settings → Environment Variables**, ajoute les deux variables pour **Production** (et Preview si tu veux), puis **redéploie** (Redeploy) pour que les nouvelles variables soient prises en compte.
- Sur la page résultats, un message d’erreur s’affiche si la sauvegarde échoue. Ouvre aussi la console du navigateur (F12) pour voir le détail.
