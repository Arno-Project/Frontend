import { Feedback, FeedbackStatus, FeedbackType, Speciality, User, UserRole } from ".";
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
    is_validated: data["is_validated" as keyof object],
  };
  return user;
}

export function ObjectToFeedback(data: Object): Feedback {
  console.log("OBJECTOT", data);
  let feedback: Feedback = {
    created_at: data["created_at" as keyof object],
    id: data["id" as keyof object],
    reply: data["reply" as keyof object],
    status: data["status" as keyof object] as FeedbackStatus,
    text: data["text" as keyof object],
    type: data["type" as keyof object] as FeedbackType,
    user: data["user" as keyof object],
  };
  return feedback;
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

export function APIDataToFeedbacks(res: APIResponse): Feedback[] {
  let data = res.data as Array<Object>;
  const feedbacks = data.map((f) => ObjectToFeedback(f));
  return feedbacks;
}
