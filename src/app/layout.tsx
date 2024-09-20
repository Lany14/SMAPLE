import { Poppins } from "next/font/google";
import { Metadata } from "next";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={`dark:bg-black ${poppins.className}`}>{children}</body>
    </html>
  );
}
