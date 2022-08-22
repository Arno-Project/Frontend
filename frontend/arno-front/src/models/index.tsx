// TODO! structure this

enum UserRole {
  Customer = "C",
  Specialist = "S",
  CompanyManager = "CM",
  TechnicalManager = "TM",
}

enum UserGeneralRole {
  NormalUser = "normal_user",
  ManagerUser = "manager_user",
}

type Speciality = {
  id: number;
  title: string;
  description: string;
  parent: Speciality | null;
  children: Speciality[];
};

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone: string;
  score: number;
  speciality: Array<Speciality>;
  isValidated: boolean;
  dateJoined: string;
  lastLogin: string;
};

enum FeedbackType {
  Technical = "T",
  Complaint = "C",
  Suggestion = "S",
  Other = "O", // TODO remove
}

enum FeedbackStatus {
  New = "N",
  Viewed = "V",
  Replied = "R",
}

type FeedbackReply = {
  created_at: string;
  id: number;
  text: string;
  user: User;
};

type Feedback = {
  created_at: string;
  id: number;
  reply: FeedbackReply | null;
  status: FeedbackStatus;
  text: string;
  type: string;
  user: User;
};

enum RequestStatus {
  Pending = "PEND",
  WaitForCustomer = "WAIS",
  WaitForSpecialist = "WAIC",
  In_progress = "PROG",
  Done = "DONE",
  Cancelled = "CNCL",
  Rejected = "REJC",
}

type LocationModel = {
  address: string;
  latitude: number;
  longitude: number;
};

type ServiceSummary = {
  id: number;
  customer: User;
  specialist: User | null;
  customerName: String;
  specialistName: String | null;
  location: LocationModel;
  status: RequestStatus;
  description: string;
  start_time: string;
  requested_speciality: Speciality;
};

type Message = {
  id: number;
  receiver: User;
  sender: User;
  text: string;
  created_at: string;
  is_read: boolean;
};

type Chat = {
  lastMessage: Message;
  peer: User;
};

enum NotificationType {
  Info = "INF",
  Error = "ERR",
  Success = "SUC",
}

type Notification = {
  id: number;
  title: string;
  message: string;
  link: string;
  date: string;
  is_read: boolean;
  user: User;
  type: NotificationType;
};

type Metric = {
  id: number;
  title: string;
  description: string;
  userType: UserRole;
};

enum LogLevel {
  Debug = "D",
  Info = "I",
  Warning = "W",
  Error = "E",
  Critical = "C",
}

type SystemLog = {
  id: number;
  level: LogLevel;
  source: string;
  message: string;
  created_at: Date;
};

type ScorePolicy = {
  id: number;
  minimum_score: number;
  allowed_requests: number;
};

type SatisfactionItem = {
  user: User;
  badFeedbacks: Feedback[];
  badMetrics: Metric[];
  totalFeedbacksCount: number;
  average: number;
};

export {
  UserRole,
  UserGeneralRole,
  FeedbackType,
  FeedbackStatus,
  RequestStatus,
  NotificationType,
  LogLevel,
};
export type {
  User,
  Speciality,
  Feedback,
  FeedbackReply,
  LocationModel,
  ServiceSummary,
  Message,
  Chat,
  Notification,
  Metric,
  SystemLog,
  ScorePolicy,
  SatisfactionItem
};
