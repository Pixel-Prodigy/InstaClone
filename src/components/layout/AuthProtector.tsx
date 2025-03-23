"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "../context/context";

const AuthProtector = ({ children }: { children: React.ReactNode }) => {
  const ctx = useContext(Context);
  const router = useRouter();

  if (!ctx) return null;
  const { user } = ctx;
  console.log(user)

  

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return user ? <>{children}</> : null;
};

export default AuthProtector;
