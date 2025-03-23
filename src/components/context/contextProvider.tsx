"use client";
import { useState, useEffect } from "react";
import { Context } from "./context";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  const login = (user: UserDataResponse | null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
  };
  const fetchUserData = async () => {
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
      if (userData.success) {
        login(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Context.Provider value={{ login, logout, user, token, fetchUserData }}>
      {children}
    </Context.Provider>
  );
}
