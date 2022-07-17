import { Speciality, User, UserRole } from ".";
import { APIResponse } from "../api/base";

export function ObjectToUser(data: Object): User {
  console.log("OBJECTOT", data);
  let userData = data!["user" as keyof object];
  let user: User = {
    id: userData["id"],
    username: userData["username"],
    firstName: userData["first_name"],
    lastName: userData["last_name"],
    email: userData["email"],
    role: userData["role"] as UserRole,
    phone: userData["phone"],
    score: data["score" as keyof object],
    speciality: data["speciality" as keyof object] as Array<Speciality>,
  };
  return user;
}

export function APIDataToUser(res: APIResponse): User {
  let data = res.data;
  return ObjectToUser(data!);
}

export function APIDataToUsers(res: APIResponse): User[] {
  let data = res.data;
  let usersDict: Array<Object> = data!["users" as keyof object];
  const users = usersDict.map((u) => ObjectToUser(u));
  return users;
}
