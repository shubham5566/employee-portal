import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
  accent?: "default" | "green" | "red" | "blue";
}

const ACCENT_CLASSES: Record<NonNullable<StatCardProps["accent"]>, string> = {
  default: "bg-slate-100 text-slate-600",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-primary-100 text-primary-700",
};

export function StatCard({ label, value, icon, accent = "default" }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4">
      {icon && (
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg ${ACCENT_CLASSES[accent]}`}>
          {icon}
        </div>
      )}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
      </div>
    </Card>
  );
}
