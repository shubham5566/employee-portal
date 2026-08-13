import { EmployeeStatus } from "@/types/employee";

export const VALID_CREDENTIALS = {
  email: "admin@test.com",
  password: "Admin@123",
};

export const STORAGE_KEYS = {
  AUTH: "employee_portal_auth",
  LOCAL_EMPLOYEES: "employee_portal_local_employees",
  LIST_STATE: "employee_portal_list_state",
};

export const API_BASE_URL = "https://dummyjson.com";

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [10, 20, 50];

export const STATUS_OPTIONS: EmployeeStatus[] = [
  EmployeeStatus.ACTIVE,
  EmployeeStatus.INACTIVE,
];

export const SEARCH_DEBOUNCE_MS = 350;

export const ROUTES = {
  LOGIN: "/login",
  EMPLOYEES: "/employees",
  ADD_EMPLOYEE: "/employees/add",
  EMPLOYEE_DETAILS: (id: number | string) => `/employees/${id}`,
};
