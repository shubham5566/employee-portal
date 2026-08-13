"use client";

import { useRouter } from "next/navigation";
import { Table, TableColumn } from "@/components/ui/Table";
import { StatusBadge } from "@/components/employees/StatusBadge";
import { Employee } from "@/types/employee";
import { ROUTES } from "@/constants";

export function EmployeeTable({ employees }: { employees: Employee[] }) {
  const router = useRouter();

  const columns: TableColumn<Employee>[] = [
    {
      key: "id",
      header: "Employee ID",
      render: (e) => <span className="font-mono text-xs text-slate-500">#{Math.abs(e.id)}</span>,
    },
    {
      key: "name",
      header: "Name",
      render: (e) => <span className="font-medium text-slate-900">{e.fullName}</span>,
    },
    { key: "email", header: "Email", render: (e) => e.email },
    { key: "department", header: "Department", render: (e) => e.department },
    { key: "designation", header: "Designation", render: (e) => e.designation },
    {
      key: "status",
      header: "Status",
      render: (e) => <StatusBadge status={e.status} />,
    },
  ];

  return (
    <Table
      columns={columns}
      rows={employees}
      getRowKey={(e) => e.id}
      onRowClick={(e) => router.push(ROUTES.EMPLOYEE_DETAILS(e.id))}
      emptyMessage="No employees match your search or filters."
    />
  );
}
