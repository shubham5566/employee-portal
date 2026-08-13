"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/employees/StatusBadge";
import { Employee } from "@/types/employee";
import { ROUTES } from "@/constants";

export function EmployeeCardList({ employees }: { employees: Employee[] }) {
  const router = useRouter();

  if (employees.length === 0) {
    return (
      <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-500">
        No employees match your search or filters.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {employees.map((e) => (
        <Card
          key={e.id}
          onClick={() => router.push(ROUTES.EMPLOYEE_DETAILS(e.id))}
          className="cursor-pointer transition active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{e.fullName}</p>
              <p className="truncate text-sm text-slate-500">{e.email}</p>
              <p className="mt-1 text-sm text-slate-600">{e.department}</p>
            </div>
            <StatusBadge status={e.status} />
          </div>
        </Card>
      ))}
    </div>
  );
}
