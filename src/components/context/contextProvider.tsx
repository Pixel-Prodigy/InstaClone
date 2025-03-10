"use client";
import { useEffect, useState } from "react";
import { Context } from "./context";
import { useRouter } from "next/navigation";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = (user: User | null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <Context.Provider value={{ login, logout, user }}>
      {children}
    </Context.Provider>
  );
}
