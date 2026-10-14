import { useMemo, useState } from 'react';
import { MealTypeFilter, SearchBar, SortSelect } from '../components/CatalogControls';
import type { SortOption } from '../components/CatalogControls';
import { RecipeList } from '../components/RecipeList';
import { EmptyState, ErrorMessage, Loader } from '../components/RequestStates';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { searchRecipes } from '../services/api';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [mealType, setMealType] = useState('');
  const [sort, setSort] = useState<SortOption>('relevance');
  const debouncedQuery = useDebounce(query, 400);

  const { data, loading, error, reload } = useFetch(
    (signal) => searchRecipes(debouncedQuery, signal),
    [debouncedQuery],
  );

  // Filtre et tri en mémoire sur la liste déjà reçue, sans nouvel appel réseau.
  const recipes = useMemo(() => {
    if (!data) return [];

    const filtered = mealType
      ? data.recipes.filter((recipe) =>
          recipe.mealType.some((type) => type.toLowerCase() === mealType),
        )
      : data.recipes;

    if (sort === 'rating-desc') {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }
    if (sort === 'time-asc') {
      return [...filtered].sort(
        (a, b) => a.prepTimeMinutes + a.cookTimeMinutes - (b.prepTimeMinutes + b.cookTimeMinutes),
      );
    }
    if (sort === 'name-asc') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  }, [data, mealType, sort]);

  return (
    <section>
      <h1>Catalogue</h1>
      <SearchBar value={query} onChange={setQuery} />
      <MealTypeFilter value={mealType} onChange={setMealType} />
      <SortSelect value={sort} onChange={setSort} />

      {loading && <Loader />}
      {error && <ErrorMessage message="Impossible de charger les recettes." onRetry={reload} />}
      {!loading && !error && recipes.length === 0 && (
        <EmptyState message="Aucune recette ne correspond à votre recherche." />
      )}
      {!loading && !error && recipes.length > 0 && (
        <>
          <p>{recipes.length} recettes</p>
          <RecipeList recipes={recipes} />
        </>
      )}
    </section>
  );
}
