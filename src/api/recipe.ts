import request from "@/utils/request";
import qs from "qs";

import { RecipeQueryType, RecipeType} from "../type";

export async function getRecipeList(params?: RecipeQueryType) {
  const response = await request.get(`/api/recipes?${qs.stringify(params)}`);
  return response;
  }
  
export const getRecipeById = async (id: number) => {
    const response = await request.get<RecipeType>(`/api/recipes/${id}`);
    return response;
  };