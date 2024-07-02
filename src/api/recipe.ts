import request from "@/utils/request";
import qs from "qs";

import { RecipeQueryType, RecipeType} from "../type";

export async function getRecipeList(params?: RecipeQueryType) {
  const response = await request.get(`/api/recipes?${qs.stringify(params)}`);
  return response;
  }
  
  export async function getRecipeById(id: number){
    const response = await request.get<RecipeType>(`/api/recipes/${id}`);
    return response;
  };

export async function createRecipe(data: RecipeType) {
  const response = await request.post(`/api/recipes`, data);
  return response;
}
export async function engagement(id: number, action: string, type: string, userId: number) {
  const response = await request.put(`/api/recipes/engagement/${id}?action=${action}&type=${type}&userId=${userId}`);
  return response;
}