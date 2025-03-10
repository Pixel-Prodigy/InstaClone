"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Context } from "../components/context/context";
import FooterNav from "@/components/layout/FooterNav";
import AuthProtector from "@/components/layout/AuthProtector";

export default function ProtectedPage() {
  return (
    <AuthProtector>
      <FooterNav />
    </AuthProtector>
  );
}
