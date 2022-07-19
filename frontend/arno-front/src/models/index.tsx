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
}

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
  is_validated: boolean;
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

type Feedback = {
  created_at: string;
  id: number;
  reply: string | null;
  status: FeedbackStatus;
  text: string;
  type: string;
  user: number;
}

enum RequestStatus {
  Pending = "PEND",
  Wait = "WAIT",
  In_progress = "PROG",
  Done = "DONE",
  Cancelled = "CNCL",
  Rejected = "REJC",
}

type ServiceSummary = {
  id: number;
  customer: string;
  specialist: string | null;
  status: string;
  description: string;
}

export { UserRole, UserGeneralRole, FeedbackType, FeedbackStatus, RequestStatus};
export type { User , Speciality, Feedback, ServiceSummary};
