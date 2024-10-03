import { UserRole } from "@prisma/client";

export type SignupInputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export type SignInInputProps = {
  email: string;
  userName: string;
  password: string;
};
