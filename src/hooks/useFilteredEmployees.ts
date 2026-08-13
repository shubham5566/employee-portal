import { useMemo } from "react";
import { Employee, EmployeeListState, EmployeeStatus } from "@/types/employee";

interface FilteredResult {
  pageItems: Employee[];
  totalFiltered: number;
  totalPages: number;
  departments: string[];
  stats: {
    total: number;
    active: number;
    inactive: number;
    departmentCount: number;
  };
}

export function useFilteredEmployees(
  employees: Employee[],
  listState: EmployeeListState
): FilteredResult {
  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.department).filter(Boolean));
    return Array.from(set).sort();
  }, [employees]);

  const stats = useMemo(() => {
    const active = employees.filter(
      (e) => e.status === EmployeeStatus.ACTIVE
    ).length;
    return {
      total: employees.length,
      active,
      inactive: employees.length - active,
      departmentCount: departments.length,
    };
  }, [employees, departments]);

  const filtered = useMemo(() => {
    const term = listState.search.trim().toLowerCase();

    let result = employees.filter((e) => {
      const matchesSearch =
        term.length === 0 ||
        e.fullName.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term);
      const matchesDepartment =
        !listState.department || e.department === listState.department;
      return matchesSearch && matchesDepartment;
    });

    result = [...result].sort((a, b) => {
      const cmp = a.fullName.localeCompare(b.fullName);
      return listState.sortDirection === "asc" ? cmp : -cmp;
    });

    return result;
  }, [employees, listState.search, listState.department, listState.sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / listState.pageSize)
  );
  const safePage = Math.min(listState.page, totalPages);
  const start = (safePage - 1) * listState.pageSize;
  const pageItems = filtered.slice(start, start + listState.pageSize);

  return {
    pageItems,
    totalFiltered: filtered.length,
    totalPages,
    departments,
    stats,
  };
}
