"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useEmployees } from "@/contexts/EmployeeContext";
import { useToast } from "@/contexts/ToastContext";
import { validateEmail, validateRequired } from "@/utils/validation";
import { EmployeeStatus, NewEmployeeInput } from "@/types/employee";
import { ROUTES, STATUS_OPTIONS } from "@/constants";

interface FormState {
  fullName: string;
  email: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  department: "",
  designation: "",
  status: EmployeeStatus.ACTIVE,
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export function AddEmployeeForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addEmployee } = useEmployees();
  const { showToast } = useToast();
  const router = useRouter();

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    const nameCheck = validateRequired(form.fullName, "Full name");
    if (!nameCheck.valid) nextErrors.fullName = nameCheck.message;

    const emailCheck = validateEmail(form.email);
    if (!emailCheck.valid) nextErrors.email = emailCheck.message;

    const deptCheck = validateRequired(form.department, "Department");
    if (!deptCheck.valid) nextErrors.department = deptCheck.message;

    const designationCheck = validateRequired(form.designation, "Designation");
    if (!designationCheck.valid) nextErrors.designation = designationCheck.message;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const payload: NewEmployeeInput = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      department: form.department.trim(),
      designation: form.designation.trim(),
      status: form.status,
    };

    // Simulate a brief async save so the loading state is visible, since
    // this is a local-only (no backend) write.
    await new Promise((resolve) => setTimeout(resolve, 300));
    addEmployee(payload);
    setIsSubmitting(false);
    showToast("Employee added successfully.", "success");
    router.push(ROUTES.EMPLOYEES);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Full Name"
        name="fullName"
        placeholder="e.g. Priya Sharma"
        value={form.fullName}
        onChange={(e) => updateField("fullName", e.target.value)}
        error={errors.fullName}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="e.g. priya.sharma@company.com"
        value={form.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
        required
      />
      <Input
        label="Department"
        name="department"
        placeholder="e.g. Engineering"
        value={form.department}
        onChange={(e) => updateField("department", e.target.value)}
        error={errors.department}
        required
      />
      <Input
        label="Designation"
        name="designation"
        placeholder="e.g. Frontend Developer"
        value={form.designation}
        onChange={(e) => updateField("designation", e.target.value)}
        error={errors.designation}
        required
      />
      <Select
        label="Status"
        name="status"
        value={form.status}
        onChange={(e) => updateField("status", e.target.value)}
        options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))}
      />

      <div className="mt-2 flex items-center gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          Add Employee
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push(ROUTES.EMPLOYEES)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
