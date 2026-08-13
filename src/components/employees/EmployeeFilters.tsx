"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { SortDirection } from "@/types/employee";

interface EmployeeFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  departments: string[];
  sortDirection: SortDirection;
  onSortToggle: () => void;
  onReset: () => void;
}

export function EmployeeFilters({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  departments,
  sortDirection,
  onSortToggle,
  onReset,
}: EmployeeFiltersProps) {
  const hasActiveFilters = Boolean(search || department);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-xl">
        <Input
          label="Search"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search employees by name or email"
        />
        <Select
          label="Department"
          placeholder="All departments"
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          options={departments.map((d) => ({ label: d, value: d }))}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onSortToggle}>
          Name {sortDirection === "asc" ? "A→Z" : "Z→A"}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
