"use client";
import "./globals.css";
import { GlobalProvider } from "./context/globalContext";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body>
          <Link href="/">Home</Link>
          {children}
        </body>
      </html>
    </GlobalProvider>
  );
}
