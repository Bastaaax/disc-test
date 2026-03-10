# Déploiement GitHub + Vercel

## 1. Pousser le code sur GitHub

Le dépôt **https://github.com/Bastaaax/disc-test** a été créé et le remote est déjà configuré.

Depuis le dossier du projet, exécute :

```bash
cd "/Users/boisjot/Vibe coding/DISC/disc-test"
git push -u origin main
```

Si tu utilises HTTPS et que Git demande un mot de passe, utilise un **Personal Access Token** (GitHub → Settings → Developer settings → Personal access tokens) à la place du mot de passe.

Avec SSH (si tu as une clé configurée) :

```bash
git remote set-url origin git@github.com:Bastaaax/disc-test.git
git push -u origin main
```

---

## 2. Déployer sur Vercel

### Option A : Via le site Vercel (recommandé)

1. Va sur [vercel.com](https://vercel.com) et connecte-toi.
2. Clique sur **Add New…** → **Project**.
3. **Import** le dépôt **Bastaaax/disc-test** (s’il n’apparaît pas, connecte ton compte GitHub dans Vercel).
4. Vercel détecte Vite : garde les réglages par défaut (Build Command: `npm run build`, Output: `dist`).
5. **Environment Variables** : ajoute :
   - `VITE_SUPABASE_URL` = ton URL Supabase  
   - `VITE_SUPABASE_ANON_KEY` = ta clé anon Supabase  
   (Production, Preview, Development si tu veux que ce soit dispo partout.)
6. Clique sur **Deploy**.

Chaque push sur `main` déclenchera un nouveau déploiement automatique.

### Option B : Via la CLI Vercel

```bash
cd "/Users/boisjot/Vibe coding/DISC/disc-test"
npx vercel
```

Suis les questions (lien au projet existant ou nouveau projet). Ensuite, ajoute les variables d’environnement dans le dashboard Vercel (Settings → Environment Variables) puis redéploie si besoin.

---

## Récap

| Étape              | Statut |
|--------------------|--------|
| Dépôt GitHub créé  | ✅ https://github.com/Bastaaax/disc-test |
| Git init + commit  | ✅ Fait |
| Remote `origin`    | ✅ Configuré |
| `git push`         | À faire par toi (auth) |
| Déploiement Vercel | À faire (Option A ou B) |
