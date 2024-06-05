export interface UserType{
    id: number;
    username: string;
    email: string;
    identity: string;
    createdAt?: Date;
    password: string;
    liked?: string;
    stared?:string;
}
export interface LoginResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: UserType;
  }