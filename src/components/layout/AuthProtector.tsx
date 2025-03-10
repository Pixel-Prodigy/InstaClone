"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "../context/context";

const AuthProtector = ({ children }: { children: React.ReactNode }) => {
  const ctx = useContext(Context);
  if (!ctx) return null;
  const { user, login } = ctx;
  const router = useRouter();

  useEffect(() => {
    const userCheck = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        login(null);
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          login(data.data);
        } else {
          login(null);
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
        login(null);
        router.push("/login");
      }
    };

    userCheck();
  }, [router]);

  return user ? <>{children}</> : null;
};

export default AuthProtector;
