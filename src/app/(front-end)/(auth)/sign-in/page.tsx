import SignInForm from "@/components/FrontEnd/Site/Forms/SignInForm";
import AuthLayout from "@/components/FrontEnd/Site/Layout/AuthLayout";
import Image from "next/image";
import Link from "next/link";
// import AuthLayout from "@/src/components/FrontEnd/Site/Layout/AuthLayout";
import React from "react";

export default function Login() {
  return (
    <AuthLayout>
      <div className="mx-auto flex flex-col items-center justify-center md:h-screen ">
        <div className="w-full rounded-lg bg-white shadow-2xl dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <Link
              href="/"
              className="flex items-center justify-center gap-3 text-2xl font-bold text-primary transition-opacity hover:opacity-90"
            >
              <Image
                src="/images/logo/logo-light.svg"
                alt="Abys Agrivet Logo"
                width={106}
                height={21}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <SignInForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
