"use client";

import Footer from "@/components/FrontEnd/Site/Footer";
import Header from "@/components/FrontEnd/Site/Header";
import Lines from "@/components/FrontEnd/Site/Lines";
import ScrollToTop from "@/components/FrontEnd/Site/ScrollToTop";
import { ThemeProvider } from "next-themes";
import "../globals.css";

import ToasterContext from "../context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <Lines />
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
