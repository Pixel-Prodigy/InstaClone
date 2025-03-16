"use client";
import { useState, useEffect } from "react";
import { Context } from "./context";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      logout();
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user data");
          logout();
          return;
        }

        const userData = await response.json();
        setUser(userData);
        setToken(storedToken);
      } catch (error) {
        console.error("Error sending token:", error);
        logout();
      }
    };

    fetchUser();
  }, []);

  const login = (user: User | null, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Context.Provider value={{ login, logout, user, token }}>
      {children}
    </Context.Provider>
  );
}
