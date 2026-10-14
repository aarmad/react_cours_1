# MIJOTÉ

Application de recettes en React 19 + TypeScript, sur l'API publique [DummyJSON](https://dummyjson.com/docs/recipes). Catalogue avec recherche/filtre/tri, fiche recette, liste de courses, authentification et route protégée.

## Prérequis

Node.js 24+, npm.

## Installation et lancement

```bash
npm install
npm run dev
```

Autres scripts : `npm run build` (build de production, `tsc -b && vite build`), `npm run lint` (oxlint), `npm run preview`.

## Variable d'environnement

`.env` (versionné, ne contient aucun secret) :

```
VITE_API_BASE_URL=https://dummyjson.com
```

Seul endroit où l'URL de l'API apparaît en dehors de ce fichier : `src/services/api.ts`, qui la lit via `import.meta.env.VITE_API_BASE_URL` (typée dans `src/vite-env.d.ts`).

## Arborescence

```
src/
├── components/   Layout, ProtectedRoute, RequestStates, RecipeList, CatalogControls
├── pages/        CatalogPage, RecipePage, ShoppingListPage, LoginPage, NewRecipePage, NotFoundPage
├── hooks/        useFetch, useDebounce
├── context/      AuthContext, ShoppingListContext
├── services/     api.ts
├── types/        Recipe, MealType, Difficulty, AuthUser, NewRecipe, ShoppingListEntry...
├── App.tsx
└── main.tsx
```

## Stockage du jeton d'authentification

Le jeton renvoyé par `/auth/login` est gardé **uniquement en mémoire** (`useState` dans `AuthContext`), jamais dans `localStorage`. Conséquence assumée : un rechargement de page déconnecte l'utilisateur. Choix fait pour cet exercice afin de ne pas exposer le jeton dans le stockage du navigateur ; ça évite aussi d'avoir à le revalider au démarrage via `GET /auth/me` (explicitement un point bonus du sujet, non implémenté ici).

La liste de courses, elle, est persistée dans `localStorage` (voir `ShoppingListContext`) : elle survit au rechargement et à la navigation.

## Limites connues

- Le filtre par type de repas et le tri du catalogue portent sur les résultats déjà reçus (pas de nouvel appel réseau).
- `POST /recipes/add` simule la création : la recette envoyée n'apparaît jamais réellement dans le catalogue (comportement documenté de l'API de recette, pas un bug).
- Pas de synchronisation de la recherche avec l'URL (`useSearchParams`) : point bonus du sujet, non implémenté.

## Utilisation de l'IA générative

*(section à compléter : fournisseur et modèle le cas échéant, prompts, justification, adaptations apportées)*
