import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
