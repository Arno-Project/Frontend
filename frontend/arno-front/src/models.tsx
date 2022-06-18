// TODO! structure this

enum UserRole {
  Customer = "customer",
  Specialist = "specialist",
  CompanyManager = "companyManager",
  TechnicalManager = "technicalManager",
}

// enum UserRole {
//     Customer,
//     Specialist,
//     CompanyManager,
//     TechnicalManager,
//   }
  

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone: string;
};

export { UserRole };
export type { User };
