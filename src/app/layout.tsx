import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { EmployeeProvider } from "@/contexts/EmployeeContext";

export const metadata: Metadata = {
  title: "Employee Portal",
  description: "Manage employee records — a technical assessment project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-900 antialiased">
        <AuthProvider>
          <ToastProvider>
            <EmployeeProvider>{children}</EmployeeProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
