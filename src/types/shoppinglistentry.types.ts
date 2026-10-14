export type ShoppingListItem = {
  label: string;
  checked: boolean;
};

export type ShoppingListEntry = {
  recipeId: number;
  recipeName: string;
  items: ShoppingListItem[];
};
