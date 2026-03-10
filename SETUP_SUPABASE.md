# Configurer la sauvegarde des résultats (4 étapes)

Ton projet Supabase **DISC** existe déjà. Pour que les résultats du test apparaissent dedans, il faut **créer la table** (si ce n’est pas fait) puis **configurer la clé API**.

---

## Étape 0 — Créer la table dans Supabase

Sans cette table, les données ne peuvent pas être enregistrées.

1. Ouvre le **SQL Editor** Supabase :  
   **https://supabase.com/dashboard/project/xmgygvjfxfuvmqagmshs/sql/new**
2. Copie tout le contenu du fichier **`supabase/migrations/001_disc_results.sql`** (à la racine du projet).
3. Colle-le dans l’éditeur SQL et clique sur **Run**.
4. Tu dois voir « Success » : la table `disc_results` existe maintenant, avec les bonnes colonnes et les politiques RLS (insert/select autorisés pour tous).

---

## Étape 1 — Ouvre la page des clés API Supabase

Clique sur ce lien (connecte-toi à Supabase si besoin) :

**https://supabase.com/dashboard/project/xmgygvjfxfuvmqagmshs/settings/api**

## Étape 2 — Copie la clé « anon public »

Sur la page, dans la section **Project API keys**, repère la clé **anon** **public**.  
Clique sur **Reveal** puis sur l’icône **Copier** pour la copier.

## Étape 3 — Colle la clé dans le fichier `.env`

1. Ouvre le fichier **`.env`** à la racine du projet (dans Cursor / ton éditeur).
2. À la ligne `VITE_SUPABASE_ANON_KEY=`, **colle** la clé **tout de suite après le `=`** (sans espace, sans guillemets).
3. Sauvegarde le fichier.

Exemple (ta clé sera plus longue) :
```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important :** si la clé reste vide, l’app n’envoie rien à Supabase et tu verras le message « Supabase non configuré » ou « Erreur lors de la sauvegarde ». Les données n’apparaîtront pas.

---

## Étape 4 — Redémarrer et tester

1. Redémarre le serveur : `npm run dev`.
2. Refais un test complet (réponds au quiz jusqu’aux résultats).
3. Dans Supabase : **Table Editor** → table **`disc_results`** → tu devrais voir la nouvelle ligne.

---

## Pourquoi mes données ne remontent pas ?

| Cause | Solution |
|--------|----------|
| **Clé anon vide** dans `.env` | Colle la clé `VITE_SUPABASE_ANON_KEY` comme à l’étape 3, sauvegarde, redémarre `npm run dev`. |
| **Table absente** | Exécute le SQL de `supabase/migrations/001_disc_results.sql` dans le SQL Editor (étape 0). |
| **Erreur affichée sur la page résultats** | Ouvre la console du navigateur (F12) pour voir le détail ; souvent clé invalide ou table/colonnes manquantes. |

**Pour Vercel :** va dans ton projet Vercel → **Settings** → **Environment Variables**, ajoute `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` (même valeur que dans `.env`), puis **Redeploy**.
