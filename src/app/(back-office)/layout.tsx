"use client";

import "flatpickr/dist/flatpickr.min.css";
import "@/css/poppins.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/BackOffice/common/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { status } = useSession();
  const router = useRouter();

  // Set loading state on mount to simulate loading
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Redirect based on session status
    if (status === "unauthenticated") {
      router.push("/signin");
    }
    // else if (status === "authenticated") {
    //   router.push("/dashboard");
    // }
  }, [status, router]); // Include router and status in dependencies

  // If loading, show the loader component
  if (loading || status === "loading") {
    return <Loader />;
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </body>
    </html>
  );
}
