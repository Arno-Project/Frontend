import { UserRole } from "../models";

export const RoleDict: any = {
  "C": "مشتری",
  "S": "متخصص",
  "TM": "مدیر فنی",
  "CM": "مدیر شرکت",
};

export const Specialities = [
  "React",
  "Angular",
  "Svelte",
  "Vue",
  "Riot",
  "Next.js",
  "Blitz.js",
]; // TODO fetch from server

export const AccessRules: any = {
  "/technical_issues": [UserRole.TechnicalManager, UserRole.CompanyManager],
  "/specialists": [UserRole.Customer, UserRole.Specialist, UserRole.TechnicalManager, UserRole.CompanyManager],
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
};

export const RequestStatusBadge: any = {
  "PEND": { message: "در انتظار تعیین متخصص", color: "yellow" },
  "WAIT": { message: "در انتظار پذیرش متخصص", color: "violet" },
  "PROG": { message: "در حال انجام", color: "cyan" },
  "DONE": { message: "انجام شده", color: "teal" },
  "CNCL": { message: "لغو شده", color: "gray" },
  "REJC": { message: "رد شده", color: "orange" },
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
]
