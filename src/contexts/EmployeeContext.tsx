"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { STORAGE_KEYS, DEFAULT_PAGE_SIZE } from "@/constants";
import { ApiError } from "@/services/api";
import { fetchAllEmployees } from "@/services/employeeService";
import {
  Employee,
  EmployeeListState,
  NewEmployeeInput,
} from "@/types/employee";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DEFAULT_LIST_STATE: EmployeeListState = {
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  search: "",
  department: "",
  sortDirection: "asc",
};

interface EmployeeContextValue {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  addEmployee: (input: NewEmployeeInput) => Employee;
  getEmployeeById: (id: number) => Employee | undefined;
  listState: EmployeeListState;
  setListState: (
    next: EmployeeListState | ((prev: EmployeeListState) => EmployeeListState)
  ) => void;
  resetListState: () => void;
}

const EmployeeContext = createContext<EmployeeContextValue | undefined>(
  undefined
);

let localIdCounter = -1; // Negative IDs keep locally-added employees from colliding with API ids.

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [remoteEmployees, setRemoteEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { value: localEmployees, setValue: setLocalEmployees } =
    useLocalStorage<Employee[]>(STORAGE_KEYS.LOCAL_EMPLOYEES, []);

  // Employee list UI state (search/filter/sort/page) is persisted so that
  // navigating to a details page and back restores exactly where the user
  // left off, per the "State Preservation" requirement.
  const { value: listState, setValue: setListState } =
    useLocalStorage<EmployeeListState>(
      STORAGE_KEYS.LIST_STATE,
      DEFAULT_LIST_STATE
    );

  const loadEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllEmployees();
      setRemoteEmployees(data);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to load employees. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const employees = useMemo(
    () => [...localEmployees, ...remoteEmployees],
    [localEmployees, remoteEmployees]
  );

  const addEmployee = useCallback(
    (input: NewEmployeeInput): Employee => {
      const newEmployee: Employee = {
        id: localIdCounter--,
        firstName: input.fullName.split(" ")[0] ?? input.fullName,
        lastName: input.fullName.split(" ").slice(1).join(" "),
        fullName: input.fullName,
        email: input.email,
        phone: "—",
        address: "—",
        company: "—",
        department: input.department,
        designation: input.designation,
        status: input.status,
        isLocal: true,
      };
      setLocalEmployees((prev) => [newEmployee, ...prev]);
      return newEmployee;
    },
    [setLocalEmployees]
  );

  const getEmployeeById = useCallback(
    (id: number) => employees.find((e) => e.id === id),
    [employees]
  );

  const resetListState = useCallback(() => {
    setListState(DEFAULT_LIST_STATE);
  }, [setListState]);

  const value: EmployeeContextValue = {
    employees,
    isLoading,
    error,
    refetch: loadEmployees,
    addEmployee,
    getEmployeeById,
    listState,
    setListState,
    resetListState,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees(): EmployeeContextValue {
  const ctx = useContext(EmployeeContext);
  if (!ctx) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return ctx;
}
