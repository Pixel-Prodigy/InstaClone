import { Dispatch, SetStateAction } from "react";

declare global {
  type User = {
    email?: string;
    password?: string;
    token?: string;
    name?: string;
    avatar?: string;
  };
  type Context = {
    user: User | null;
    setUser?: Dispatch<SetStateAction<User | null>>;
    login: (user: User) => void;
    logout: () => void;
  };
  type AuthApiResponse = {
    success: boolean;
    message?: string;
    data?: User;
    token?: string; 
  };
}
