import type { Recipe } from './recipe.types';

export type RecipeSearchResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};
