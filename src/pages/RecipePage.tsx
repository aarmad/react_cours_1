import { useParams } from 'react-router';
import { ErrorMessage, Loader } from '../components/RequestStates';
import { useShoppingList } from '../context/ShoppingListContext';
import { useFetch } from '../hooks/useFetch';
import { ApiError, getRecipeById } from '../services/api';

export function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const { entries, addRecipe } = useShoppingList();

  const { data: recipe, loading, error, reload } = useFetch(
    (signal) => {
      if (!id || !/^\d+$/.test(id)) {
        return Promise.reject(new ApiError('Identifiant invalide.', 400));
      }
      return getRecipeById(Number(id), signal);
    },
    [id],
  );

  if (loading) return <Loader />;

  if (error) {
    if (error instanceof ApiError && (error.status === 400 || error.status === 404)) {
      return <p>Recette introuvable.</p>;
    }
    return <ErrorMessage message="Impossible de charger cette recette." onRetry={reload} />;
  }

  if (!recipe) return null;

  const alreadyInList = entries.some((entry) => entry.recipeId === recipe.id);

  return (
    <article>
      <img src={recipe.image} alt={recipe.name} width={400} height={300} />
      <h1>{recipe.name}</h1>
      <p>
        ★ {recipe.rating} ({recipe.reviewCount} avis) · Préparation {recipe.prepTimeMinutes} min ·
        Cuisson {recipe.cookTimeMinutes} min · {recipe.servings} portions · {recipe.difficulty}
      </p>

      <button type="button" disabled={alreadyInList} onClick={() => addRecipe(recipe)}>
        {alreadyInList ? 'Déjà dans ma liste' : '+ Ajouter à ma liste de courses'}
      </button>

      <h2>Ingrédients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </article>
  );
}
