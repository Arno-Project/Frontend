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

export { UserRole, UserGeneralRole};
export type { User , Speciality};
