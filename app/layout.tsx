import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AlertProvider from "./AlertProvider";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Vico",
  description: "Video watching platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
        <html lang="id">
          <body className={inter.className}>
            <AlertProvider>{children}</AlertProvider>
          </body>
        </html>
    </StoreProvider>
  );
}
