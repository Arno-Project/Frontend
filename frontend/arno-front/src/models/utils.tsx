import {
  Chat,
  Feedback,
  FeedbackStatus,
  FeedbackType,
  LocationModel,
  Message,
  RequestStatus,
  ServiceSummary,
  Speciality,
  User,
  UserRole,
  Notification,
  Metric,
  SystemLog,
  SatisfactionItem,
  RequestFeedback,
  MetricScore,
} from ".";

import { APIResponse } from "../api/base";

export function ObjectToUser(data: Object): User {
  let userData: any = data!["user" as keyof object];
  if (!userData) {
    userData = data;
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
    isValidated: data["is_validated" as keyof object],
    dateJoined: userData["date_joined" as keyof object],
    lastLogin: userData["last_login" as keyof object],
    isActive: userData["is_active" as keyof object],
  };
  return user;
}

export function ObjectToUserOrNull(data: Object): User | null {
  if (!data) {
    return null;
  }
  return ObjectToUser(data);
}

export function ObjectToFeedback(data: Object): Feedback {
  console.info("ObjectToFeedback", data);
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
    customer: ObjectToUser(data["customer" as keyof object]),
    specialist: ObjectToUserOrNull(data["specialist" as keyof object]),
    customerName: `${data["customer" as keyof object]["user"]["first_name"]} ${
      data["customer" as keyof object]["user"]["last_name"]
    }`,
    specialistName: !!data["specialist" as keyof object]
      ? `${data["specialist" as keyof object]["user"]["first_name"]} ${
          data["specialist" as keyof object]["user"]["last_name"]
        }`
      : null,
    status: data["status" as keyof object] as RequestStatus,
    description: data["description" as keyof object],
    requested_speciality: data[
      "requested_speciality" as keyof object
    ] as Speciality,
    start_time: data["desired_start_time" as keyof object],
    location: data["location" as keyof object] as LocationModel,
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
    let spec: Speciality = {
      id: r["id" as keyof Object],
      title: r["title" as keyof Object],
      description: r["description" as keyof Object],
      parent: r["parent" as keyof object],
      children: r["children" as keyof object] as Speciality[],
    };
    return spec;
  });
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
  let data = res.data!["notifications" as keyof object] as Array<Object>;
  return data.map((r) => ObjectToNotification(r));
}

export function ObjectToMetric(data: Object): Metric {
  let m: Metric = {
    title: data["title" as keyof object],
    description: data["description" as keyof object],
    id: data["id" as keyof object],
    userType: data["user_type" as keyof object] as UserRole,
  };
  return m;
}

export function APIDataToMetrics(res: APIResponse): Metric[] {
  let data = res.data as Array<Object>;
  return data.map((r) => ObjectToMetric(r));
}

export function APIDataToLogs(res: APIResponse): SystemLog[] {
  let data = res.data as Array<Object>;
  return data.map((r) => {
    const log: SystemLog = {
      id: r["id" as keyof object],
      level: r["level" as keyof object],
      source: r["source" as keyof object],
      message: r["message" as keyof object],
      created_at: r["created_at" as keyof object],
    };
    return log;
  });
}

export function ObjectToMetricScore(data: Object): MetricScore {
  console.info("ObjectToMetricScore", data);
  let m: MetricScore = {
    score: parseInt(data["score" as keyof object]),
    metric: ObjectToMetric(data["metric" as keyof object]),
  };
  return m;
}

export function ObjectToRequestFeedback(data: Object): RequestFeedback {
  console.info("ObjectToRequestFeedback", data);
  let feedback: RequestFeedback = {
    created_at: data["created_at" as keyof object],
    id: data["id" as keyof object],
    description: data["description" as keyof object],
    user: ObjectToUser(data["user" as keyof object]),
    request: parseInt(data["request" as keyof object]),
    metricScores: (data["metric_scores" as keyof object] as object[]).map((a) =>
      ObjectToMetricScore(a)
    ),
  };
  return feedback;
}

export function APIDataToRequestFeedbacks(res: APIResponse): RequestFeedback[] {
  let data = res.data as Array<Object>;
  return data.map((r) => ObjectToRequestFeedback(r));
}

export function ObjectToSatisfactionItem(data: object): SatisfactionItem {
  let msg: SatisfactionItem = {
    user: ObjectToUser(data["user" as keyof object]),
    badMetrics: (data["bad_metrics" as keyof object] as object[]).map((a) =>
      ObjectToMetric(a)
    ),
    badFeedbacks: (data["bad_feedbacks" as keyof object] as object[]).map((a) =>
      ObjectToRequestFeedback(a)
    ),
    totalFeedbacksCount: parseInt(
      data["total_feedbacks_count" as keyof object]
    ),
    average: parseFloat(data["average_score" as keyof object]),
  };
  return msg;
}

export function APIDataToSatisfactionItems(
  res: APIResponse
): SatisfactionItem[] {
  let data = res.data as Array<Object>;
  return data.map((r) => ObjectToSatisfactionItem(r));
}
