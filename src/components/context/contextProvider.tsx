"use client";
import { useEffect, useState } from "react";
import { Context } from "./context";
export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const login = (user: User) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  useEffect(() => {
    const userData = localStorage.getItem("token");
    if (userData) {
      const userCheck = async () => {
        try {
          const res = await fetch("http://localhost:5000/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData}`,
            },
          });
          const data = await res.json();
          if (res.ok && data.success) {
            setUser(data.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      userCheck();
    }
  }, []);

  return (
    <Context.Provider value={{ login, logout, user }}>
      {children}
      {children}
    </Context.Provider>
  );
}
