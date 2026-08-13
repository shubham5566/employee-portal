"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEmployees } from "@/contexts/EmployeeContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/employees/StatusBadge";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { ROUTES } from "@/constants";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="text-sm text-slate-800">{value || "—"}</dd>
    </div>
  );
}

export default function EmployeeDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getEmployeeById, isLoading } = useEmployees();

  const id = Number(params.id);
  const employee = getEmployeeById(id);

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

      {isLoading && !employee ? (
        <CardSkeleton />
      ) : !employee ? (
        <Card className="text-center">
          <p className="text-base font-medium text-slate-900">
            Employee not found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            This employee may not exist or the ID is invalid.
          </p>
          <Link href={ROUTES.EMPLOYEES}>
            <Button className="mt-4">Back to Employees</Button>
          </Link>
        </Card>
      ) : (
        <Card>
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                {employee.fullName}
              </h1>
              <p className="text-sm text-slate-500">{employee.designation}</p>
            </div>
            <StatusBadge status={employee.status} />
          </div>

          <dl className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 sm:gap-x-6">
            <DetailRow label="Email" value={employee.email} />
            <DetailRow label="Phone" value={employee.phone} />
            <DetailRow label="Address" value={employee.address} />
            <DetailRow label="Company" value={employee.company} />
            <DetailRow label="Department" value={employee.department} />
            <DetailRow label="Designation" value={employee.designation} />
          </dl>
        </Card>
      )}
    </div>
  );
}
