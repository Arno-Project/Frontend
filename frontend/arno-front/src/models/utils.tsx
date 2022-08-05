import { Feedback, FeedbackStatus, FeedbackType, RequestStatus, ServiceSummary, Speciality, User, UserRole } from ".";
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
    user: ObjectToUser(data["user" as keyof object]),
  };
  if (feedback.reply)
    feedback.reply!.user = ObjectToUser(data["reply" as keyof object]["user" as keyof object])
    
  return feedback;
}

export function ObjectToServiceSummary(data: Object): ServiceSummary {
  console.log("OBJECTOT", data);
  let serviceSummary: ServiceSummary = {
    id: data["id" as keyof object],
    customer: `${data["customer" as keyof object]["user"]["first_name"]} ${data["customer" as keyof object]["user"]["last_name"]}`,
    specialist: !!data["specialist" as keyof object] ? `${data["specialist" as keyof object]["user"]["first_name"]} ${data["specialist" as keyof object]["user"]["last_name"]}` : null,
    status: data["status" as keyof object] as RequestStatus,
    description: data["description" as keyof object],
    requested_speciality: data["requested_speciality" as keyof object] as Speciality,
  };
  return serviceSummary;
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

export function APIDataToServiceSummary(res: APIResponse): ServiceSummary[] {
  let data = res.data as Array<Object>;
  const summaries = data.map((r) => ObjectToServiceSummary(r));
  return summaries;
}

export function APIDataToRequestsSummary(res: APIResponse): ServiceSummary[] {
  let data = res.data!["requests" as keyof object] as Array<Object>;
  return data.map((r) => ObjectToServiceSummary(r));
}

export function APIDataToSpecialities(res: APIResponse): Speciality[] {
  let data = res.data!["specialities" as keyof object] as Array<Object>;
  return data.map((r: any) => {
    let spec : Speciality = {
      id: r["id" as keyof Object],
      title: r["title" as keyof Object],
      description: r["description" as keyof Object]
    };
    return spec;
  });
}
