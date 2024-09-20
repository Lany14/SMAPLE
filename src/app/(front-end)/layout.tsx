"use client";

import Footer from "@/components/FrontEnd/Site/Footer";
import Header from "@/components/FrontEnd/Site/Header";
import Lines from "@/components/FrontEnd/Site/Lines";
import ScrollToTop from "@/components/FrontEnd/Site/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import "../globals.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

import ToasterContext from "../context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${poppins.className}`}>
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
