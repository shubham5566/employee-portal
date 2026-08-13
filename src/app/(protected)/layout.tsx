"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Header } from "@/components/layout/Header";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
    </ProtectedRoute>
  );
}
