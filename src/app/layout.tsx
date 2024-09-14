import { Nunito } from "next/font/google";
import { Metadata } from "next";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abys Agrivet Animal Health Clinic",
  description: "Caring for Every Paw, Tail, and Whisker with Heart",
  // other metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`dark:bg-black ${nunito.className}`}>{children}</body>
    </html>
  );
}
