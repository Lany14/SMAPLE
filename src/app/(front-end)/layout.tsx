"use client";

import Footer from "@/components/FrontEnd/Site/Footer";
import Header from "@/components/FrontEnd/Site/Header";
import Lines from "@/components/FrontEnd/Site/Lines";
import ScrollToTop from "@/components/FrontEnd/Site/ScrollToTop";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import Providers from "@/components/Providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <Providers> */}
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <Lines />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
        {/* </Providers> */}
      </body>
    </html>
  );
}
