import { UserRole } from "@prisma/client";

export type SignUpInputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export type SignInInputProps = {
  email: string;
  password: string;
};
