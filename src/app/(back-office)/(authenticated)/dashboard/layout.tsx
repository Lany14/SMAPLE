import "flatpickr/dist/flatpickr.min.css";
import "@/css/poppins.css";
import "@/css/style.css";
import React from "react";
import Providers from "../../../Providers";
import ClientModalWrapper from "@/components/ClientModalWrapper";
import { Toaster } from "react-hot-toast";
import DashboardWrapper from "@/components/DashboardWrapper";
import { NextUIProvider } from "@nextui-org/react";
import AuthWrapper from "@/components/AuthWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthWrapper>
          <NextUIProvider>
            <ClientModalWrapper>
              <DashboardWrapper>
                <Toaster position="bottom-right" reverseOrder={false} />
                {children}
              </DashboardWrapper>
            </ClientModalWrapper>
          </NextUIProvider>
        </AuthWrapper>
      </body>
    </html>
  );
}
