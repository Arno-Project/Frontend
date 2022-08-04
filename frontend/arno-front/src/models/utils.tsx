import {
  Chat,
  Feedback,
  FeedbackStatus,
  FeedbackType,
  Message,
  RequestStatus,
  ServiceSummary,
  Speciality,
  User,
  UserRole,
  Notification,
} from ".";
import { APIResponse } from "../api/base";

export function ObjectToUser(data: Object): User {
  let userData:any = data!["user" as keyof object];
  if (!userData)  {
    userData = data
  }
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
    feedback.reply!.user = ObjectToUser(
      data["reply" as keyof object]["user" as keyof object]
    );

  return feedback;
}

export function ObjectToServiceSummary(data: Object): ServiceSummary {
  let serviceSummary: ServiceSummary = {
    id: data["id" as keyof object],
    customer: `${data["customer" as keyof object]["user"]["first_name"]} ${
      data["customer" as keyof object]["user"]["last_name"]
    }`,
    specialist: !!data["specialist" as keyof object]
      ? `${data["specialist" as keyof object]["user"]["first_name"]} ${
          data["specialist" as keyof object]["user"]["last_name"]
        }`
      : null,
    status: data["status" as keyof object] as RequestStatus,
    description: data["description" as keyof object],
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

export function ObjectToMessage(data: Object): Message {
  let msg: Message = {
    id: data["id" as keyof object],
    receiver: ObjectToUser(data["receiver" as keyof object]),
    sender: ObjectToUser(data["sender" as keyof object]),
    text: data["text" as keyof object],
    created_at: data["created_at" as keyof object],
    is_read: data["is_read" as keyof object],
  };
  return msg;
}

export function APIDataToMessages(res: APIResponse): Message[] {
  let data = res.data as Array<Object>;
  return data.map((r) => ObjectToMessage(r));
}

export function APIDataToChats(res: APIResponse, user: User): Chat[] {
  let msgs = APIDataToMessages(res);
  return msgs.map((m) => {
    return {
      lastMessage: m,
      peer: m.receiver.id == user.id ? m.sender : m.receiver,
    };
  });
}

export function ObjectToNotification(data: Object): Notification {
  let msg: Notification = {
    title: data["title" as keyof object],
    message: data["message" as keyof object],
    link: data["link" as keyof object],
    date: data["date" as keyof object],
    is_read: data["is_read" as keyof object],
    user: ObjectToUser(data["user" as keyof object]),
    type: data["notification_type" as keyof object],
    id: data["id" as keyof object],
  };
  return msg;
}

export function APIDataToNotifications(res: APIResponse): Notification[] {
  let data = res.data!['notifications' as keyof object] as Array<Object>;
  return data.map((r) => ObjectToNotification(r));
}
