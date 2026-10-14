import { Link } from 'react-router';
import { useShoppingList } from '../context/ShoppingListContext';

export function ShoppingListPage() {
  const { entries, toggleItem, removeRecipe, clear } = useShoppingList();

  if (entries.length === 0) {
    return (
      <section>
        <h1>Ma liste de courses</h1>
        <p>
          Votre liste est vide. <Link to="/">Retour au catalogue</Link>
        </p>
      </section>
    );
  }

  const totalItems = entries.reduce((count, entry) => count + entry.items.length, 0);
  const checkedItems = entries.reduce(
    (count, entry) => count + entry.items.filter((item) => item.checked).length,
    0,
  );

  return (
    <section>
      <h1>Ma liste de courses</h1>
      <p>
        {entries.length} recette{entries.length > 1 ? 's' : ''} · {checkedItems} article
        {checkedItems > 1 ? 's' : ''} cochés sur {totalItems}
      </p>

      {entries.map((entry) => (
        <div key={entry.recipeId}>
          <h2>
            {entry.recipeName}{' '}
            <button type="button" onClick={() => removeRecipe(entry.recipeId)}>
              Retirer
            </button>
          </h2>
          <ul>
            {entry.items.map((item, index) => (
              <li key={index}>
                <label style={item.checked ? { textDecoration: 'line-through' } : undefined}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(entry.recipeId, index)}
                  />
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button type="button" onClick={clear}>
        Vider la liste
      </button>
    </section>
  );
}
