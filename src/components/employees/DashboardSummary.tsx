import { StatCard } from "@/components/ui/StatCard";

interface DashboardSummaryProps {
  total: number;
  active: number;
  inactive: number;
  departments: number;
}

export function DashboardSummary({
  total,
  active,
  inactive,
  departments,
}: DashboardSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Total Employees" value={total} icon="👥" accent="blue" />
      <StatCard label="Active" value={active} icon="✓" accent="green" />
      <StatCard label="Inactive" value={inactive} icon="–" accent="red" />
      <StatCard
        label="Departments"
        value={departments}
        icon="🏢"
        accent="default"
      />
    </div>
  );
}
