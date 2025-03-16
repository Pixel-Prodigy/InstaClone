import { Dispatch, SetStateAction } from "react";

declare global {
  type User = {
    email?: string;
    password?: string;
    token?: string;
    username?: string;
    avatar?: string;
  };
  type Context = {
    user: User | null;
    setUser?: Dispatch<SetStateAction<User | null>>;
    login: (user: User | null, token: string) => void;
    logout: () => void;
    token: string | null
  };
  type AuthApiResponse = {
    success: boolean;
    message?: string;
    data?: User;
    token?: string;
  };
  type PostRequest = {
    content?: string;
    hideComments: boolean;
    hideLikes: boolean;
    userId: string;
    userId: string;
    imageUrl: string;
  };
}
