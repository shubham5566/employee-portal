import { EmployeeStatus } from "@/types/employee";

export function StatusBadge({ status }: { status: EmployeeStatus }) {
  const isActive = status === EmployeeStatus.ACTIVE;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-slate-200 text-slate-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-green-500" : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}
