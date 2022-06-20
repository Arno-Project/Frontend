import { UserRole } from "../models";

export const RoleDict: any = {
  customer: "مشتری",
  specialist: "متخصص",
  technicalManager: "مدیر فنی",
  companyManager: "مدیر شرکت",
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
  "/specialists": [ UserRole.Customer, UserRole.Specialist, UserRole.TechnicalManager, UserRole.CompanyManager],
  "/suggestion_complaint": [UserRole.Customer, UserRole.Specialist],
  "/evaluation_metrics": [UserRole.CompanyManager],
  "/report": [UserRole.TechnicalManager, UserRole.CompanyManager],
  "/requests": [UserRole.Customer],
  "/service_policy": [UserRole.CompanyManager],
  "/services": [UserRole.Customer],
  "/my_services": [UserRole.Specialist],
  "/edit_data": [UserRole.TechnicalManager],
  "/request_service": [UserRole.Customer],
  "/create_service": [UserRole.TechnicalManager, UserRole.CompanyManager],
  "/manage_services": [UserRole.TechnicalManager, UserRole.CompanyManager],
};
