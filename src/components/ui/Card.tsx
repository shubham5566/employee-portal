import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
