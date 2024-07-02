export interface RecipeQueryType {
  name?: string;
  author?: string;
  current?: number;
  pageSize?: number;
  alcohol?: CheckboxValueType[];
  spirit?: CheckboxValueType[];
  sortBy?: string;
}

export interface RecipeType {
  id: number;
  name: string;
  description: string;
  createdAt?: Date;
  imageUrl: string;
  spirit: string;
  alcohol: string;
  likeCount:number;
  starCount:number;
  method: string;
  spiritAmount: string;
  juice: string;
  juiceAmount: string;
  basic: string;
  basicAmount: string;
  other: string;
  otherAmount: string;
}