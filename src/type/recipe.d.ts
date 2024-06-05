export interface RecipeQueryType {
  name?: string;
  author?: string;
  current?: number;
  pageSize?: number;
  alcohol?: CheckboxValueType[];
  base?: CheckboxValueType[];
  sortBy?: string;
}

export interface RecipeType {
  id: number;
  name: string;
  description: string;
  published?: boolean;
  createdAt?: Date;
  base: string;
  alcohol: string;
  likeCount:number;
  starCount:number;
}