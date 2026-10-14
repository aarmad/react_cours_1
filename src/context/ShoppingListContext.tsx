import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Recipe } from '../types/recipe.types';
import type { ShoppingListEntry } from '../types/shoppinglistentry.types';

const STORAGE_KEY = 'mijote-shopping-list';

type Action =
  | { type: 'ADD_RECIPE'; recipe: Recipe }
  | { type: 'TOGGLE_ITEM'; recipeId: number; itemIndex: number }
  | { type: 'REMOVE_RECIPE'; recipeId: number }
  | { type: 'CLEAR' };

function reducer(state: ShoppingListEntry[], action: Action): ShoppingListEntry[] {
  switch (action.type) {
    case 'ADD_RECIPE': {
      if (state.some((entry) => entry.recipeId === action.recipe.id)) return state;
      const entry: ShoppingListEntry = {
        recipeId: action.recipe.id,
        recipeName: action.recipe.name,
        items: action.recipe.ingredients.map((label) => ({ label, checked: false })),
      };
      return [...state, entry];
    }
    case 'TOGGLE_ITEM':
      return state.map((entry) =>
        entry.recipeId === action.recipeId
          ? {
              ...entry,
              items: entry.items.map((item, index) =>
                index === action.itemIndex ? { ...item, checked: !item.checked } : item,
              ),
            }
          : entry,
      );
    case 'REMOVE_RECIPE':
      return state.filter((entry) => entry.recipeId !== action.recipeId);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function loadInitialState(): ShoppingListEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as ShoppingListEntry[]) : [];
  } catch {
    return [];
  }
}

type ShoppingListValue = {
  entries: ShoppingListEntry[];
  addRecipe: (recipe: Recipe) => void;
  toggleItem: (recipeId: number, itemIndex: number) => void;
  removeRecipe: (recipeId: number) => void;
  clear: () => void;
};

const ShoppingListStateContext = createContext<ShoppingListValue | null>(null);
const ShoppingListCountContext = createContext(0);

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [entries, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addRecipe = useCallback((recipe: Recipe) => dispatch({ type: 'ADD_RECIPE', recipe }), []);
  const toggleItem = useCallback(
    (recipeId: number, itemIndex: number) => dispatch({ type: 'TOGGLE_ITEM', recipeId, itemIndex }),
    [],
  );
  const removeRecipe = useCallback(
    (recipeId: number) => dispatch({ type: 'REMOVE_RECIPE', recipeId }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const value = useMemo(
    () => ({ entries, addRecipe, toggleItem, removeRecipe, clear }),
    [entries, addRecipe, toggleItem, removeRecipe, clear],
  );

  return (
    <ShoppingListCountContext.Provider value={entries.length}>
      <ShoppingListStateContext.Provider value={value}>
        {children}
      </ShoppingListStateContext.Provider>
    </ShoppingListCountContext.Provider>
  );
}

export function useShoppingList(): ShoppingListValue {
  const value = useContext(ShoppingListStateContext);
  if (!value) throw new Error('useShoppingList doit être utilisé sous ShoppingListProvider.');
  return value;
}

export function useShoppingListCount(): number {
  return useContext(ShoppingListCountContext);
}
