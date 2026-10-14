import type { AuthUser, LoginCredentials } from '../types/loginCredentials.types';
import type { NewRecipe } from '../types/newrecipe.types';
import type { Recipe } from '../types/recipe.types';
import type { RecipeSearchResponse } from '../types/recipesearchresponse.types';

export type CreatedRecipe = NewRecipe & { id: number };

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    throw new ApiError('Impossible de joindre le serveur. Vérifiez votre connexion internet.');
  }

  if (!response.ok) {
    throw new ApiError(`Le serveur a répondu avec une erreur (code ${response.status}).`, response.status);
  }

  return response.json() as Promise<T>;
}

export function searchRecipes(query: string, signal?: AbortSignal): Promise<RecipeSearchResponse> {
  const params = new URLSearchParams({ q: query, limit: '0' });
  return request<RecipeSearchResponse>(`/recipes/search?${params.toString()}`, { signal });
}
export function getRecipeById(id: number, signal?: AbortSignal): Promise<Recipe> {
  return request<Recipe>(`/recipes/${id}`, { signal });
}

export function login(credentials: LoginCredentials): Promise<AuthUser> {
  return request<AuthUser>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
}

export function createRecipe(payload: NewRecipe): Promise<CreatedRecipe> {
  return request<CreatedRecipe>('/recipes/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
