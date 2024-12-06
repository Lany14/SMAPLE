import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import type { User } from "next-auth";
import "next-auth/jwt";
type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: UserRole;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      id: UserId;
      firstName: firstName;
      lastName: lastName;
      email: email;
      phoneNumber: phoneNumber;
      image: image;
      role: UserRole;
      status: status;
      accessToken: accessToken;
      refreshToken: refreshToken;
      accessTokenExpires: accessTokenExpires;
    };
    adminProfile: AdminProfile & {
      id: UserId;
      firstName: firstName;
      lastName: lastName;
      sex: sex;
      address: address;
      birthDate: birthDate;
      age: age;
    };
    receptionistProfile: ReceptionistProfile & {
      id: UserId;
      firstName: firstName;
      lastName: lastName;
      sex: sex;
      address: address;
      birthDate: birthDate;
      age: age;
    };
    DoctorProfile: DoctorProfile & {
      id: UserId;
      firstName: firstName;
      lastName: lastName;
      sex: sex;
      address: address;
      birthDate: birthDate;
      age: age;
    };
    petOwnerProfile: PetOwnerProfile & {
      id: UserId;
      firstName: firstName;
      lastName: lastName;
      sex: sex;
      address: address;
      birthDate: birthDate;
      age: age;
    };
    pet: Pet & {
      id: Id;
      firstName: firstName;
      lastName: lastName;
      sex: sex;
      address: address;
      birthDate: birthDate;
    };
  }
}
