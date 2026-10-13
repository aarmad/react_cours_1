// Fait avec Claude.ai
/**
 * Les trois commandes du catalogue (écran A) : recherche, filtre et tri.
 * Trois composants distincts, l'état vit dans CatalogPage.
 */

// L'API ne fournit pas cette liste : six valeurs imposées par le sujet.
const MEAL_TYPES = [
  { value: 'breakfast', label: 'Petit-déjeuner' },
  { value: 'lunch', label: 'Déjeuner' },
  { value: 'dinner', label: 'Dîner' },
  { value: 'appetizer', label: 'Entrée' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'beverage', label: 'Boisson' },
] as const;

type SearchBarProps = { value: string; onChange: (value: string) => void };

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label>
      Rechercher une recette
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher une recette…"
      />
    </label>
  );
}

type MealTypeFilterProps = { value: string; onChange: (value: string) => void };

export function MealTypeFilter({ value, onChange }: MealTypeFilterProps) {
  return (
    <label>
      Type de repas
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Tous</option>
        {MEAL_TYPES.map((mealType) => (
          <option key={mealType.value} value={mealType.value}>
            {mealType.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export type SortOption = 'relevance' | 'rating-desc' | 'time-asc' | 'name-asc';

type SortSelectProps = { value: SortOption; onChange: (value: SortOption) => void };

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label>
      Trier par
      <select value={value} onChange={(event) => onChange(event.target.value as SortOption)}>
        <option value="relevance">Pertinence</option>
        <option value="rating-desc">Note décroissante</option>
        <option value="time-asc">Temps total croissant</option>
        <option value="name-asc">Nom de A à Z</option>
      </select>
    </label>
  );
}
