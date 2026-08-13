"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEmployees } from "@/contexts/EmployeeContext";
import { useFilteredEmployees } from "@/hooks/useFilteredEmployees";
import { useDebounce } from "@/hooks/useDebounce";
import { DashboardSummary } from "@/components/employees/DashboardSummary";
import { EmployeeFilters } from "@/components/employees/EmployeeFilters";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeCardList } from "@/components/employees/EmployeeCardList";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { TableSkeleton, CardSkeleton } from "@/components/ui/Skeleton";
import { ROUTES, SEARCH_DEBOUNCE_MS } from "@/constants";

export default function EmployeeListingPage() {
  const { employees, isLoading, error, refetch, listState, setListState, resetListState } =
    useEmployees();

  // Local input state so typing feels instant; the debounced value is what
  // actually drives filtering + persisted list state.
  const [searchInput, setSearchInput] = useState(listState.search);
  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setListState((prev) =>
      prev.search === debouncedSearch
        ? prev
        : { ...prev, search: debouncedSearch, page: 1 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const { pageItems, totalFiltered, totalPages, departments, stats } =
    useFilteredEmployees(employees, listState);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Employees</h1>
          <p className="text-sm text-slate-500">
            Browse, search, and manage your team.
          </p>
        </div>
        <Link href={ROUTES.ADD_EMPLOYEE}>
          <Button>+ Add Employee</Button>
        </Link>
      </div>

      <DashboardSummary
        total={stats.total}
        active={stats.active}
        inactive={stats.inactive}
        departments={stats.departmentCount}
      />

      <EmployeeFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        department={listState.department}
        onDepartmentChange={(department) =>
          setListState((prev) => ({ ...prev, department, page: 1 }))
        }
        departments={departments}
        sortDirection={listState.sortDirection}
        onSortToggle={() =>
          setListState((prev) => ({
            ...prev,
            sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
          }))
        }
        onReset={() => {
          setSearchInput("");
          resetListState();
        }}
      />

      {error && (
        <div className="flex flex-col items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{error}</p>
          <Button size="sm" variant="danger" onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {isLoading ? (
        <>
          <div className="hidden sm:block">
            <TableSkeleton />
          </div>
          <div className="flex flex-col gap-3 sm:hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="hidden sm:block">
            <EmployeeTable employees={pageItems} />
          </div>
          <div className="sm:hidden">
            <EmployeeCardList employees={pageItems} />
          </div>

          <Pagination
            page={Math.min(listState.page, totalPages)}
            totalPages={totalPages}
            totalItems={totalFiltered}
            pageSize={listState.pageSize}
            onPageChange={(page) => setListState((prev) => ({ ...prev, page }))}
          />
        </>
      )}
    </div>
  );
}
