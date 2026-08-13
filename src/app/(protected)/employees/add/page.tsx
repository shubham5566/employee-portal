"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AddEmployeeForm } from "@/components/employees/AddEmployeeForm";
import { ROUTES } from "@/constants";

export default function AddEmployeePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(ROUTES.EMPLOYEES)}
        className="self-start"
      >
        ← Back to Employees
      </Button>

      <div className="max-w-xl">
        <h1 className="mb-1 text-xl font-semibold text-slate-900">
          Add Employee
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          New employees are stored locally and appear at the top of the
          listing.
        </p>
        <Card>
          <AddEmployeeForm />
        </Card>
      </div>
    </div>
  );
}
