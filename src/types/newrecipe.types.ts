import type { Difficulty } from './difficulty.types';

export type NewRecipe = {
  name: string;
  cuisine: string;
  difficulty: Difficulty;
  prepTimeMinutes: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  userId: number;
};
