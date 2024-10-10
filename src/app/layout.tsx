import Providers from "@/components/Providers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark:bg-black ${poppins.className}`}>
        {/* <Providers>{children}</Providers> */}
        {children}
      </body>
    </html>
  );
}
