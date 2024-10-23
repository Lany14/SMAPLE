"use client";

import "flatpickr/dist/flatpickr.min.css";
import "@/css/poppins.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/BackOffice/common/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";
import { NextUIProvider } from "@nextui-org/react";
import Providers from "../Providers";
import { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  const router = useRouter();

  // Set loading state on mount to simulate loading
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Redirect based on session status
    if (!session) {
      router.push("/signin");
    } else {
      router.push("/dashboard");
    }
  }, [session, router]);

  // If loading, show the loader component
  if (loading || status === "loading") {
    return <Loader />;
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <DefaultLayout>{children}</DefaultLayout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
