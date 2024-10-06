"use client";

import Footer from "@/components/FrontEnd/Site/Footer";
import Header from "@/components/FrontEnd/Site/Header";
import Lines from "@/components/FrontEnd/Site/Lines";
import ScrollToTop from "@/components/FrontEnd/Site/ScrollToTop";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import Providers from "@/app/context/Providers";

export default function Layout({ children }: { children: React.ReactNode }) {
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
          <Providers>{children}</Providers>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
