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

type FeedbackReply = {
  created_at: string;
  id: number;
  text: string;
  user: User;
}

type Feedback = {
  created_at: string;
  id: number;
  reply: FeedbackReply | null;
  status: FeedbackStatus;
  text: string;
  type: string;
  user: User;
}

enum RequestStatus {
  Pending = "PEND",
  Wait = "WAIT",
  In_progress = "PROG",
  Done = "DONE",
  Cancelled = "CNCL",
  Rejected = "REJC",
}

type LocationModel = {
  address: string;
  lat: number;
  lng: number;
}

type ServiceSummary = {
  id: number;
  customer: string;
  specialist: string | null;
  location: LocationModel;
  status: RequestStatus;
  description: string;
  start_time: string;
  requested_speciality: Speciality;
}

export { UserRole, UserGeneralRole, FeedbackType, FeedbackStatus, RequestStatus};
export type { User , Speciality, Feedback, FeedbackReply, LocationModel, ServiceSummary};
