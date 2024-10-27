import "flatpickr/dist/flatpickr.min.css";
import "@/css/poppins.css";
import "@/css/style.css";
import React from "react";
import Providers from "../Providers";
import ClientModalWrapper from "@/components/ClientModalWrapper";
import { Toaster } from "react-hot-toast";
import DashboardWrapper from "@/components/DashboardWrapper";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <NextUIProvider>
            <ClientModalWrapper>
              <DashboardWrapper>
                <Toaster position="bottom-right" reverseOrder={false} />
                {children}
              </DashboardWrapper>
            </ClientModalWrapper>
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  );
}
