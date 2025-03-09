"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Context } from "../components/context/context";
import Header from "@/components/layout/Header";

export default function ProtectedPage() {
  const router = useRouter();
  const ctx = useContext(Context);

  if (!ctx) throw new Error("Context is null in ProtectedPage");

  const { user } = ctx;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user && !token) {
      router.push("/login");
    }
  }, [user]);
  if (!user) return null;
  console.log(user.avatar);

  return (
    <div>
      <Header />
    </div>
  );
}
