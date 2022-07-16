import { User, UserRole } from ".";
import { APIResponse } from "../api/base";

export function APIDataToUser(res: APIResponse): User {
  let data = res.data;
  let userData = data!["user" as keyof object];
  console.log(data);
  console.log(userData);
  let user: User = {
    id: userData["id"],
    username: userData["username"],
    firstName: userData["first_name"],
    lastName: userData["last_name"],
    email: userData["email"],
    role: data!["role" as keyof object] as UserRole,
    phone: userData["phone"],
  };
  return user;
}
