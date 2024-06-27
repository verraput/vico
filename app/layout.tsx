import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarLearner from "@/components/NavbarLearner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vico",
  description: "Video watching platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
