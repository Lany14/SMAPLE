"use client";

import PetOwnerOnboardingForm from "@/components/BackOffice/Onboarding/PetOwner";
import DoctorNurseOnboardingForm from "@/components/BackOffice/Onboarding/VetDoctorNurse";
import AuthLayout from "@/components/FrontEnd/Site/Layout/AuthLayout";
import { useSession } from "next-auth/react";
import React from "react";

const OnboardingPage = () => {
  const { data: session } = useSession();

  return (
    <AuthLayout>
      {/* Form Container */}
      <div className="mx-auto max-w-4xl">
        {/* Conditional Form Rendering */}
        {session?.user?.role === "PET_OWNER" ? (
          <PetOwnerOnboardingForm />
        ) : session?.user?.role === "DOCTOR" ||
          session?.user?.role === "NURSE" ? (
          <DoctorNurseOnboardingForm />
        ) : (
          <div className="text-center text-gray-500">
            Please sign in to continue
          </div>
        )}
        {/* <PetOwnerOnboardingForm />
        <DoctorNurseOnboardingForm /> */}
      </div>
    </AuthLayout>
  );
};

export default OnboardingPage;
