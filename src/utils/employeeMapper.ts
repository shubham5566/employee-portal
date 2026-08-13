import { DummyJsonUser, Employee, EmployeeStatus } from "@/types/employee";

/**
 * The dummyjson.com/users API has no "status" or "designation" field for
 * employees, so we derive a deterministic pseudo-status from the user id
 * (rather than random, so the value is stable across renders/reloads).
 * Roughly 75% Active / 25% Inactive, which gives believable dashboard counts.
 */
function deriveStatus(id: number): EmployeeStatus {
  return id % 4 === 0 ? EmployeeStatus.INACTIVE : EmployeeStatus.ACTIVE;
}

export function mapDummyUserToEmployee(user: DummyJsonUser): Employee {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const address = user.address
    ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}`
    : "—";

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName,
    email: user.email,
    phone: user.phone,
    address,
    company: user.company?.name ?? "—",
    department: user.company?.department ?? "Unassigned",
    designation: user.company?.title ?? "—",
    status: deriveStatus(user.id),
    image: user.image,
    isLocal: false,
  };
}
