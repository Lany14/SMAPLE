// import Link from "next/link";
// import Image from "next/image";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abys Agrivet Animal Health Clinic",
};
interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Form Section */}
      <div className="flex w-full flex-1 flex-col bg-white dark:bg-gray-900 lg:w-[60%]">
        <div className="flex min-h-screen flex-col items-center justify-between p-8">
          {/* Logo/Header Section */}

          {/* Main Content */}
          <div className="w-full max-w-xl">
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Abys Agrivet. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Image Section */}
      <div className="hidden bg-primary lg:block lg:w-[40%]">
        <div className="relative h-full">
          {/* <Image
            src="/auth-bg.jpg"
            alt="Veterinary Care"
            fill
            className="object-cover"
            priority
            sizes="40vw"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/30" />

          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-white">
              {/* <h2 className="mb-4 text-3xl font-bold">
                Welcome to Abys Agrivet
              </h2> */}
              {/* <p className="text-lg">
                Providing exceptional care for your beloved pets
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
