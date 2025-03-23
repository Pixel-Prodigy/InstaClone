import { User } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

declare global {
  type UserData = {
    id: string;
    email: string;
    username: string;
    followers: User[];
    socialLinks?: { platform: string; url: string }[];
    isPrivate: boolean;
    following: User[];
    posts: Post[];
    liking: Liking[];
    likes: Liking[];
    comments: Comment[];
    bio: string;
    avatar: string;
  };
  type Context = {
    user: UserDataResponse | null;
    setUser?: Dispatch<SetStateAction<User | null>>;
    login: (user: UserDataResposne | null) => void;
    logout: () => void;
    token: string | null;
    fetchUserData: () => void;
  };
  type Liking = {
    image: string;
    text: string;
  };
  type AuthApiResponse = {
    success: boolean;
    message?: string;
    data?: UserData;
    token?: string;
  };
  type UserDataResponse = {
    success: boolean;
    message?: string;
    data?: UserData;
  };
  type PostRequest = {
    content?: string;
    hideComments: boolean;
    hideLikes: boolean;
    userId: string;
    userId: string;
    imageUrl: string;
  };
  type LikingRequest = {
    likingTitle: string;
    likingDescription: string;
    imageUrl: string;
  };
}
