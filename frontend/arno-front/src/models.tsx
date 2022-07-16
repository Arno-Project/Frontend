// TODO! structure this

enum UserRole {
  Customer = "C",
  Specialist = "S",
  CompanyManager = "CM",
  TechnicalManager = "TM",
}

// enum UserRole {
//     Customer,
//     Specialist,
//     CompanyManager,
//     TechnicalManager,
//   }

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone: string;
};

export { UserRole };
export type { User };
