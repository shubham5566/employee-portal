export enum EmployeeStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export interface EmployeeAddress {
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface EmployeeCompany {
  name: string;
  department: string;
  title: string;
}

/**
 * Normalized employee shape used throughout the app.
 * Employees can come from two sources:
 *  1. The dummyjson.com/users API (read-only, mapped via mapDummyUserToEmployee)
 *  2. Locally added employees (persisted to localStorage), which reuse this
 *     same shape so both can be rendered by the same components.
 */
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
  image?: string;
  isLocal?: boolean;
}

export interface DummyJsonAddress {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface DummyJsonCompany {
  department: string;
  name: string;
  title: string;
  address?: DummyJsonAddress;
}

export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: DummyJsonAddress;
  company: DummyJsonCompany;
  image?: string;
}

export interface DummyJsonUsersResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}

export type SortDirection = "asc" | "desc";

export interface EmployeeListState {
  page: number;
  pageSize: number;
  search: string;
  department: string;
  sortDirection: SortDirection;
}

export interface NewEmployeeInput {
  fullName: string;
  email: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
}
