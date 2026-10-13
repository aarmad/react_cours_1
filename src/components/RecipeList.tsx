// Fait avec Claude.ai
import { Link } from 'react-router';
import type { Recipe } from '../types/recipe.types';

type RecipeCardProps = { recipe: Recipe };

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Link to={`/recettes/${recipe.id}`}>
      <article>
        <img src={recipe.image} alt={recipe.name} width={200} height={150} />
        <h3>{recipe.name}</h3>
        <p>
          ★ {recipe.rating} · {totalTime} min · {recipe.difficulty} · {recipe.cuisine}
        </p>
      </article>
    </Link>
  );
}

type RecipeListProps = { recipes: Recipe[] };

export function RecipeList({ recipes }: RecipeListProps) {
  return (
    <ul className="recipe-grid">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
