import { apiRequest } from "@/services/api";
import { DummyJsonUsersResponse, Employee } from "@/types/employee";
import { mapDummyUserToEmployee } from "@/utils/employeeMapper";

/**
 * Fetches all users from dummyjson and maps them to the app's Employee shape.
 * We fetch the full set (dummyjson caps at 208 users) and do search /
 * filter / sort / pagination on the client, since the assessment's search
 * and filter requirements (name+email search, department filter) don't
 * map cleanly onto dummyjson's limited query params.
 */
export async function fetchAllEmployees(): Promise<Employee[]> {
  const data = await apiRequest<DummyJsonUsersResponse>("/users", {
    params: { limit: 0 },
  });
  return data.users.map(mapDummyUserToEmployee);
}
