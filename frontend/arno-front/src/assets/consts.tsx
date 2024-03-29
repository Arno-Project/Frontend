import { UserRole } from "../models";

export const RoleDict: any = {
  C: "مشتری",
  S: "متخصص",
  TM: "مدیر فنی",
  CM: "مدیر شرکت",
};

export const RoleDictColor: any = {
  C: "orange",
  S: "green",
  TM: "indigo",
  CM: "grape",
};

export const SystemFeedbackTypeDict: any = {
  T: "مشکل فنی",
  C: "انتقاد",
  S: "پیشنهاد",
  O: "سایر",
};

export const AccessRules: any = {
  "/technical_issues": [UserRole.TechnicalManager, UserRole.CompanyManager],
  "/system_feedbacks": [UserRole.CompanyManager],
  "/unsatisfied_users": [UserRole.CompanyManager],
  "/specialists": [UserRole.Customer, UserRole.Specialist],
  "/suggestion_complaint": [UserRole.Customer, UserRole.Specialist],
  "/evaluation_metrics": [UserRole.CompanyManager],
  "/report": [UserRole.TechnicalManager, UserRole.CompanyManager],
  "/requests": [UserRole.Customer],
  "/service_policy": [UserRole.CompanyManager],
  "/services": [UserRole.Customer],
  "/my_services": [UserRole.Specialist],
  "/edit_data": [UserRole.TechnicalManager],
  "/request_service": [UserRole.Customer],
  "/create_request": [UserRole.TechnicalManager, UserRole.CompanyManager],
  "/manage_services": [UserRole.TechnicalManager, UserRole.CompanyManager],
  "/manage_specialities": [UserRole.CompanyManager, UserRole.Specialist],
  "/manage_users": [UserRole.CompanyManager, UserRole.TechnicalManager],
  "/customer_requests": [UserRole.Specialist],
  "/chats": [UserRole.Customer, UserRole.Specialist],
};

export const RequestStatusBadge: any = {
  PEND: { message: "در حال بررسی", color: "yellow" },
  WAIS: { message: "در انتظار تایید کاربر", color: "indigo" },
  WAIC: { message: "در انتظار پذیرش متخصص", color: "violet" },
  PROG: { message: "در حال انجام", color: "cyan" },
  DONE: { message: "انجام شده", color: "teal" },
  CNCL: { message: "لغو شده", color: "gray" },
  REJC: { message: "رد شده", color: "orange" },
};

export const mantine_colors = [
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

export const RatingFillColorArray = [
  "#f17a45",
  "#f17a45",
  "#f19745",
  "#f19745",
  "#f1a545",
  "#f1a545",
  "#f1b345",
  "#f1b345",
  "#f1d045",
  "#f1d045",
];
